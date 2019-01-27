module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(error) {
    this.client.logger.log(
      `Une erreur venant de Discord.js vient d'arriver: \n${JSON.stringify(
        error
      )}`,
      "error"
    );
  }
};
