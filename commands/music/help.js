const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Help Command!",
  usage: "Help | <Tên lệnh>",
  run: async(client, message, args) => {
    
    message.delete();
    
    let embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`${client.user.username} CÁC LỆNH!`)
    .setDescription(`Dùng ${Prefix}Help <Command Name> Để Biết Thêm THông Tin!` + "\n\n"  + "**Âm nhạc**\n`Drop, Jump, loop, Nowplaying, Pause, Queue, Resume, Skip, Stop, Volume`")
    .setFooter(`Hỏi Bởi ${message.author.username}`)
    .setTimestamp();
    
    if (!args.length) return message.channel.send(embed);

    let cmd =
      client.commands.get(args[0].toLowerCase()) ||
      client.commands.get(client.aliases.get(args[0].toLowerCase()));

    let embed2 = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Thông tin lệnh ${cmd.name}!`)
      .addField(`Thay thế:`, cmd.aliases || "Không có!")
      .addField(`Cách dùng:`, cmd.usage || "Không có cách dùng")
      .addField(`Thông tin:`, cmd.description || "Không Có Thông Tin!")
      .setTimestamp();

    if (cmd) {
      return message.channel.send(embed2);
    } else {
      return message.channel.send(embed);
    }
  }
};
