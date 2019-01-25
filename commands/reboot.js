exports.run = async (client, message) => {
  await message.channel.send("Je redémarre !");
  client.commands.forEach(async cmd => {
    await client.unloadCommand(cmd);
  });
  process.exit(1);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "reboot",
  category: "System",
  description:
    "Shuts down the bot. If running under PM2, bot will restart automatically.",
  usage: "reboot"
};
