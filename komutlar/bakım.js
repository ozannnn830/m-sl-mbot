const Discord = require('discord.js')
const db = require('quick.db')


exports.run = (client, message, args) => {
  
  if (message.author.id !== '713678882011742230') return message.channel.send( "Bu Komutu Sadece `Yapımcım` **Kullanabilir!**")

  
  if(!args[0]) return message.channel.send('Bakım Modunu Açmak İçin m!bakım aç Veya m!bakım kapat')

  
  if(args[0] === 'aç') {
    if(db.fetch(`bakim`)) return message.channel.send('Bakım Modu Zaten Açık')
    message.channel.send('Bakım Modu Açıldı.')
    db.set(`bakim`, 'acik')
  }
  if(args[0] === 'kapat'){
    if(!db.fetch(`bakim`)) return message.channel.send('Bakım Modu Zaten Kapalı.')
    message.channel.send('Bakım Modu Kapatıldı.')
    db.delete(`bakim`)
  }
  
}



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['bakim','bakım modu','bakım-modu'],
  permLevel: 0
}

exports.help = {
  name: 'bakım'
}