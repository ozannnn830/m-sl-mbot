const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
let sunucuid = args[0]
    if (!sunucuid) return message.channel.send(`⛔ Sunucunun ID'sini Yazmalısın!`).then(msg => msg.delete(10000))
         message.delete()
  const gven1 = client.emojis.get('625022581258453005')
  const yanl = client.emojis.get('625022581258453005')
  if (message.author.id !== '713678882011742230') return message.channel.send( " Bu Komutu Sadece `Yapımcım` **Kullanabilir!**")
   message.channel.send(`  **:white_check_mark: Bot Sunucudan Ayrıldı! ** ${gven1}`);
   client.guilds.get(sunucuid).leave()
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ayrıl','defol'],
  permLevel: 0,
  kategori: "yapımcı"
};

exports.help = {
  name: 'ayrıl',
  description: 'Bot Sunucudan Ayrılır.',
  usage: 'ayrıl'
};