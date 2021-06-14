const { MessageEmbed } = require("discord.js")
const { COLOR } = require("../../config.json");

module.exports = {
  name: "loop",
  aliases: [""],
  category: "music",
  description: "Loop Your Queue and have fun",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bạn không có quyền')
    let embed = new MessageEmbed()
    .setColor(COLOR);

    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("Bạn phải ở trong kênh âm thoại :/")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Không có bài gì để phát vòng lặp")
      return message.channel.send(embed);
    }
    
    //OOOOF
    serverQueue.loop = !serverQueue.loop;
    
    if (serverQueue.loop === true) {
     serverQueue.songs.push(serverQueue.songs.shift())
     embed.setDescription('Lặp lại đã **Bật**')
    }
    else {
     serverQueue.songs.shift()
     embed.setDescription('Lặp lại đã **Tắt**')
    };
    
    embed.setThumbnail(client.user.displayAvatarURL())
    message.channel.send(embed);
    play(serverQueue.songs[0])
  }
    
    
    
  
};
