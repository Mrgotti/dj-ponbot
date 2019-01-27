const Command = require("../../modules/Command.js");

class Level extends Command {
  constructor(client) {
    super(client, {
      name: "level",
      description:
        "Renvoie le niveau et les points d'expérience de l'utilisateur.",
      category: "Expérience",
      usage: "level"
    });
  }

  async run(message) {
    try {
      return message.channel.send(
        `Tu as actuellement ${this.client.points.get(
          `${message.guild.id}-${message.author.id}`,
          "points"
        )} points d'expérience, et tu es niveau ${this.client.points.get(
          `${message.guild.id}-${message.author.id}`,
          "level"
        )}!`
      );
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Level;
