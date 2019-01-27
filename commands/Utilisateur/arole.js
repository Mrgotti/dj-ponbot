const Command = require("../../modules/Command.js");

class Arole extends Command {
  constructor(client) {
    super(client, {
      name: "arole",
      description: "Commande pour obtenir un rôle.",
      usage: "arole"
    });
  }

  async run(message, args) {
    try {
      const memberRole = message.guild.member(message.author);

      const roleToAdd = args[0];
      if (!roleToAdd)
        return message.channel
          .send("Spécifier un rôle !")
          .then(message => message.delete(2000));

      var role;

      if (roleToAdd === "htmlcss") {
        role = message.guild.roles.find(x => x.name === "HTML-CSS");
        memberRole.addRole(role.id);
      } else if (roleToAdd === "javascript") {
        role = message.guild.roles.find(x => x.name === "Javascript");
        memberRole.addRole(role.id);
      } else if (roleToAdd === "ruby") {
        role = message.guild.roles.find(x => x.name === "Ruby");
        memberRole.addRole(role.id);
      } else if (roleToAdd === "discordbot") {
        role = message.guild.roles.find(x => x.name === "Discord-bot");
        memberRole.addRole(role.id);
      } else if (roleToAdd === "wordpress") {
        role = message.guild.roles.find(x => x.name === "Wordpress");
        memberRole.addRole(role.id);
      } else {
        message.channel
          .send("Rôle introuvable ou non autorisé.")
          .then(message => message.delete(2000));
      }

      message.delete();
      if (
        roleToAdd === "instructeur" ||
        roleToAdd === "modérateur" ||
        roleToAdd === "moderateur" ||
        roleToAdd === "patron"
      ) {
        message.channel.send(
          `Bien essayé ${memberRole}, la sanction est à venir ;)`
        );
      } else if (
        roleToAdd === "htmlcss" ||
        roleToAdd === "javascript" ||
        roleToAdd === "ruby" ||
        roleToAdd === "discordbot" ||
        roleToAdd === "wordpress"
      ) {
        message.channel
          .send(
            `Félicitation ${memberRole}, tu as reçu le rôle ${roleToAdd} avec succès !`
          )
          .then(message => message.delete(3000));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Arole;
