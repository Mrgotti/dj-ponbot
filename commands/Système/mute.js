const Command = require("../../modules/Command.js");
const ms = require("ms");
const Discord = require("discord.js");

class Mute extends Command {
  constructor(client) {
    super(client, {
      name: "mute",
      description: "Muter un utilisateur avec une durée spécifiée.",
      usage: "mute",
      category: "Système",
      permLevel: "Alex"
    });
  }

  async run(message, args) {
    try {
      const muteUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
      );
      if (!muteUser) {
        return message.channel.send("L'utilisateur n'existe pas !");
      }

      let muteRole = message.guild.roles.find(x => x.name === "muted");
      if (!muteRole) {
        try {
          muteRole = await message.guild.createRole({
            name: "muted",
            color: "#000",
            permissions: []
          });
          message.guild.channels.forEach(async channel => {
            await channel.overwritePermissions(muteRole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        } catch (e) {
          console.log(e.stack);
        }
      }

      const acRole = message.guild.roles.find(x => x.name === "Vérifié");

      const muteTime = args[1];
      if (!muteTime) return message.channel.send("Spécifier une durée.");

      await muteUser.removeRole(acRole.id).then(muteUser.addRole(muteRole.id));
      message.channel.send(
        `<@${muteUser.id}> est muté pour ${ms(ms(muteTime))}`
      );

      setTimeout(() => {
        muteUser.removeRole(muteRole.id).then(muteUser.addRole(acRole.id));
        message.channel.send(`<@${muteUser.id}> n'est plus muté.`);
      }, ms(muteTime));

      const reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#dc143c")
        .addField("Utilisateur muté", `${muteUser} (ID: ${muteUser.id})`)
        .addField("Temps du mute:", muteTime);

      const reportChannel = message.guild.channels.find(
        x => x.name === "bot-logs"
      );

      message.delete();
      reportChannel.send(reportEmbed);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Mute;
