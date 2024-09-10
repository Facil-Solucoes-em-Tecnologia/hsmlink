const { hsm } = require("@dinamonetworks/hsm-dinamo");

class Hsm {
  user = "";
  password = "";
  host = "";
  port = "";

  constructor(user, password, host, port) {
    this.user = user;
    this.password = password;
    this.host = host;
    this.port = port;
  }

  async connect() {
    try {
      const conn = await hsm.connect({
        host: this.host,
        authUsernamePassword: {
          username: this.user,
          password: this.password,
        },
      });

      return conn;
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  }

  async disconnect(conn) {
    await conn.disconnect();
  }
}

module.exports = { Hsm };
