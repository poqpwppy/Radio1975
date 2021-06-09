const { ownerID } = require('../../config.json');
module.exports = {
  name: "bug",
category: "info",
run : async(client, message, args) => { 
// again make this fit your command handler style 😀
  if (!args[0]) return message.reply("Hãy đưa lỗi!. Ví dụ:\n`/Lệnh gì gì đó không hoạt động, sửa đê`");   
  if (args[0] === "bug") return message.reply("Hãy đưa lỗi!. Ví dụ:\n`/Lệnh gì gì đó không hoạt động, sửa đê`");   
  args = args.join(" ");   
  message.reply("Cảm ơn đã gửi lỗi!");  
  const content = `\`\`\`**${message.author.username}#${message.author.discriminator}** (${message.author.id}) reported:\n~~--------------------------------~~\n${args}\n~~--------------------------------~~\nOn the server: **${message.guild.name}**\nServer ID: **${message.guild.id}**\`\`\``;   
  const owner = await client.users.fetch(ownerID);
  owner.send(content)
}
}