const Command = require("../../modules/Command.js");

class Api extends Command {
  constructor(client) {
    super(client, {
      name: "api",
      description: "Renvoie un lien vers une liste d'APIs publiques.",
      usage: "api"
    });
  }

  async run(message) {
    try {
      message.channel
        .send("https://github.com/toddmotto/public-apis")
        .then(message => message.delete(20000));
      message.delete();
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Api;
