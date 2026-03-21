require('dotenv').config()
const DiscordClaudeBot = require('./src/DiscordClaudeBot')

const bot = new DiscordClaudeBot(
    process.env.DISCORD_BOT_TOKEN,
    process.env.LISTEN_CHANEL_DC_ID,
    process.env.WORKING_DIR
)

bot.start()