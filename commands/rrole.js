exports.run = async (bot, msg, args) => {
  const memberRole = msg.guild.member(msg.author);
  if (!memberRole) {
    return msg.channel.send("L'utilisateur n'existe pas !");
  }

  const roleToAdd = args[0];
  if (!roleToAdd) return msg.channel.send("Spécifier un rôle");

  var role;

  if (roleToAdd === "htmlcss") {
    role = msg.guild.roles.find(x => x.name === "HTML-CSS");
    memberRole.removeRole(role.id);
    msg.channel
      .send(
        `Félicitation ${memberRole}, tu as enlevé le rôle ${roleToAdd} avec succès !`
      )
      .then(msg => msg.delete(5000));
  } else if (roleToAdd === "javascript") {
    role = msg.guild.roles.find(x => x.name === "Javascript");
    memberRole.removeRole(role.id);
    msg.channel
      .send(
        `Félicitation ${memberRole}, tu as enlevé le rôle ${roleToAdd} avec succès !`
      )
      .then(msg => msg.delete(5000));
  } else if (roleToAdd === "ruby") {
    role = msg.guild.roles.find(x => x.name === "Ruby");
    memberRole.removeRole(role.id);
    msg.channel
      .send(
        `Félicitation ${memberRole}, tu as enlevé le rôle ${roleToAdd} avec succès !`
      )
      .then(msg => msg.delete(5000));
  } else if (roleToAdd === "discordbot") {
    role = msg.guild.roles.find(x => x.name === "Discord-bot");
    memberRole.removeRole(role.id);
    msg.channel
      .send(
        `Félicitation ${memberRole}, tu as enlevé le rôle ${roleToAdd} avec succès !`
      )
      .then(msg => msg.delete(5000));
  } else if (roleToAdd === "wordpress") {
    role = msg.guild.roles.find(x => x.name === "Wordpress");
    memberRole.removeRole(role.id);
    msg.channel
      .send(
        `Félicitation ${memberRole}, tu as enlevé le rôle ${roleToAdd} avec succès !`
      )
      .then(msg => msg.delete(5000));
  } else {
    msg.channel.send("Rôle introuvable ou non autorisé.");
  }

  msg.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "rrole",
  description: "Commande pour enlever un role.",
  usage: "rrole <role>"
};
