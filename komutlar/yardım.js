const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {

  const yardım = new Discord.RichEmbed()
  .setColor(0x36393E)
      .setAuthor(`Müslüm Gürses Bot`, client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .addField(`Müslüm Gürses Hatırasına`, `🎧 | **m!çal** İstediniz Şarkıyı Çalar!\n▶️ | **m!duraklat** Şarkıyı Durdurur!\n⏭ | **m!geç** Şarkıyı Geçer!\n🔊 | **m!devamet** Şarkıyı Devam Ettirir!\n 🔈| **m!stop** Şarkıyı Kapatır!\n :white_small_square: | **m!davet** Botun Davet Linkini Atar!\n <a:destek:765887748200202273>  | **m!desteksunucusu** Botun Destek Sunucusu Linkini Atar!\n :white_small_square: | **m!müslüm-gürses-sözleri** Müslüm Gürses Sözleri Atar!\n :white_small_square: | **m!istatistik** Botun İstatistiklerini Atar!\n <a:yldiz:765884070730661919> | **m!ping** Botun Ping'ini Gösterir!\n 💰 | **m!reklamver**  Para İle Reklam Yaptırırsınız!\n :white_small_square: | **m!canlı-destek**  Canlı Destek Talebi Oluşturur!\n :white_small_square: | **m!azerbaycan** :flag_tr: :heart: :flag_az: `)
.addField(`» Linkler`, `[Bot Davet Linki](https://discord.com/api/oauth2/authorize?client_id=758443809284685824&permissions=3222800&scope=bot) **|** [Destek Sunucusu](https://discord.gg/pWvkNSh)  **|** [Bota Oy Ver](https://qnixe.cf/bot/758443809284685824) `)
      .setFooter(`${message.author.username} Tarafından İstendi`, message.author.avatarURL)
  .setImage(
      "https://media.discordapp.net/attachments/730513906786893824/734376184812404767/download_1.gif"
    );
  return message.channel.sendEmbed(yardım);

};

  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['komut', 'komutlar', 'command', 'yardım', 'help', 'halp', 'y', 'h', 'commands','yardim','müzik','muzik','muzık','müzık'],
    permLevel: 0  
  };
  
  exports.help = {
    name: 'yardım',
    description: 'yardım',
    usage: 'yardım'
  };