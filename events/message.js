const db = require('quick.db')
const ayarlar = require('../ayarlar.json');
module.exports = async message => {
let prefix = await db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;



if(db.fetch(`bakim`)) {
  if(message.author.id !== "713678882011742230") {return message.channel.send('Şuanda Bakım Modu Açıktır ❓ Bakım Sebebi:')}
}


 let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
  if(karaliste) return message.channel.send(`**${karaliste}** Sebebiyle Karalisteye alınmışsın! ||Eğer Karalisteden Çıkmak istiyorsan Destek Sunucumuza Gel!||`)




  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {



    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};