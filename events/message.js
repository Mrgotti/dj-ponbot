/* eslint-disable */

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    if (message.author.bot) return;

    // Système de points
    if (message.guild) {
      const key = `${message.guild.id}-${message.author.id}`;
      this.client.points.ensure(`${message.guild.id}-${message.author.id}`, {
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1
      });

      this.client.points.inc(key, "points");

      const curLevel = Math.floor(
        0.1 * Math.sqrt(this.client.points.get(key, "points"))
      );

      if (this.client.points.get(key, "level") < curLevel) {
        message.reply(
          `Tu es monté au niveau **${curLevel}**! Dj-pon te félicite !`
        );
        this.client.points.set(key, curLevel, "level");
      }
    }

    if (
      !message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")
    )
      return;

    // Paramètres du serveur
    const settings = this.client.getSettings(message.guild);
    message.settings = settings;

    // Renvoie le préfixe
    const prefixMention = new RegExp(`^<@!?${this.client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
      return message.reply(`My prefix on this guild is \`${settings.prefix}\``);
    }

    // Ignorer les messages qui ne commencent pas par le préfixe
    if (message.content.indexOf(settings.prefix) !== 0) return;

    const args = message.content
      .slice(settings.prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.guild && !message.member)
      await message.guild.fetchMember(message.author);

    // Niveau de l'utilisateur
    const level = this.client.permlevel(message);

    // Alias + commande
    const cmd =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));
    if (!cmd) return;

    if (cmd && !message.guild && cmd.conf.guildOnly)
      return message.channel.send(
        "Cette commande n'est pas utilisable en message privé."
      );

    if (level < this.client.levelCache[cmd.conf.permLevel]) {
      if (settings.systemNotice === "true") {
        return message.channel
          .send(`Vous n'avez pas la permission pour utiliser cette commande.
Votre niveau de permission est ${level} (${
          this.client.config.permLevels.find(l => l.level === level).name
        })
Cette commande requiert le niveau de permission: ${
          this.client.levelCache[cmd.conf.permLevel]
        } (${cmd.conf.permLevel})`);
      } else {
        return;
      }
    }

    message.author.permLevel = level;

    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }

    // Lancer la commande si autorisation
    this.client.logger.log(
      `${this.client.config.permLevels.find(l => l.level === level).name} ${
        message.author.username
      } (${message.author.id}) ran command ${cmd.help.name}`,
      "cmd"
    );
    cmd.run(message, args, level);
  }
};
