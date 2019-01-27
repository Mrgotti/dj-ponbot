const Command = require("../../modules/Command.js");

class Give extends Command {
  constructor(client) {
    super(client, {
      name: "give",
      description: "Donner des points d'expérience à un utilisateur.",
      usage: "give",
      category: "Système",
      permLevel: "Alex"
    });
  }

  async run(message, args) {
    try {
      if (message.author.id !== message.guild.ownerID)
        return message.reply("Seul Alex peut ajouter des points ;)");
      const user = message.mentions.users.first() || this.users.get(args[0]);
      if (!user) return message.reply("Il faut mentionner quelqu'un Alex ;)");
      const pointsToAdd = parseInt(args[1], 10);
      if (!pointsToAdd)
        return message.reply("Combien de points dois-je ajouter ?");
      this.client.points.ensure(`${message.guild.id}-${user.id}`, {
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1
      });
      let userPoints = this.client.points.get(
        `${message.guild.id}-${user.id}`,
        "points"
      );
      userPoints += pointsToAdd;
      this.client.points.set(
        `${message.guild.id}-${user.id}`,
        userPoints,
        "points"
      );
      message.channel.send(
        `${
          user.tag
        } a reçu ${pointsToAdd} points d'expérience et se retrouve maintenant à ${userPoints} points.`
      );
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Give;
