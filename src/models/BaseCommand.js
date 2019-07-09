const BaseResponse = require('./BaseResponse')

class BaseCommand {
  /**
   *
   * @param {String} command Command to be executed
   * @param {String} description Description of command
   */
  constructor (command, description) {
    if (!command) throw new Error('Command must be provided')

    if (!description) {
      throw new Error('Command description must be provided')
    }

    this.command = command
    this.description = description
  }

  /**
   * Execute the command
   * @param {Object} msg Telegram message object
   */
  async execute (msg) {
   let data = await this.data(msg);
   let res =  await this.response(data);

    return res
  }

  /**
   * Do something before response
   * @param {Object} message Telegram message object
   * @returns {Object} Data to be transfered to response()
   */
  async data (message) {
    throw new Error('Not implemented')
  }

  /**
   * Called after data()
   * @param {Object} data data() results
   * @returns {BaseResponse} Response object
   */
  async response (data) {
    throw new Error('Not implemented')
  }
}

module.exports = BaseCommand
