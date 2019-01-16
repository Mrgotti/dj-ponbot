const Discord = require("discord.js");

exports.run = async (bot, msg) => {
  const memberRole = msg.guild.member(msg.author);
  if (msg.member.hasPermission("ADD_REACTIONS")) {
    return msg.channel.send(
      "Vous ne pouvez pas utilser cette commande deux fois de suite !"
    );
  }

  const Accepted = msg.guild.roles.find(x => x.name === "Vérifié");

  await memberRole.addRole(Accepted);

  try {
    await memberRole.send(
      `Bravo ${memberRole}, tu as accepté notre charte et tu peux donc accéder au serveur normalement. Comme dit précédemment, n'hésite pas à accéder au salon #infos-et-règles afin d'en savoir plus sur le serveur et enfin le #salon-des-roles afin que tout le monde puisse identifier tes langages (la liste des langages disponibles se trouvent sur le salon). N'oublies pas que si tu souhaites me contacter les étapes pour le faire se trouvent sur le salon #me-contacter.`
    );
  } catch (e) {
    msg.channel.send(
      `Bravo ${memberRole}, tu as accepté notre charte et tu peux donc accéder au serveur normalement. Comme dit précédemment, n'hésite pas à accéder au salon #infos-et-règles afin d'en savoir plus sur le serveur et enfin le #salon-des-roles afin que tout le monde puisse identifier tes langages (la liste des langages disponibles se trouvent sur le salon). N'oublies pas que si tu souhaites me contacter les étapes pour le faire se trouvent sur le salon #me-contacter.`
    );
  }

  const newEmbed = new Discord.RichEmbed()
    .setThumbnail(
      "https://getcodingknowledge.com/wp-content/uploads/2018/12/welcomeemoji.png"
    )
    .setTitle("Nouvel(le) arrivant(e) !")
    .setColor("#16fff3")
    .addField(
      "J'adore les cupcakes et la programmation !",
      `Et toi ${memberRole.user.tag} ?`
    )
    .setFooter(
      "PS: si tu veux nous répondre, direction le salon #presentation!"
    )
    .setTimestamp();

  const newChannel = msg.guild.channels.find(x => x.name === "bot-logs");
  newChannel.send(newEmbed);

  msg.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "accept",
  description: "Commande pour accepter la charte du serveur.",
  usage: "accept <@pseudo>"
};
