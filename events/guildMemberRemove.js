const Discord = require("discord.js");

module.exports = (bot, member) => {
  const newEmbed = new Discord.RichEmbed()
    .setThumbnail(
      "https://getcodingknowledge.com/wp-content/uploads/2018/12/leaveemoji.png"
    )
    .setTitle("Un utilisateur nous a quitté !")
    .setColor("#ff1e52")
    .addField(
      "Dj-pon3: J'ai une mauvaise nouvelle!",
      `${member.user.tag} est parti ... définitivement ?`
    )
    .setTimestamp();

  const newChannel = member.guild.channels.find(ch => ch.name === "bot-logs");
  newChannel.send(newEmbed);
};
