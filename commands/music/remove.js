module.exports = {
        name: "remove",
        aliases: ["rs"],
        category: "music",
        description: "Bỏ một bài nhạc trong hàng chờ!",
        usage: "[song number]",
        acessableby: "everyone"
    run: async (bot, message, args, ops) => {
        if (!args[0]) return message.channel.send("**Nhập id bài nhạc bạn muốn bỏ!**")

        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('Bạn cần ở trong kênh voice!');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("**Bạn cần ở cùng kênh thoại với bot!**");
        };
        const serverQueue = ops.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('❌ **Không có bài nhạc nào đang được chơi trong server**');
      try {
        if (args[0] < 1 && args[0] >= serverQueue.songs.length) {
            return message.channel.send('**Hãy nhập 1 id bài nhạc thích hợp!**');
        }
        serverQueue.songs.splice(args[0] - 1, 1);
        return message.channel.send(`Đã bỏ bài nhạc số ${args[0]} khỏi hàng chờ`);
      } catch {
          serverQueue.connection.dispatcher.end();
          return message.channel.send("**Đã xảy ra lỗi!**")
      }
    }
};
