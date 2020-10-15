const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('Blue')
.setTimestamp()
.addField('`REKLAM VERMEK`',' Para İle Reklam Verebilirsiniz Ne Reklamı Olduğu Farketmez Bot Şuanda \`\`105,361\`\` Kişiye Hizmet Veriyor.Reklam Vermek İçin  <@713678882011742230>  Bana Dm`den Ulaşabilirsiniz. Da Fazla Bilgi İçin Destek Sunucusuna Gelerek <#760989998845132820> Kanalını Okuyabilirsiniz!')
.setTitle('Para İninal Üzerinden Olur')
.addField(`» Linkler`, `[Bot Davet Linki](https://discord.com/api/oauth2/authorize?client_id=758443809284685824&permissions=3222800&scope=bot) **|** [Destek Sunucusu](https://discord.gg/pWvkNSh)  **|** [Bota Oy Ver](https://qnixe.cf/bot/758443809284685824) `)
.setFooter(`${message.author.username} Tarafından İstendi`, message.author.avatarURL)
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['reklamver','reklam-ver','reklam','link','küfür','sponsor','ih','lınk','reklam','Reklam ver','Reklam-ver','Reklami-ver','reklamiver','reklami ver','reklami-ver'],
  permLevel: 0 
};

exports.help = {
  name: 'bizkimiz',
  description: 'Bizim kim oldumuzu açıklar.',
  usage: 'bizkimiz'
};