const Command = require("../../modules/Command.js");

class MyPerm extends Command {
  constructor(client) {
    super(client, {
      name: "myperm",
      description: "Affiche votre niveau de permission.",
      usage: "myperm",
      guildOnly: true
    });
  }

  async run(message, args, level) {
    const friendly = this.client.config.permLevels.find(l => l.level === level)
      .name;
    message.reply(`Votre niveau de permission est: ${level} - ${friendly}`);
  }
}

module.exports = MyPerm;
