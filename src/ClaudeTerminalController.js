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

                     /* Versão para VPS / PM2 (ambiente sem TTY, PATH restrito):
                    - Usa /bin/sh explícito com caminho absoluto do claude
                    - Força o PATH manualmente pois o PM2 não herda o PATH completo do sistema
                    - Passa o prompt via variável de ambiente para evitar injeção de shell
                    - Requer que o processo rode como usuário não-root (claude bloqueia --dangerously-skip-permissions no root)

                        {
                        const processo = spawn('/bin/sh', ['-c', '/usr/bin/claude --dangerously-skip-permissions -p "$CLAUDE_PROMPT"'], {
                        cwd: this.cwd,
                        shell: false,
                        env: {
                            ...process.env,
                            PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
                            TERM: 'dumb',
                            NO_COLOR: '1',
                            CLAUDE_PROMPT: prompt
                        }
                    });
                */

                            
                    // Versão para ambiente local (terminal interativo, PATH já configurado):                    
                    {
                    const processo = spawn('claude', ['--dangerously-skip-permissions'], { cwd: this.cwd, shell: true });
                    processo.stdin.write(prompt + '\n');
                    
                    
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
