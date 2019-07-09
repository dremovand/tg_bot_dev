const fs = require('fs')
const path = require('path')
const BaseCommand = require('../models/BaseCommand')

class CommandController {
  /**
   * Initialize Command Controller
   * @param {Object} bot Instance of bot
   */
  constructor (bot) {
    this.bot = bot
    this.commands = []
  }

  init () {
    const commandsDir = path.join(__dirname, '..', 'commands')

    fs.readdir(commandsDir, (err, files) => {
      if (err) throw err

      files.map(title => {
        const Module = require(commandsDir + '/' + title)

        try {
          let command = new Module()

          if (command instanceof BaseCommand) {
            this.commands.push(command)

            console.log(`[INFO] Initialized ${title} command`)
          }
        } catch (err) {
          throw err
        }
      })
    })
  }

  async command (msg) {
    let command = await this.findCommand(msg)
    let response = await command.execute(msg)

    this.bot.sendMessage(msg.chat.id, response.text)
  }

  async findCommand (msg) {;
    for (let value of this.commands) {
      if (msg.text.split(' ')[0].toLowerCase() === value.command.toLowerCase()) return value
    }
  }
}

module.exports = CommandController
