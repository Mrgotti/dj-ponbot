const Command = require("../../modules/Command.js");

class Mywarn extends Command {
  constructor(client) {
    super(client, {
      name: "mywarn",
      description: "Connaître le nombre d'avertissement que tu possèdes.",
      usage: "mywarn"
    });
  }

  async run(message) {
    try {
      const warnedUser = message.guild.member(message.author);

      this.client.warns.ensure(`${warnedUser.id}`, {
        warnings: 0
      });

      const userWarnings = this.client.warns.get(
        `${warnedUser.id}`,
        "warnings"
      );

      message.channel.send(
        `${warnedUser}, tu possèdes actuellement ${userWarnings} avertissement(s).`
      );
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Mywarn;
