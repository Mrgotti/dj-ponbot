const Command = require("../../modules/Command.js");
const Discord = require("discord.js");
const ms = require("ms");

class Warn extends Command {
  constructor(client) {
    super(client, {
      name: "warn",
      description: "Commande pour avertir un utilisateur.",
      usage: "warn",
      category: "Système",
      permLevel: "Alex"
    });
  }

  async run(message, args) {
    try {
      const warnedUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
      );
      if (!warnedUser) return message.channel.send("Il existe pas.");
      const warnToAdd = 1;
      const reason = args.join(" ").slice(22);
      // Ensure there is a points entry for this user.
      this.client.warns.ensure(`${warnedUser.id}`, {
        warnings: 0
      });
      let userWarnings = this.client.warns.get(`${warnedUser.id}`, "warnings");
      userWarnings += warnToAdd;

      this.client.warns.set(`${warnedUser.id}`, userWarnings, "warnings");

      message.delete();

      if (this.client.warns.get(`${warnedUser.id}`, "warnings") == 1) {
        message.channel.send(
          `${warnedUser}, premier avertissement (raison: ${reason}).`
        );

        const warnEmbed = new Discord.RichEmbed()
          .setThumbnail(
            "https://getcodingknowledge.com/wp-content/uploads/2018/12/averti1.png"
          )
          .setColor("#a9ff21")
          .addField("Utilisateur averti", `${warnedUser.user.tag}`)
          .addField("Nombre d'avertissement", "1/5")
          .addField("Raison de l'avertissement", reason)
          .setFooter(message.author.username, message.author.avatarURL)
          .setTimestamp();

        const warnChannel = message.guild.channels.find(
          x => x.name === "bot-logs"
        );
        warnChannel.send(warnEmbed);
      }

      if (this.client.warns.get(`${warnedUser.id}`, "warnings") == 2) {
        const acRole = message.guild.roles.find(x => x.name === "Vérifié");
        const muteRole = message.guild.roles.find(x => x.name === "muted");
        const muteTime = "1h";
        await warnedUser
          .removeRole(acRole.id)
          .then(warnedUser.addRole(muteRole.id));
        message.channel.send(
          `${warnedUser} est muté pendant ${muteTime} (raison: ${reason}).`
        );

        setTimeout(function() {
          warnedUser
            .removeRole(muteRole.id)
            .then(warnedUser.addRole(acRole.id));
          message.channel.send(`L'utilisateur ${warnedUser} n'est plus muté !`);
        }, ms(muteTime));

        const warnEmbed = new Discord.RichEmbed()
          .setThumbnail(
            "https://getcodingknowledge.com/wp-content/uploads/2018/12/averti2.png"
          )
          .setColor("#f7ff21")
          .addField("Utilisateur averti", `${warnedUser.user.tag}`)
          .addField("Nombre d'avertissement", "2/5 - Mute!", true)
          .addField("Temps du mute:", muteTime, true)
          .addField("Raison de l'avertissement", reason)
          .setFooter(message.author.username, message.author.avatarURL)
          .setTimestamp();

        const warnChannel = message.guild.channels.find(
          x => x.name === "bot-logs"
        );
        warnChannel.send(warnEmbed);
      }

      if (this.client.warns.get(`${warnedUser.id}`, "warnings") == 3) {
        const acRole = message.guild.roles.find(x => x.name === "Vérifié");
        const muteRole = message.guild.roles.find(x => x.name === "muted");
        const muteTime = "12h";
        await warnedUser
          .removeRole(acRole.id)
          .then(warnedUser.addRole(muteRole.id));
        message.channel.send(
          `${warnedUser} est muté pendant ${muteTime} (raison: ${reason}).`
        );

        setTimeout(function() {
          warnedUser
            .removeRole(muteRole.id)
            .then(warnedUser.addRole(acRole.id));
          message.channel.send(`L'utilisateur ${warnedUser} n'est plus muté !`);
        }, ms(muteTime));

        const warnEmbed = new Discord.RichEmbed()
          .setThumbnail(
            "https://getcodingknowledge.com/wp-content/uploads/2018/12/averti3.png"
          )
          .setColor("#ffc721")
          .addField("Utilisateur averti", `${warnedUser.user.tag}`)
          .addField("Nombre d'avertissement", "3/5 - Mute!", true)
          .addField("Temps du mute:", muteTime, true)
          .addField("Raison de l'avertissement", reason)
          .setFooter(message.author.username, message.author.avatarURL)
          .setTimestamp();

        const warnChannel = message.guild.channels.find(
          x => x.name === "bot-logs"
        );
        warnChannel.send(warnEmbed);
      }

      if (this.client.warns.get(`${warnedUser.id}`, "warnings") == 4) {
        message.guild.member(warnedUser).kick(reason);

        const warnEmbed = new Discord.RichEmbed()
          .setThumbnail(
            "https://getcodingknowledge.com/wp-content/uploads/2018/12/averti4.png"
          )
          .setColor("#ff7d21")
          .addField("Utilisateur averti", `${warnedUser.user.tag}`)
          .addField("Nombre d'avertissement", "4/5 - Kick!", true)
          .addField("Raison de l'avertissement", reason)
          .setFooter(message.author.username, message.author.avatarURL)
          .setTimestamp();

        const warnChannel = message.guild.channels.find(
          x => x.name === "bot-logs"
        );
        warnChannel.send(warnEmbed);
      }

      if (this.client.warns.get(`${warnedUser.id}`, "warnings") == 5) {
        message.guild.member(warnedUser).ban(reason);

        const warnEmbed = new Discord.RichEmbed()
          .setThumbnail(
            "https://getcodingknowledge.com/wp-content/uploads/2018/12/averti5.png"
          )
          .setColor("#ff0202")
          .addField("Utilisateur averti", `${warnedUser.user.tag}`)
          .addField("Nombre d'avertissement", "5/5 - Ban!", true)
          .addField("Raison de l'avertissement", reason)
          .setFooter(message.author.username, message.author.avatarURL)
          .setTimestamp();

        const warnChannel = message.guild.channels.find(
          x => x.name === "bot-logs"
        );
        warnChannel.send(warnEmbed);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Warn;
