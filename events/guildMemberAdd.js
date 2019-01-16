module.exports = (bot, member) => {
  const channel = member.guild.channels.find(ch => ch.name === "vérification");
  channel
    .send(
      `Bienvenue sur notre serveur, ${member}. Je te conseille de bien lire la charte du serveur avant de continuer ton aventure sur notre commuanuté. Une fois que tu auras tapé la commande (à trouver dans la charte ci-dessus), tu pourras accéder au reste du Discord. Si tu souhaites simplement nous contacter, tu peux envoyer un message au bot 'ModMail', notre équipe te répondra le plus rapidement possible.`
    )
    .then(msg => msg.delete(30000));
};
