exports.run = (bot, msg) => {
  const question = msg.content.split(" ");
  question.shift();
  msg.channel.send("http://www.lmgtfy.com/?q=" + question.join("+"));
  msg.delete();
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "go",
  description: "Trouver quelque chose sur Google pour quelqu'un (lmgtfy).",
  usage: "go [question]"
};
