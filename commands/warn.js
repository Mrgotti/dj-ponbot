const Discord = require("discord.js");
const ms = require("ms");

exports.run = async (bot, msg, args) => {
  const warnedUser = msg.guild.member(
    msg.mentions.users.first() || msg.guild.members.get(args[0])
  );
  if (!warnedUser) return msg.channel.send("Il existe pas.");
  const warnToAdd = 1;
  const reason = args.join(" ").slice(22);
  // Ensure there is a points entry for this user.
  bot.warns.ensure(`${warnedUser.id}`, {
    warnings: 0
  });
  let userWarnings = bot.warns.get(`${warnedUser.id}`, "warnings");
  userWarnings += warnToAdd;

  bot.warns.set(`${warnedUser.id}`, userWarnings, "warnings");

  msg.delete();

  if (bot.warns.get(`${warnedUser.id}`, "warnings") == 1) {
    const warnEmbed = new Discord.RichEmbed()
      .setThumbnail(
        "https://getcodingknowledge.com/wp-content/uploads/2018/12/averti1.png"
      )
      .setColor("#a9ff21")
      .addField("Utilisateur averti", `${warnedUser.user.tag}`)
      .addField("Nombre d'avertissement", "1/5")
      .addField("Raison de l'avertissement", reason)
      .setFooter(msg.author.username, msg.author.avatarURL)
      .setTimestamp();

    const warnChannel = msg.guild.channels.find(x => x.name === "bot-logs");
    warnChannel.send(warnEmbed);
  }

  if (bot.warns.get(`${warnedUser.id}`, "warnings") == 2) {
    const acRole = msg.guild.roles.find(x => x.name === "Vérifié");
    const muteRole = msg.guild.roles.find(x => x.name === "muted");
    const muteTime = "1h";
    await warnedUser
      .removeRole(acRole.id)
      .then(warnedUser.addRole(muteRole.id));
    msg.channel.send(`${warnedUser} est muté pendant ${muteTime}.`);

    setTimeout(function() {
      warnedUser.removeRole(muteRole.id).then(warnedUser.addRole(acRole.id));
      msg.channel.send(`L'utilisateur ${warnedUser} n'est plus muté !`);
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
      .setFooter(msg.author.username, msg.author.avatarURL)
      .setTimestamp();

    const warnChannel = msg.guild.channels.find(x => x.name === "bot-logs");
    warnChannel.send(warnEmbed);
  }

  if (bot.warns.get(`${warnedUser.id}`, "warnings") == 3) {
    const acRole = msg.guild.roles.find(x => x.name === "Vérifié");
    const muteRole = msg.guild.roles.find(x => x.name === "muted");
    const muteTime = "12h";
    await warnedUser
      .removeRole(acRole.id)
      .then(warnedUser.addRole(muteRole.id));
    msg.channel.send(`${warnedUser} est muté pendant ${muteTime}.`);

    setTimeout(function() {
      warnedUser.removeRole(muteRole.id).then(warnedUser.addRole(acRole.id));
      msg.channel.send(`L'utilisateur ${warnedUser} n'est plus muté !`);
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
      .setFooter(msg.author.username, msg.author.avatarURL)
      .setTimestamp();

    const warnChannel = msg.guild.channels.find(x => x.name === "bot-logs");
    warnChannel.send(warnEmbed);
  }

  if (bot.warns.get(`${warnedUser.id}`, "warnings") == 4) {
    msg.guild.member(warnedUser).kick(reason);

    const warnEmbed = new Discord.RichEmbed()
      .setThumbnail(
        "https://getcodingknowledge.com/wp-content/uploads/2018/12/averti4.png"
      )
      .setColor("#ff7d21")
      .addField("Utilisateur averti", `${warnedUser.user.tag}`)
      .addField("Nombre d'avertissement", "4/5 - Kick!", true)
      .addField("Raison de l'avertissement", reason)
      .setFooter(msg.author.username, msg.author.avatarURL)
      .setTimestamp();

    const warnChannel = msg.guild.channels.find(x => x.name === "bot-logs");
    warnChannel.send(warnEmbed);
  }

  if (bot.warns.get(`${warnedUser.id}`, "warnings") == 5) {
    msg.guild.member(warnedUser).ban(reason);

    const warnEmbed = new Discord.RichEmbed()
      .setThumbnail(
        "https://getcodingknowledge.com/wp-content/uploads/2018/12/averti5.png"
      )
      .setColor("#ff0202")
      .addField("Utilisateur averti", `${warnedUser.user.tag}`)
      .addField("Nombre d'avertissement", "5/5 - Ban!", true)
      .addField("Raison de l'avertissement", reason)
      .setFooter(msg.author.username, msg.author.avatarURL)
      .setTimestamp();

    const warnChannel = msg.guild.channels.find(x => x.name === "bot-logs");
    warnChannel.send(warnEmbed);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "warn",
  description: "Alerte.",
  usage: "warn [mention] [raison]"
};
