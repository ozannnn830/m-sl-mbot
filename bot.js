const Discord = require('discord.js');//Keles
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');//Keles
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
client.queue = new Map()

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Başarıyla Hostladım Botu :).");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut Yüklenecek`);
    files.forEach(f => {
     let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 1;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

const youtube = new YouTube('API');

client.on('message', async msg => {

	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

	if (command === 'sadecebotunsahibikullanır') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('BLACK')
    .setDescription(':x: **Bu Komutu Kullanmak İçin Bir Ses Kanalında Olmanız Gerekir!**'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('BLACK')
    .setTitle(':x: **Bu Komutu Kullanmak İçin Bir Ses Kanalında Olmanız Gerekir!**'));
		}
		if (!permissions.has('SPEAK')) {
			 return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('BLACK')
      .setTitle(":x: Kanalda Konuşma İznim Olmadığı Veya Mikrofonum Kapalı Olduğu İçin Müziği Açamıyorum / Şarkı Çalamıyorum..."));
        }

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
		for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			 return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setTitle(`**Play list **${playlist.title}** Sıraya Eklendi!**`)
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          
				 msg.channel.sendEmbed(new Discord.RichEmbed()                  
         .setTitle(':musical_note: Şarkı Seçimi')
         .setAuthor(`${msg.author.tag}`, msg.author.avatarURL)
         .setThumbnail("https://i.postimg.cc/W1b1LW13/youtube-kids-new-logo.png")
         .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
         .setFooter('Şarkı Değeri Belirt 10 Saniye İçinde Kaybolcak!')
         .setColor('BLACK'));
          msg.delete(5000)
         
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						 return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('BLACK')
            .setDescription(':x: ***Şarkı Değerini Belirtmediği İçin Seçim İptal Edildi!**'));
                    }
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('BLACK')
          .setDescription(':x: **Aradım Ama Sonuç Yok!**'));
                }
            }
			return handleVideo(video, msg, voiceChannel);
      
		}
	
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('BLACK')
    .setDescription(':x: **Bu Komutu Kullanmak İçin Bir Ses Kanalında Olmanız Gerekir!**'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('BLACK')
     .setTitle(":x: Şu Anda Çalan Şarkı Yok!"));                                              
		if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
   .setTitle(`Current Volume: **${serverQueue.volume}**`)
    .setColor('BLACK'))
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(`Setting Volume: **${args[1]}**`)
    .setColor('BLACK'));                             
	} else if (command === 'now') {
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(":x: **Şu Anda Çalan Şarkı Yok!**")
    .setColor('BLACK'));
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('BLACK')
    .setTitle(" :headphones: | Şimdi Çalıyor")                            
    .addField('Şarkı Adı', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Oynamaya Kadar Tahmini Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === '') {
    let index = 0;
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(":x: **Sırada Müzik Yok!**")
    .setColor('BLACK'));
		  return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
     .setTitle('Song queue')
    .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
    .addField('Şimdi Çalıyor: ' + `${serverQueue.songs[0].title}`);
	
	}
});


async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
        durations: video.duration.seconds,
      zg: video.raw.snippet.channelId,
      best: video.channel.title,
      views: video.raw.views,
    };
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`:x:Ses Kanalına Giremedim ERROR: ${error}**`);
			queue.delete(msg.guild.id);
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`:x:Ses Kanalına Giremedim ERROR: ${error}**`)
      .setColor('BLACK'))
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(`:arrow_heading_up:  **${song.title}** Sıraya Adlı Müzik Eklendi!`)
    .setColor('BLACK'))
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === ' :x: **Yayın Akış Hızı Yeterli Değil!**') console.log('Şarkı Bitdi!');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);//Keles
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	 serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()                                   
  .setTitle("**:microphone: Şarkı Başladı!**")
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg`)
  .addField('\Song Name', `[${song.title}](${song.url})`, true)
  .addField("\nVolume", `${serverQueue.volume}%`, true)
  .addField("time", `${song.durationm}:${song.durations}`, true)
  .addField("video ID", `${song.id}`, true)
  .addField("channel ID", `${song.zg}`, true)
  .addField("channel name", `${song.best}`, true)
  .addField("Video Link", `${song.url}`, true)                              
  .setImage(`https://i.ytimg.com/vi/${song.id}/hqdefault.jpg`)
  .setColor('BLACK'));
}

client.on('message', msg => {
  if (msg.content.toLowerCase() === '+helpa') {
    msg.channel.send('** **')
    }
});
client.on('message', msg => {
  
  if (msg.content.toLowerCase() === `<@${client.user.id}>`) {
   
    msg.channel.send('**Buradaki Prefixim** `m!` ')
    
  }
});
client.on('message', msg => {
  
  if (msg.content.toLowerCase() === '') {
    const eris = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    msg.channel.send();
  }
});
client.on('guildCreate', guild => {

    let kanal = guild.channels.filter(c => c.type === "text").random()
const embed = new Discord.RichEmbed()
.setTitle('Selamlar Ben Geldim Sabahlara Kadar Şarkı Dinlemeye Hazırmısınz? Prefix: m! Yardım Menüsü: m!yardım')
kanal.send(embed)
    

});

client.login(ayarlar.token);  
//Keles



//prefix etitek

client.on('message', async msg => {
   let prefix = ayarlar.prefix;
  if(msg.content == `<@!758443809284685824>`) return msg.channel.send(` **🌙 | Müslüm Gürses Hatırasına Bot Prefix**\n\n Sanırım Beni Etiketlediniz. Sunucuya Ayarlı Prefix \`${prefix}\``);
});









//bot eklendi bildirim





//eklendin atıldım v2..ss



client.on("guildCreate", guild => {
  let log = client.channels.get("759726176154419251");
  const embed = new Discord.RichEmbed()
    .setAuthor("Yeni Bir Sunucuya Eklendim!")
    .setThumbnail(
      guild.iconURL ||
        "https://cdn.discordapp.com/avatars/713678882011742230/a_f699037994df4683a67a637a99021a9b.gif"
    )
    .setColor("GREEN")
         .addField("» Sunucu İsmi:", `**${guild.name}**`)
    .addField("» Sunucu ID:", `\`\`\`${guild.id}\`\`\``)
    .addField(
      "Sunucu Bilgisi:",
      `**Sunucu Sahibi: \`${guild.owner}\`\nSunucu Bölgesi: \`${guild.region}\`\nÜye Sayısı: \`${guild.members.size}\`\nKanal Sayısı: \`${guild.channels.size}\`**`
    )
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);
  log.send(embed);
});
client.on("guildDelete", guild => {
  let log = client.channels.get("759726176154419251");
  const embed = new Discord.RichEmbed()
    .setAuthor("Bir Sunucudan Atıldım! -_-")
    .setThumbnail(
      guild.iconURL ||
        "https://cdn.discordapp.com/avatars/713678882011742230/a_f699037994df4683a67a637a99021a9b.gif"
    )
    .setColor("RED")
       .addField("» Sunucu İsmi:", `**${guild.name}**`)
    .addField("» Sunucu ID:", `\`\`\`${guild.id}\`\`\``)
    .addField(
      "Sunucu Bilgisi:",
      `**Sunucu Sahibi: \`${guild.owner}\`\nSunucu Bölgesi: \`${guild.region}\`\nÜye Sayısı: \`${guild.members.size}\`\nKanal Sayısı: \`${guild.channels.size}\`**`
    )
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);
  log.send(embed);
});
 



// bot dm mesajlerı


	client.on("message", message => {
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        const dmlog = new Discord.RichEmbed()
         .setTitle(`${client.user.username}'a Özelden Mesaj Gönderdi!`)
         .setColor('RED')
         .addField('Mesajı Gönderen',` \`\`\`${message.author.tag} \`\`\` `)
         .addField('Mesajı Gönderenin ID', ` \`\`\`${message.author.id}\`\`\` `)
         .addField('Gönderilen Mesaj', ` \`\`\`${message.content}\`\`\` `)
         .setThumbnail(message.author.avatarURL) 
    client.channels.get("761357887787761685").send(dmlog);
    }
});





