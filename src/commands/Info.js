const BaseCommand = require('../models/BaseCommand')
const axios = require("axios");

class Info extends BaseCommand {
  constructor () {
    super('/info', 'Gets information about minecraft server')
  }

  async data (msg) {
    let request = await axios.get('https://api.mcsrvstat.us/2/194.93.0.114')
    var out = {online: request.data.players.online,max: request.data.players.max}
      if (request.data.players.list){
        out.list = request.data.players.list;
      }
      return out;
  };

  async response (data) {
    if(data.list){
       data.list = data.list.reduce((acc,word,i,arr) => acc +=i === arr.length - 1 ? ` и ${word}.` : `, ${word}`);
       return{
         text: `Сейчас на сервере ${data.online} из ${data.max} игроков \nИгроки онлайн: ${data.list}`
       }
    }
    return {
      text: `Сейчас на сервере ${data.online} из ${data.max} игроков`
    }
  }
}

module.exports = Info
