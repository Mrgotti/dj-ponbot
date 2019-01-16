const Discord = require("discord.js");

exports.run = (bot, msg, args) => {
  const kickedUser = msg.guild.member(
    msg.mentions.users.first() || msg.guild.members.get(args[0])
  );
  if (!kickedUser) {
    return msg.channel.send("L'utilisateur n'existe pas !");
  }
  const kickReason = args.join(" ").slice(22);

  const kickEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#dc143c")
    .addField("Utilisateur kick", `${kickedUser} (ID: ${kickedUser.id})`)
    .addField("Raison", kickReason);

  const kickChannel = msg.guild.channels.find(x => x.name === "bot-logs");

  msg.guild.member(kickedUser).kick(kickReason);
  kickChannel.send(kickEmbed);
  msg.delete();
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "kick",
  description: "Kick.",
  usage: "kick [utilisateur] [raison]"
};
