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
    }

    _registerEvents(){
        this.client.once(Events.ClientReady, () => console.log("Bot ativo!"));
        this.client.on(Events.MessageCreate, async (msg) => await this._handleMessage(msg))
    }

    _handleMessage(msg){
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




    }   
    _splitMessage(){

    }
    start(){
        this.client.login(this.token);
    }
}