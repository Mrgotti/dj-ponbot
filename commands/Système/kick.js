const Command = require("../../modules/Command.js");
const Discord = require("discord.js");

class Kick extends Command {
  constructor(client) {
    super(client, {
      name: "kick",
      description: "Kicker un utilisateur définitivement.",
      usage: "kick",
      category: "Système",
      permLevel: "Alex"
    });
  }

  async run(message, args) {
    try {
      const kickedUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
      );
      if (!kickedUser) {
        return message.channel.send("L'utilisateur n'existe pas !");
      }
      const kickReason = args.join(" ").slice(22);

      const kickEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#dc143c")
        .addField("Utilisateur kick", `${kickedUser} (ID: ${kickedUser.id})`)
        .addField("Raison", kickReason);

      const kickChannel = message.guild.channels.find(
        x => x.name === "bot-logs"
      );

      message.guild.member(kickedUser).kick(kickReason);
      kickChannel.send(kickEmbed);
      message.delete();
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Kick;
