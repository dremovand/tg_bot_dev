const Telegram = require('./telegram')
const CommandController = require('./controllers/CommandController') 

require('dotenv').config()

const tg = new Telegram(process.env.TOKEN).client
const commandController = new CommandController(tg)

commandController.init()

tg.on('message', msg => commandController.command(msg))
