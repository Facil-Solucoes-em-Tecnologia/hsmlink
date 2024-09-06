class Hsm {
  user = "";
  password = "";
  host = "";
  port = "";
  conn;

  constructor(user, password, host, port) {
    this.user = user;
    this.password = password;
    this.host = host;
    this.port = port;
  }

  async connect(config) {
    return await this.conn.connect({
      host: this.host,
      authUsernamePassword: {
        username: this.user,
        password: this.password,
      },
    });
  }

  async disconnect() {
    await this.conn.disconnect();
  }
}
