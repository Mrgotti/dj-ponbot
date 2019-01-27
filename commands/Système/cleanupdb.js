const Command = require("../../modules/Command.js");

class Cleanupdb extends Command {
  constructor(client) {
    super(client, {
      name: "cleanupdb",
      description:
        "Nettoyer la base de données des utilisateurs n'ayant pas parlé depuis 1 mois (ou ceux qui ont quitté).",
      usage: "cleanupdb",
      category: "Expérience",
      permLevel: "Alex"
    });
  }

  async run(message) {
    try {
      const filtered = this.client.points.filter(
        p => p.guild === message.guild.id
      );
      const rightNow = new Date();
      const toRemove = filtered.filter(data => {
        return (
          !message.guild.members.has(data.user) ||
          rightNow - 2592000000 > data.lastSeen
        );
      });
      toRemove.forEach(data => {
        this.points.delete(`${message.guild.id}-${data.user}`);
      });
      message.channel.send(`J'ai nettoyé ${toRemove.size} anciens membres.`);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Cleanupdb;
