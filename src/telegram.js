const BotApi = require('node-telegram-bot-api');

class Telegram {
  /**
   * Creates an instatnce of Telegram bot
   * @param {String} token
   */
  constructor (token) {
    if (!token) throw new Error('Telegram token must be provided')

    this._client = new BotApi(token, {polling: true})
  }

  get client () {
    return this._client
  }
}

module.exports = Telegram
