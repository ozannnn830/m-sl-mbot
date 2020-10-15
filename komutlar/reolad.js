exports.run = (client, message, args) => {
  if (message.author.id !== '713678882011742230') return message.channel.send( " Bu Komutu Sadece `Yapımcım` **Kullanabilir!**")
    var command = args[0];
  if (!command) return message.reply("Bir Komut Adı Yazmalısın!")
    message.channel.send("`" + command + "` Adlı Komut Yükleniyor...")
      .then(m => {
        client.load(command)
          .then(() => {
            m.edit("`" + command + "` Adlı Komut Başarıyla Yüklendi.");
          })
          .catch(e => {
            m.edit("`komutlar` Klasöründe `"+command+".js` İsminde Bir Dosya Yok!");
          });
      });
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['rl','rr','reolad'],
	permLevel: 0,
    kategori: "yapımcı",

}

exports.help = {
	name: 'load',
	description: 'Yeni eklenen bir komutu bot yeniden başlamaya gerek kalmadan yükler.',
	usage: 'load <komut adı>',
}