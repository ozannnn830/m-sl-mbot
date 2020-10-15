const Discord = require("discord.js");

exports.run = (client, message, args, tools) => {
  const embed = new Discord.RichEmbed()
    .setAuthor("🇹🇷 ❤ 🇦🇿",)
    .setColor("RED")
    .addField("Geçmiş Olsun Azerbaycan!", "**Dualarımız Seninle.. :heart:**",)

    .setImage(
      "https://cdn.discordapp.com/avatars/608335319749885952/a_5670a032cb3441d2e26c90c60fe82dfe.gif"
    );
  message.channel.send(embed);
}; //

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["az",'Az','Azerbaycan','az','tr','türk','Türk','azerybacan'],
  permLevel: 0
};

exports.help = {
  name: "azerbaycan",
  description: "[Yardım Komutu]",
  usage: "yardım"
};