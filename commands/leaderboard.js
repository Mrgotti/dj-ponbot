const Discord = require("discord.js");

exports.run = async (bot, message) => {
  const filtered = bot.points.filter(p => p.guild === message.guild.id).array();
  const sorted = filtered.sort((a, b) => b.points - a.points);
  const top10 = sorted.splice(0, 10);

  const embed = new Discord.RichEmbed()
    .setTitle("Le top 10 du serveur !")
    .setColor(0x00ae86);
  for (const data of top10) {
    embed.addField(
      bot.users.get(data.user).tag,
      `${data.points} points (level ${data.level})`
    );
  }
  message.delete();
  return message.channel.send({ embed }).then(msg => msg.delete(10000));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["lead"],
  permLevel: 0
};

exports.help = {
  name: "leaderboard",
  description: "Renvoie le classement du serveur (top 10).",
  usage: "leaderboard | z:lead"
};
