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
                    const processo = spawn('claude', ['--dangerously-skip-permissions'], { cwd: this.cwd, shell: true });
                    processo.stdin.write(prompt + '\n');
                    processo.stdin.end();


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
