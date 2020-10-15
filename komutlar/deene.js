const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => { 
let emojiname = args[0];
const emoji = (message.guild.emojis.find("name", `${emojiname}`))
if (!emojiname) return message.channel.send("**Emoji İsmi Belirtmeniz Gerekiyor.**")
const embed = new Discord.RichEmbed()
.setColor("BLUE")
.setThumbnail(`${emoji.url}`)
.addField("Emojinin ismi", `${emojiname}`)
.addField("Emoji ID", `${emoji.id}`)
.addField("Link", `${emoji.url}`)
.setTimestamp()
message.channel.send(embed)
}
exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['emojibilgi'],
permLevel: 0
}
exports.help = {
name: 'emojibilgi',
description: 'İsmini yazdığınız emoji hakkında bilgi verir',
usage: 'emojibilgi'
}