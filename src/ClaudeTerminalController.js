const { spawn } = require('child_process');
const { promises } = require('dns');
const { cwd } = require('process');
module.exports = ClaudeTerminalController;

class ClaudeTerminalController{
    constructor(cwd, timeoutMS)
    {
        this.cwd = cwd;
        this.timeoutMS = timeoutMS;
    }

    run (prompt){
        return new Promise((resolve, reject) => {
      const processo = spawn('claude', ['--print', prompt], { cwd: this.cwd, shell: true });
            const chunks = [];
            const erros = [];
            processo.stdout.on('data', (pedaco)=> {chunks.push(pedaco.toString())})
            processo.stderr.on('data', (erro)=> {erros.push(erro.toString())})

        }
    )}
}
