const Discord = require('discord.js');

exports.run = (client, message, args) => {
    var ilgincsöz = [
      "İnsanın hayatında neşenin yeri olduğu kadar hüznünde yeri olacaktır.",
      "Ağla, doyasıya ağla! Aynı denizde çoğalır yüreğin özsuyu.",
      "Adam öldürmeye hazırım ama cinayet işleyemem.",
      "Acıyı bilmeyen tatlı iş yapamaz.",
      "Değişmedik. Özümüzde aynıyız. Müsterih olsunlar.",
      "Ne demişiz biz, bugün batarsa güneş yarın yeniden doğar.",
      "Hayat bana zordu ama güzeldi. Hakkınızı helal edin! Son Sözleri",
      "Kırşehir deyince durmak lazım çünkü oradan Neşet Baba çıkmıştır.",
      "Niye jilet atıyorsun kardeşim, çiçeğin varsa ver.",
      "Ormanlarımız yanıyor, ciğerimiz yanıyor.",
      "İstiyorum ki herkes; doğruluğun, iyiliğin, kardeşliğin, barışın efendisi olsun.",
      "Sevenlerine; Allah beni sizin sevginizden korusun.",
      "Almayın, korsan kaset almayın kardeşim.",
      "Bu şarkıdan biz bıktık sizler bıkmadınız.",
      "Çiçeklere gerek yok aslında, sizler birer çiçeksiniz.",
      "Yumurtaya can veren Allah’ım yeşilbiberi nasıl yarattın?",
      "Öz evladım yok ama dünyada binlerce insan bana Baba diyor...",
      "Sevginin girmediği yere şeytan girer.",
      "Benim gibiler, sevmeyi sevenler, her derdi çekerler; ihanete gelemezler.",
      "İnsanın hayatında neşenin yeri olduğu kadar hüznünde yeri olacaktır.",
      "Kamyonları seviyoruz, onlar bizim canımız.",
        
    ]
    var ilgincsöz = ilgincsöz[Math.floor(Math.random(1) * ilgincsöz.length)]
    const ilgincsözembed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Müslüm Gürses Sözleri`, message.author.avatarURL)
    .setFooter(`${message.author.username} Müslüm Gürses Sözü Öğrendi!`)
  .setDescription(`${ilgincsöz}`)
    return message.channel.sendEmbed(ilgincsözembed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['müslüm-gürses-sözleri','müslüm-gürses sözleri','müslüm gürses sözleri','sözler','müslüm-baba','müslümbaba','bilgi'],
  permLevel: 0
};

exports.help = {
  name: 'ilginçbilgi',
  description: 'Bilmediginiz bir sürü ilginc bilgi verir.',
  usage: 'ilginçbilgi'
}