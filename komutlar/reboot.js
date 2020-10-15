const Discord = require('discord.js');
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json")

module.exports.run = async (bot, message, args) => { 
   
  var embed2 = new Discord.RichEmbed()   
      .setTitle('Merhaba, ' + message.member.user.username)
      .setDescription('sadece Sahibim Bu Komutu  Kullanabilir! Yani `<@713678882011742230>')
      .setColor('RED') 
  

    if(message.author.id !== "713678882011742230") return message.channel.sendEmbed(embed2)
     



  //Cortex botun reboot sistemi hadi h.o
  var embed = new Discord.RichEmbed()   
      .setTitle('**Merhaba Sahibim EmEkLi MüSlÜm BaBa,**')
      .setDescription('Beni Yeniden Başlatmak İstediğine Eminsen Aşağıdaki **TİK** İşaretine, Bir Kere Dokunur Musun?')
      .setColor('RANDOM')
message.channel.send(embed).then(async function (sentEmbed) {
			const emojiArray = ["✅"];
			const filter = (reaction, user) => emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
			await sentEmbed.react(emojiArray[0]).catch(function () { });
			var reactions = sentEmbed.createReactionCollector(filter, {
				time: 30000
			});




reactions.on("end", () => message.delete().then(mr => sentEmbed.delete()).then(m => message.delete()).then(m2 => message.author.send("Yeniden Başlatma İşlemi İptal Ettim! "))) 
    reactions.on("collect", async function (reaction) {
				if (reaction.emoji.name === "✅") {
  try {
    message.delete().then(mr => sentEmbed.delete()).then(wb => { 
 console.log(`BOT: Bot yeniden başlatılıyor...`);
    process.exit(0);
    })
  } catch (err) {
  // Pudochu
    message.channel.send(`**Hata:** \n\`\`\`js\n${err}\n\`\`\``);
  
};

        }
    })
})

};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['reboot', 'Reboot', 'yenidenbaşlat', 'yenile', 'rebot', 'rebooot', 'reboott', 'reb','Reb','retet','Reset'],
  permLevel: 0
};

module.exports.help = {
  name: 'reboot',
  description: 'Sistemi yeniden başlatır',
  usage: 'reboot'
};