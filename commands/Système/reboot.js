const Command = require("../../modules/Command.js");

class Reboot extends Command {
  constructor(client) {
    super(client, {
      name: "reboot",
      description: "Eteindre et relancer le bot.",
      usage: "reboot",
      category: "Système",
      permLevel: "Alex"
    });
  }

  async run(message) {
    try {
      await message.reply("Bot is shutting down.");
      this.client.commands.forEach(async cmd => {
        await this.client.unloadCommand(cmd);
      });
      process.exit(1);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Reboot;
