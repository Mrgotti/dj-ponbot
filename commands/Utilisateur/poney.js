const Command = require("../../modules/Command.js");

class Poney extends Command {
  constructor(client) {
    super(client, {
      name: "poney",
      description: "Commande pour renvoyer une image de poney aléatoire.",
      usage: "poney"
    });
  }

  async run(message) {
    try {
      const number = 81;
      const imageNumber = Math.floor(Math.random() * (number - 1 + 1)) + 1;
      message.channel.send({ files: ["./images/" + imageNumber + ".gif"] });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Poney;
