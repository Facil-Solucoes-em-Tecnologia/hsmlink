const { Hsm } = require("../../helpers/hsm_connect");

class Ocra {
  constructor(
    key,
    question,
    suite,
    len,
    c = null,
    ph = null,
    s = null,
    ts = null
  ) {
    this.key = key;
    this.question = question;
    this.suite = suite;
    this.len = len;
    this.c = c;
    this.ph = ph;
    this.s = s;
    this.ts = ts;
  }

  stringToHex(text) {
    let hexString = "";
    for (let i = 0; i < text.length; i++) {
      let hex = text.charCodeAt(i).toString(16);
      hexString += hex.padStart(2, "0");
    }
    return hexString;
  }

  toBigInt(value) {
    return BigInt(value);
  }

  async ocraGen() {
    try {
      const hsm = new Hsm(
        process.env.HSM_USER,
        process.env.HSM_PASSWORD,
        process.env.HSM_HOST,
        process.env.HSM_PORT
      );
      const conn = await hsm.connect();

      const q = this.stringToHex(this.question);

      if (this.c) {
        this.c = this.toBigInt(this.c);
      }

      if (this.ts) {
        this.ts = this.toBigInt(this.ts);
      }

      const otp = await conn.ocra.ocraGen(
        this.key,
        q,
        this.suite,
        this.len,
        this.c,
        this.ph,
        this.s,
        this.ts
      );

      return otp;
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  }
}

module.exports = { Ocra };
