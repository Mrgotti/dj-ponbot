exports.run = async (bot, msg) => {
  const warnedUser = msg.guild.member(msg.author);

  bot.warns.ensure(`${warnedUser.id}`, {
    warnings: 0
  });

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
  description: "Connaître le nombre d'avertissement que tu possèdes.",
  usage: "mywarn"
};
