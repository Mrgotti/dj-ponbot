const Command = require("../../modules/Command.js");
const Discord = require("discord.js");

class Leaderboard extends Command {
  constructor(client) {
    super(client, {
      name: "leaderboard",
      description: "Renvoie le classement du serveur (top 10).",
      usage: "leaderboard",
      aliases: ["lead"]
    });
  }

  async run(message) {
    try {
      const filtered = this.client.points
        .filter(p => p.guild === message.guild.id)
        .array();
      const sorted = filtered.sort((a, b) => b.points - a.points);
      const top10 = sorted.splice(0, 10);

      const embed = new Discord.RichEmbed()
        .setThumbnail(
          "https://getcodingknowledge.com/wp-content/uploads/2019/01/level.png"
        )
        .setColor("#ff4ff6");
      for (const data of top10) {
        embed.addField(
          this.client.users.get(data.user).tag,
          `${data.points} points (level ${data.level})`
        );
      }
      message.delete();
      return message.channel.send({ embed }).then(msg => msg.delete(30000));
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Leaderboard;
