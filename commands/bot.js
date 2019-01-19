exports.run = async (bot, msg) => {
  msg.channel
    .send(
      "Lien vers le bot : https://github.com/dj-pon/dj-ponbot (se supprime automatiquement après 20 secondes)."
    )
    .then(msg => msg.delete(20000));
  msg.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "bot",
  description: "Commande renvoyant le bot Discord du serveur.",
  usage: "bot"
};
