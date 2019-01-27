const Command = require("../../modules/Command.js");
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

class Stats extends Command {
  constructor(client) {
    super(client, {
      name: "stats",
      description: "Informations utiles sur le bot.",
      usage: "stats"
    });
  }

  async run(message) {
    // eslint-disable-line no-unused-vars
    const duration = moment
      .duration(this.client.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");
    message.channel.send(
      `= STATISTICS =
  • Mémoire      :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
    2
  )} MB
  • Uptime       :: ${duration}
  • Utilisateurs :: ${this.client.users.size.toLocaleString()}
  • Salons       :: ${this.client.channels.size.toLocaleString()}
  • Discord.js   :: v${version}
  • Node         :: ${process.version}`,
      { code: "asciidoc" }
    );
  }
}

module.exports = Stats;
