const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "remove",
    aliases: ["rm"],
    category: "music",
    usage: "q/rm <id bài hát trong hàng chờ>",

    run: async(client, message, args) => {
        let channel = message.member.voice.channel;
        if (!channel) return message.channel.send('Bạn phải ở trong kênh thoại!')
        
        let server = message.client.queue.get(message.guild.id)
        if (!server) return message.channel.send('Không có gì đang phát trong hàng chờ!')
        if (!args[0]) return message.channel.send('Bạn phải cung cấp id bài hát!')
        
        const song = queue.songs.splice(args[0] - 1, 1)
        message.react("✅")

        let embed = new MessageEmbed()
        .setColor("ffccbc")
        .setDescription(`Đã xóa ${song[0].title} khỏi hàng chờ`)
        .setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed)

    }
}
