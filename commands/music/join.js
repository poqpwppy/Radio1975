const ytdl = require('ytdl-core-discord');
var scrapeYt = require("scrape-yt");
const discord = require('discord.js')

module.exports = {
  name: "join",
  aliases: ["join"],

  run: async (client, message, args) => {

    let bot = message.me.voice.channel;
    if(bot) return message.channel.send('Tôi đang được sử dụng rồi!');
    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send('Bạn phải ở trong kênh thoại!')

    if (!channel.permissionsFor(message.client.user).has("CONNECT")) return message.channel.send('Tôi không có quyền để tham gia kênh âm thoại')
    if (!channel.permissionsFor(message.client.user).has("SPEAK"))return message.channel.send('Tôi không có quyền để nói trong kênh')
    channel.join();
    try {
        const connection = await channel.join();
        queueConstruct.connection = connection;
        play(queueConstruct.songs[0]);
    } catch (error) {
        console.error(`I could not join the voice channel`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`I could not join the voice channel: ${error}`);
    }
  }
}
