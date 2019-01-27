const Command = require("../../modules/Command.js");

class Playlist extends Command {
  constructor(client) {
    super(client, {
      name: "playlist",
      description:
        "Commande renvoyant les playlists Discord disponible sur YouTube.",
      usage: "playlist"
    });
  }

  async run(message) {
    try {
      message.channel
        .send(
          "Lien vers la première playlist : https://www.youtube.com/watch?v=8GOqJmGwQPM&index=2&list=PLuWyq_EO5_AKv7cA_PLUFlVMpSwueUSCG.\n Lien vers la deuxième  playlist : https://www.youtube.com/watch?v=kFfEBKnr0gs&list=PLuWyq_EO5_AKux6AAAfMvhM6nAWTGJ380&index=1."
        )
        .then(message => message.delete(30000));
      message.delete();
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Playlist;
