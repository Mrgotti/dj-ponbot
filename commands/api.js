exports.run = async (bot, msg) => {
  msg.channel
    .send("https://github.com/toddmotto/public-apis")
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
  name: "api",
  description: "Commande renvoyant une liste d'APIs publiques.",
  usage: "api"
};
