exports.run = (client, message, args) => {
  if (message.author.id !== '713678882011742230') return message.channel.send( "Bu Komutu Sadece `Yapımcım` **Kullanabilir!**")
  let command;
  if (client.commands.has(args[0])) {
    command = args[0];
  } else if (client.aliases.has(args[0])) {
    command = client.aliases.get(args[0]);
    
  }
    
  
  if (!command) {
    return message.channel.send("`" + args[0] + "` Adında Bir Komut Yok!");
  } else {
    message.channel.send("`" + command + "` Adlı Komut Devre Dışı Bırakılıyor...")
      .then(m => {
        client.unload(command)
          .then(() => {
            m.edit("`" + command + "` Adlı Komut Başarıyla Devre Dışı Bırakıldı.");
          })
          .catch(e => {
            m.edit(`Komut Yeniden Başlatılırken Bir Hata Oluştu: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
      });
    
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kk','komut-kapat'],
  permLevel: 0
};
exports.help = {
  name: 'komutkapat',
  description: 'İstediğiniz bir komutu devre dışı bırakır.',
  usage: 'komutkapat <komut adı>'
};