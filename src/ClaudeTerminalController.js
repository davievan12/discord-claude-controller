const { spawn } = require('child_process');
class ClaudeTerminalController{
    constructor(cwd, timeoutMS)
    {
        this.cwd = cwd;
        this.timeoutMS = timeoutMS;
    }

    run (prompt)
    {
        return new Promise((resolve, reject) => 
            {
                const processo = spawn('claude', [
                '--print',
                '--system',
                'Você é um assistente inteligente e direto chamado Claude Controller, rodando via Discord. Responda de forma natural e conversacional em português brasileiro. Seja objetivo e claro. Quando te pedirem para criar código, explique o que fez. Quando te fizerem perguntas, responda diretamente sem rodeios. Não mencione que está rodando via terminal ou subprocess.',
                    prompt
                    ]   , { cwd: this.cwd, shell: true });
                const timer = setTimeout(() => {
                    processo.kill();
                    reject(new Error('Timeout!'));
                }, this.timeoutMS);
                const chunks = [];
                const erros = [];
                processo.stdout.on('data', (pedaco)=> {chunks.push(pedaco.toString())})
                processo.stderr.on('data', (erro)=> {erros.push(erro.toString())})
                processo.on('close',(code) => {
                    clearTimeout(timer);
                if (code == 0){
                    resolve(chunks.join(''));
                }
                else
                {
                    reject(new Error(erros.join('')))
                }
            })
        })    
    
    }
}

module.exports = ClaudeTerminalController;
