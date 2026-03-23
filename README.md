# discord-claude-controller

A Discord bot that bridges messages to Anthropic's Claude Code CLI.

---

## Overview

`discord-claude-controller` is a lightweight Discord bot that allows you to interact with the Claude Code CLI directly from a Discord channel.

It acts as an interface between Discord and your local or VPS-hosted Claude environment.

---

## Features

- Run prompts directly from Discord
- Bridge between Discord and Claude CLI
- Works locally (Mac) and on VPS/Linux
- Simple and minimal setup

> **Key Advantage:**  
> Run **Claude 3.7 Sonnet without consuming API credits** by using the official CLI instead of the Anthropic API.

---

## Requirements

- Node.js v20+
- npm
- Claude Code CLI (`@anthropic-ai/claude-code`)
- Authenticated session (`claude login`)

---

## Getting Started

### 1. Install dependencies

```bash
npm install
2. Install Claude CLI
npm install -g @anthropic-ai/claude-code
3. Authenticate
claude login
4. Configure environment

Create a .env file:

DISCORD_TOKEN=your_token
CHANNEL_ID=your_channel_id
5. Run the bot
node index.js
Usage
Send a message in the configured Discord channel
The bot forwards it to Claude CLI
The response is sent back to Discord
Architecture
Discord → Bot → ClaudeTerminalController → Claude CLI → Response → Discord
Production (VPS / Linux)

When running in a VPS environment (e.g., with PM2), you may encounter:

EACCES
ENOENT

Check:

src/ClaudeTerminalController.js

There is a commented Linux-ready section that resolves these issues by:

Using absolute paths for the CLI
Injecting environment variables properly
Use Cases
Prompt automation via Discord
Internal AI tooling
Low-cost experimentation with Claude
Remote execution of CLI tasks
Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

License

MIT

discord-claude-controller (PT-BR)

Bot de Discord que conecta mensagens ao Claude Code CLI da Anthropic.

Visão Geral

O discord-claude-controller é um bot leve que permite interagir com o Claude diretamente por um canal do Discord.

Ele funciona como uma interface entre o Discord e seu ambiente local ou VPS.

Funcionalidades
Executa prompts via Discord
Integra Discord com Claude CLI
Funciona em Mac (local) e VPS/Linux
Setup simples e direto

Diferencial:
Rodar Claude 3.7 Sonnet sem consumir créditos da API, utilizando o CLI oficial.

Requisitos
Node.js v20+
npm
Claude Code CLI (@anthropic-ai/claude-code)
Sessão autenticada (claude login)
Instalação
npm install
npm install -g @anthropic-ai/claude-code
claude login
Configurar .env
DISCORD_TOKEN=seu_token
CHANNEL_ID=seu_channel_id
Rodar
node index.js
Uso
Envie uma mensagem no canal configurado
O bot envia para o Claude CLI
A resposta volta para o Discord
Arquitetura
Discord → Bot → ClaudeTerminalController → Claude CLI → Resposta → Discord
Produção (VPS / Linux)

Ao rodar em VPS/Linux (ex: PM2), podem ocorrer:

EACCES
ENOENT

Veja:

src/ClaudeTerminalController.js

Existe um trecho comentado que resolve isso usando:

Caminhos absolutos
Variáveis de ambiente
Casos de Uso
Automação de prompts via Discord
Ferramentas internas com IA
Testes com baixo custo
Execução remota de comandos
Contribuição

Pull requests são bem-vindos. Para mudanças maiores, abra uma issue antes.
