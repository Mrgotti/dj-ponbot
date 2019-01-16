const Discord = require("discord.js");

exports.run = (bot, msg, args) => {
  const bannedUser = msg.guild.member(
    msg.mentions.users.first() || msg.guild.members.get(args[0])
  );
  if (!bannedUser) {
    return msg.channel.send("L'utilisateur n'existe pas !");
  }
  const banReason = args.join(" ").slice(22);

  const banEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#dc143c")
    .addField("Utilisateur ban", `${bannedUser} (ID: ${bannedUser.id})`)
    .addField("Raison", banReason);

  const banChannel = msg.guild.channels.find(x => x.name === "bot-logs");

  msg.guild.member(bannedUser).ban(banReason);
  banChannel.send(banEmbed);
  msg.delete();
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "ban",
  description: "Bannir.",
  usage: "ban [utilisateur] [raison]"
};
