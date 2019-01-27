// Base pour toutes les commandes

class Command {
  constructor(
    client,
    {
      name = null,
      description = "No description provided.",
      category = "Utilisateur",
      usage = "No usage provided.",
      enabled = true,
      guildOnly = false,
      aliases = new Array(),
      permLevel = "Utilisateur"
    }
  ) {
    this.client = client;
    this.conf = { enabled, guildOnly, aliases, permLevel };
    this.help = { name, description, category, usage };
  }
}
module.exports = Command;
