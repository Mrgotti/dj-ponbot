const Discord = require("discord.js");

exports.run = async (bot, msg) => {
  const pollEmbed = new Discord.RichEmbed()
    .setTitle("Sujet pour la prochaine vidéo Discord")
    .setColor("#dc143c")
    .setFooter("Appuyez sur une des réactions ci-dessous.")
    .setDescription(
      ":one: Lecture de la documentation. \n :two: Comment stocker des données avec Enmap."
    );

  msg.channel.send(pollEmbed);
  msg.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "poll",
  description: "Sondage.",
  usage: "poll [question]"
};
