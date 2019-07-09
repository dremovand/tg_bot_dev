const BaseCommand = require('../models/BaseCommand')
const axios = require("axios");

class UUID extends BaseCommand {
  constructor () {
    super('/uuid', 'Gets uuid by nickname')
  }

  async data (msg) {
    let msg_parsed = msg.text.split(' ');
    if(msg_parsed.length != 2){
        return {text: `Wrong number of arguments.`}  
    }
    let request = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${msg_parsed[1]}`);
    return{text:`${request.data.id}`}
  }

  async response (data) {
    return {text: `${data.text}`}
  }
}

module.exports = UUID
