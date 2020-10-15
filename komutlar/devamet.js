const Discord = require('discord.js');//Keles
const { RichEmbed } = require('discord.js');//Keles
const YouTube = require('simple-youtube-api');//Keles
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyBTW0jnA023NBduCrds0Wz4PRwOOmDuQxI');

exports.run = async (client, message, args) => {
    const queue = client.queue;

    var searchString = args.slice(0).join(' ');
    var url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    var serverQueue = queue.get(message.guild.id);

    var voiceChannel = message.member.voiceChannel;
        
    const a = new RichEmbed()
    .setColor("#0f0f0f")
    .setDescription(`:x: **Bu Komutu Kullanmak İçin Bir Ses Kanalında Olmanız Gerekir!**`)  
  if (!voiceChannel) return message.channel.send(a)

    if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        const asjdhsaasjdhaadssad = new RichEmbed()
    .setColor("#0f0f0f")
    .setDescription(`:play_pause: Devam Ettiriliyor! :thumbsup:`)
      return message.channel.send(asjdhsaasjdhaadssad);
    }
    const b = new RichEmbed()
    .setColor("#0f0f0f")
    .setDescription(`:x: Şu Anda Çalan Şarkı Yok!`)
    if (!serverQueue) return message.channel.send(b);

};

exports.conf = {
    enabled: true,
    aliases: ['r','resum','devam-et'],
    permLevel: 0
};

exports.help = {
    name: 'devamet',
    description: 'Duraklatılmış şarkıyı devam ettirir.',
    usage: 'devamet'
};
//Keles