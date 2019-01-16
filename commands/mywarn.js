exports.run = async (bot, msg) => {
  const warnedUser = msg.guild.member(msg.author);
  const userWarnings = bot.warns.get(`${warnedUser.id}`, "warnings");

  msg.channel.send(
    `${warnedUser}, tu possèdes actuellement ${userWarnings} avertissement(s).`
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "mywarn",
  description: "Connaître le nombre d'avertissement qu'un utilisateur possède.",
  usage: "mywarn"
};
