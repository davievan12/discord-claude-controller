const ClaudeTerminalController = require("./ClaudeTerminalController")
const { Client, GatewayIntentBits, Events } = require('discord.js')

class DiscordClaudeBot{
    constructor(token, allowedChanelId, workingDir,){
        this.token = token;
        this.client = new Client({
            intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
            ]
        })
        this.allowedChanelId = allowedChanelId;
        this.controller = new ClaudeTerminalController(workingDir, 120000);
        this._registerEvents()
    }

    _registerEvents(){
        this.client.once(Events.ClientReady, () => console.log("Bot ativo!"));
        this.client.on(Events.MessageCreate, async (msg) => await this._handleMessage(msg))
    }

     async _handleMessage(msg){
        let mensagem = msg.content; 
        if (msg.author.bot){
            return 
        }

        if(msg.channelId !== this.allowedChanelId){
            return 
        }
        if(mensagem[0] !== '!')
            {
             return
        }

        // extrair o prompt rs //
        const prompt = mensagem.slice(1).trim();

        try{
            const thinking = await msg.reply('Processando');
            const resultado = await this.controller.run(prompt)
            await thinking.delete()
            const chunks = this._splitMessage(resultado);
            for (const pedaco of chunks) {
               await msg.channel.send(pedaco)
            }
        }
        catch (err){
            await msg.reply(`Erro: ${err.message}`)
        }


    }   

    _splitMessage(resultado){
        let text = resultado;
        const MaxLength = 1900;
        const chunks1 = [];
        while (text.length > 0) {
            chunks1.push(text.slice(0, MaxLength))
            text = text.slice(MaxLength)
        }
        return chunks1
    }


    start(){
        this.client.login(this.token);
    }
}

module.exports = DiscordClaudeBot