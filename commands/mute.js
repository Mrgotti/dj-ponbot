const ms = require("ms"); // npm i ms
const Discord = require("discord.js");

exports.run = async (bot, msg, args) => {
  const muteUser = msg.guild.member(
    msg.mentions.users.first() || msg.guild.members.get(args[0])
  );
  if (!muteUser) {
    return msg.channel.send("L'utilisateur n'existe pas !");
  }

  let muteRole = msg.guild.roles.find(x => x.name === "muted");
  if (!muteRole) {
    try {
      muteRole = await msg.guild.createRole({
        name: "muted",
        color: "#000",
        permissions: []
      });
      msg.guild.channels.forEach(async channel => {
        await channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }

  const acRole = msg.guild.roles.find(x => x.name === "Vérifié");

  const muteTime = args[1];
  if (!muteTime) return msg.channel.send("Spécifier une durée.");

  await muteUser.removeRole(acRole.id).then(muteUser.addRole(muteRole.id));
  msg.channel.send(`<@${muteUser.id}> est muté pour ${ms(ms(muteTime))}`);

  setTimeout(() => {
    muteUser.removeRole(muteRole.id).then(muteUser.addRole(acRole.id));
    msg.channel.send(`<@${muteUser.id}> n'est plus muté.`);
  }, ms(muteTime));

  const reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#dc143c")
    .addField("Utilisateur muté", `${muteUser} (ID: ${muteUser.id})`)
    .addField("Temps du mute:", muteTime);

  const reportChannel = msg.guild.channels.find(x => x.name === "bot-logs");

  msg.delete();
  reportChannel.send(reportEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "mute",
  description: "Muter une personne.",
  usage: "mute <mention> <temps>"
};
