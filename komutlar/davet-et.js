const Discord = require("discord.js");

module.exports.run = async (client, message) => {
  
  const embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .addField(`Botu Sunucunuza Davet Edin!`, `[Tıkla](https://discord.com/oauth2/authorize?client_id=758443809284685824&permissions=3222800&scope=bot)`)
.setFooter(client.user.username, client.user.avatarURL)
.setFooter(`${message.author.username} Tarafından İstendi!`, message.author.avatarURL)

  message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['davet','invite','daveti','bot','link'],
  permLevel: 0,
  kategori: "sunucu"
};

module.exports.help = {
  name: "davet",
  description: "davet",
  usage: "davet"
};
