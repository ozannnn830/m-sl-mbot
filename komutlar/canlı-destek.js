const Discord = require('discord.js')
exports.run = async(client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**Bunu Yapabilmek İçin Gerekli Yetkiye Sahip Değilsiniz!**`)
  
const emoji1 = message.client.emojis.get('📞');
const emoji2 = message.client.emojis.get('📞');
const emoji3 = message.client.emojis.get('📞');
const emoji4 = message.client.emojis.get('📞');
const emoji5 = message.client.emojis.get('📞');
const emoji6 = message.client.emojis.get('📞');
const emoji7 = message.client.emojis.get('📞');
      let isEnabled;
      message.reply("Canlı Destek Komutunu Kullandığınız İçin Teşekkürler. Birazdan Yetkili Ekibimiz Sizinle İlgilenicektir.");
      let mesaj = args.slice(0).join(' ');
      let chan = message.channel;
      let destekKanal = "764894533514952724";
      const embed = new Discord.RichEmbed()
        .addField('Uyarı', `📞 Canlı Destek Çağrısı`)
        .setAuthor(`${message.author.tag} (${message.author.id})`, `${message.author.avatarURL}`)
        .setColor("RANDOM")
        .addField(`Bilgiler`, `**Sunucu**: ${message.guild.name} (${message.guild.id}) \n**Kanal**: ${message.channel.name} (${message.channel.id}) \n**Destek İsteyen**: ${message.author.tag} (${message.author.id}) \n**Destek Mesajı**: ${mesaj}`)
        .setFooter("Canlı Destek")
        .setTimestamp()
      client.channels.get(destekKanal).send({
        embed: embed
      });
    const collector = client.channels.get(destekKanal).createCollector(message => message.content.startsWith(''), {
      time: 0
    })
    client.channels.get(destekKanal).send('📞 Destek Çagrısı Bağlanmak İçin `katıl` Yazınız. İptal Etmek İçin `kapat` Yazınız.')
    collector.on('message', (message) => {
      if (message.content === 'kapat') collector.stop('aborted')
      if (message.content === 'katıl') collector.stop('success')
    })
    collector.on('end', (collected, reason) => {
      if (reason === 'time') return message.reply('📞 Çagrı Zaman Aşımına Uğradı.')
      if (reason === 'aborted') {
        message.reply('Çağrı reddedildi.')
        client.channels.get(destekKanal).send('📞 Başarıyla Çağrı Reddedildi.')
      }
      if (reason === 'success') {
        client.channels.get(destekKanal).send('📞 Destek Çagrısı Alındı!')
        client.channels.get(destekKanal).send('📞 Destek çağrısını kapatmak için `kapat` yazınız.')
        chan.send(`${message.author}`)
        chan.send('Çağrınız Bir Destek Yetkili Tarafından Alındı!')
        chan.send('En Yakın Zamanda Size Yardımcı Olacagız.')
        chan.send('Destek Çagrısı Kapatmak İçin `kapat` Yazınız.')
        isEnabled = true
        client.on('message', message => {
          function contact() {
            if (isEnabled === false) return
            if (message.author.id === client.user.id) return
            if (message.content.startsWith('kapat')) {
              message.channel.send('📞 Çağrı Kapatıldı.')
              if (message.channel.id === chan.id) client.channels.get(destekKanal).send('📞 Çağrı Karşı Taraftan Kapatıldı.')
              if (message.channel.id === destekKanal) chan.send('📞 Çağrı Karşı Taraftan Kapatıldı.')
              return isEnabled = false
            }
            if (message.channel.id === chan.id) client.channels.get(destekKanal).send(`📞 **${message.author.tag}**: ${message.content}`)
            if (message.channel.id === destekKanal) chan.send(`📞 **${message.author.tag}**: ${message.content}`)
          }
          contact(client)
        })
      }
    })
}
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['canlı-destek','canlı','Canlı','canlidestek','canli-destek','Canli-destek','Canlidestek','canlı-yardım','canlı','canlıyardım','canlı yardım'],
  permLevel: 0
};
exports.help = {
  name: 'canlıdestek',
  description: 'Canlı Destek Tablebi Oluşturur.',
  usage: 'canlıdestek'
};
