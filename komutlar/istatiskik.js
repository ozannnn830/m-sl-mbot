const Discord = require('discord.js');
const moment = require('moment');
const ayarlar = require('../ayarlar.json');
require('moment-duration-format');
exports.run = async(cclient, message, args) => {

let cembed = new Discord.RichEmbed()
.setAuthor(cclient.user.username, cclient.user.avatarURL)
.setThumbnail(message.author.avatarURL)
.setTimestamp()
.addField("Bot Verileri", `Toplam Sunucu **|** **${cclient.guilds.size}** \nToplam Kullanıcı **|** **${cclient.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** \nToplam kanal **|** **${cclient.channels.size}**`)
.addField("Yapımcılar", `<@713678882011742230> **|** **EmEkLi MüSlÜm BaBa#1881** 
<@717459550168678400> EmEkLi MüSlÜm OzAn#7618`)
.addField("Gecikmeler", `Bot Pingi **|** **${cclient.ping}** \nMesaj Gecikmesi **|** **${new Date().getTime() - message.createdTimestamp}**`)
.setColor("RANDOM")
.setFooter(`${message.author.username} Tarafından İstendi`, message.author.avatarURL)
  .setImage(
      "https://media.discordapp.net/attachments/730513906786893824/734376184812404767/download_1.gif"
    );
message.channel.send(cembed)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bot durum', 'i', 'bi', 'istatistikler', 'kullanımlar', 'botdurum', 'bd', 'istatisik', 'stats', 'stat','bot-durum','deneme','d','de'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'istatistik',
    description: 'Botun istatistik Gösterir.',
    usage: 'istatistik'
  };
