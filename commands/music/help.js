const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description:
    "Lấy danh sách các lệnh",
  usage: "help <cmd>",
  category: "Help",
  run: async (client, message, args) => {
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Lệnh không xác định: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("Mô tả lệnh", command.description || "Không cung cấp :(")
        .addField("Cách dùng", "`" + command.usage + "`" || "Không cung cấp :(")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("ffccbc")
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setDescription("[Support server](https://discord.gg/BwGcJgc83u) | Bot được làm bởi quak#4951")
        .setColor("ffccbc")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL());

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Không xác định";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
      }

      return message.channel.send(emx);
    }
  }
};
