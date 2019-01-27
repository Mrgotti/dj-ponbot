const Command = require("../../modules/Command.js");

class BotLink extends Command {
  constructor(client) {
    super(client, {
      name: "botlink",
      description: "Renvoie un lien vers le repository du bot.",
      usage: "botlink",
      aliases: ["bot"]
    });
  }

  async run(message) {
    try {
      message.channel
        .send(
          "Lien vers le bot : https://github.com/dj-pon/dj-ponbot (se supprime automatiquement après 20 secondes)."
        )
        .then(message => message.delete(20000));
      message.delete();
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = BotLink;
