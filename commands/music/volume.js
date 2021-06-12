module.exports = {
  name: "volume",
  aliases: ["vol"],
  category: "music",

  run: async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bạn không có quyền')
    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('Bạn phải tham gia kênh âm thoại !');

    let queue = message.client.queue.get(message.guild.id)

    if(!args[0]) return message.channel.send({
        embed: {
            description: 'Âm lượng gần đây là: ' + queue.volume
        }
    })

    if(args[0] > 10) return message.channel.send('Ồ mày muôn lên thiên đàng à :grin:')

    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    queue.volume = args[0]
    message.channel.send({
        embed: {
            description: 'Âm lượng chỉnh thành ' + args[0]
        }
    })
}}
