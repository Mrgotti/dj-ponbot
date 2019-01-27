const Command = require("../../modules/Command.js");
const Discord = require("discord.js");

class Ban extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      description: "Bannir un utilisateur définitivement.",
      usage: "ban",
      category: "Système",
      permLevel: "Alex"
    });
  }

  async run(message, args) {
    try {
      const bannedUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
      );
      if (!bannedUser) {
        return message.channel.send("L'utilisateur n'existe pas !");
      }
      const banReason = args.join(" ").slice(22);

      const banEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#dc143c")
        .addField("Utilisateur ban", `${bannedUser} (ID: ${bannedUser.id})`)
        .addField("Raison", banReason);

      const banChannel = message.guild.channels.find(
        x => x.name === "bot-logs"
      );

      message.guild.member(bannedUser).ban(banReason);
      banChannel.send(banEmbed);
      message.delete();
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Ban;
