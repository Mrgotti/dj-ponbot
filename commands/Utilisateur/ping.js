const Command = require("../../modules/Command.js");

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Latence du bot + réponse API.",
      usage: "ping",
      aliases: ["pong"]
    });
  }

  async run(message) {
    try {
      const msg = await message.channel.send("🏓 Ping!");
      msg.edit(
        `🏓 Pong! (🏁Latence bot: ${msg.createdTimestamp -
          message.createdTimestamp}ms. 💙API: ${Math.round(
          this.client.ping
        )}ms.)`
      );
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Ping;
