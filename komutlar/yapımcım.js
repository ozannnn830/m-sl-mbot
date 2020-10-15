const Discord = require('discord.js');

exports.run = (client, message, params) => {
  const embed = new Discord.RichEmbed()
  .setDescription('')
  .setColor(0x00ffff)
  .addField("**》 Yapımcım 《**", `🌙 • <@713678882011742230>  ve <@717459550168678400>`)
  .addField("**》 Geliştirici 《**", `⭐️ • <@713678882011742230> ve <@717459550168678400>   `)
  .addField("**》 Sponsor 《 **", `☄️ • Yok! Aranıyor **:)** `)

 
  return message.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yapımcı','sahibim','sahip','yapımcım','botyapımcısı','bot-yapımcısı','Yapımcı','sahib'],
  permLevel: 0
};

exports.help = {
  name: 'yapımcım',
  description: 'Botun Yapımcısını Gösterir',
  usage: 'yapımcım'
};