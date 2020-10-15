const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async(cclient, message, args) => {

  if (message.author.id !== '713678882011742230') 
 if (message.author.id !== 'Merve İd üşendim amk eklerim ')
return message.channel.send( " Bu komutu sadece `Yapımcım` **kullanabilir!**")

let cuser = message.mentions.users.first() || cclient.users.get(args[0])
if(!cuser) return message.channel.send("Lütfen bir kullanıcı belirt")
let csebep = args.slice(1).join(' ')
if(!csebep) return message.channel.send("Lütfen bir sebep belirt")

message.channel.send("**"+cuser.tag+"** kullanıcısı **"+csebep+"** sebebinden karalisteye alındı.")
db.set(`ckaraliste.${cuser.id}`, csebep)

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['db','Db','kara-liste','Kara-liste','karaliste'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'karaliste',
    description: 'Karalisteye Alır',
    usage: 'gç'
  };