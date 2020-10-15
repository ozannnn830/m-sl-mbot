const Discord = require("discord.js");

module.exports.run = async (client, message) => {
  
  const embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .addField(`Botun Destek Sunucusuna Gelin!`, `[Tıkla](https://discord.gg/pWvkNSh)`)
.setFooter(client.user.username, client.user.avatarURL)
.setFooter(`${message.author.username} Tarafından İstendi!`, message.author.avatarURL)

  message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["destek-sunucu","desteksunucusu",'destek','destek-link','destekk'],
  permLevel: 0
};

exports.help = {
  name: "desteksunucu",
  description: "yardım",
  usage: "yardım"
};
