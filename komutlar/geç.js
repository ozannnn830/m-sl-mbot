const Discord = require('discord.js');
const { RichEmbed } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyBTW0jnA023NBduCrds0Wz4PRwOOmDuQxI');

exports.run = async (client, message, args) => {
    const queue = client.queue;
    
    var searchString = args.slice(0).join(' ');
    var url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    var serverQueue = queue.get(message.guild.id);

    var voiceChannel = message.member.voiceChannel;
        
    const err0 = new RichEmbed()
      .setColor("#0f0f0f")
      .setDescription(`:x: **Bu Komutu Kullanmak İçin Bir Ses Kanalında Olmanız Gerekir!**`)  
    if (!voiceChannel) return message.channel.send(err0);
    const err05 = new RichEmbed()
    .setColor("#0f0f0f")
    .setDescription(`:x: Şu Anda Çalan Şarkı Yok!`)
    if (!serverQueue) return message.channel.send(err05);
    const songSkip = new RichEmbed()
    .setColor("#0f0f0f")
    .setDescription(`Şarkı Başarıyla Atlandı!`)
    serverQueue.connection.dispatcher.end('');
    message.channel.send(songSkip)
if(!message.member.hasPermission("KİCK_MEMBERS")) return message.reply(":x: Şarkıyı Geçmek İçin Üyeleri At İznine Sahip Olman Gerekiyor! )");
};

exports.conf = {
    enabled: true,
    aliases: ['sk','geç'],
    permLevel: 0
};

exports.help = {
    name: 'geç',
    description: 'Sıradaki şarkıya geçer. Sırada şarkı yoksa şarkıyı kapatır.',
    usage: 'geç'
};