const Command = require("../../modules/Command.js");

class Rrole extends Command {
  constructor(client) {
    super(client, {
      name: "rrole",
      description: "Commande pour enlever un rôle choisi.",
      usage: "rrole"
    });
  }

  async run(message, args) {
    try {
      const memberRole = message.guild.member(message.author);
      if (!memberRole) {
        return message.channel.send("L'utilisateur n'existe pas !");
      }

      const roleToAdd = args[0];
      if (!roleToAdd) return message.channel.send("Spécifier un rôle");

      var role;

      if (roleToAdd === "htmlcss") {
        role = message.guild.roles.find(x => x.name === "HTML-CSS");
        memberRole.removeRole(role.id);
        message.channel
          .send(
            `Félicitation ${memberRole}, tu as enlevé le rôle ${roleToAdd} avec succès !`
          )
          .then(message => message.delete(5000));
      } else if (roleToAdd === "javascript") {
        role = message.guild.roles.find(x => x.name === "Javascript");
        memberRole.removeRole(role.id);
        message.channel
          .send(
            `Félicitation ${memberRole}, tu as enlevé le rôle ${roleToAdd} avec succès !`
          )
          .then(message => message.delete(5000));
      } else if (roleToAdd === "ruby") {
        role = message.guild.roles.find(x => x.name === "Ruby");
        memberRole.removeRole(role.id);
        message.channel
          .send(
            `Félicitation ${memberRole}, tu as enlevé le rôle ${roleToAdd} avec succès !`
          )
          .then(message => message.delete(5000));
      } else if (roleToAdd === "discordbot") {
        role = message.guild.roles.find(x => x.name === "Discord-bot");
        memberRole.removeRole(role.id);
        message.channel
          .send(
            `Félicitation ${memberRole}, tu as enlevé le rôle ${roleToAdd} avec succès !`
          )
          .then(message => message.delete(5000));
      } else if (roleToAdd === "wordpress") {
        role = message.guild.roles.find(x => x.name === "Wordpress");
        memberRole.removeRole(role.id);
        message.channel
          .send(
            `Félicitation ${memberRole}, tu as enlevé le rôle ${roleToAdd} avec succès !`
          )
          .then(message => message.delete(5000));
      } else {
        message.channel.send("Rôle introuvable ou non autorisé.");
      }

      message.delete();
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Rrole;
