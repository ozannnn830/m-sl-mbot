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
        
    const a = new RichEmbed()
    .setColor("#0f0f0f")
    .setDescription(`:x: **Bu Komutu Kullanmak İçin Bir Ses Kanalında Olmanız Gerekir!.**`)  
  if (!voiceChannel) return message.channel.send(a)

  if (serverQueue && serverQueue.playing) {
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();
        const asjdhsaasjdhaadssad = new RichEmbed()
    .setColor("#0f0f0f")
    .setDescription(`Duraklatıldı :pause_button:`)
      return message.channel.send(asjdhsaasjdhaadssad);
    }
    const b = new RichEmbed()
    .setColor("#0f0f0f")
    .setDescription(`:x: Şu Anda Çalan Şarkı Yok!`)
    if (!serverQueue) return message.channel.send(b);

};

exports.conf = {
    enabled: true,
    aliases: ['duraklak','duraklak','duraklt','duraklat','duratlak','duratlat','Duraklak','duraklk','Duraklk'],
    permLevel: 0
};

exports.help = {
    name: 'duraklat',
    description: 'Çalan şarkıyı duraklatır.',
    usage: 'duraklat'
};