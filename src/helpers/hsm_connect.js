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
    return await hsm.connect({
      host: this.host,
      authUsernamePassword: {
        username: this.user,
        password: this.password,
      },
    });
  }

  async disconnect(conn) {
    await conn.disconnect();
  }
}
