const { Hsm } = require("../../helpers/hsm_connect");
const { hsm } = require("@dinamonetworks/hsm-dinamo");

class Management {
  constructor(pin, shadow, acl, state) {
    this.pin = pin;
    this.shadow = shadow;
    this.acl = acl;
    this.state = state;
  }

  async retrieveShadow() {
    try {
      const hsm = new Hsm(
        process.env.HSM_USER,
        process.env.HSM_PASSWORD,
        process.env.HSM_HOST,
        process.env.HSM_PORT
      );
      const conn = await hsm.connect();

      const shadow = await conn.management.getShadow(this.pin);

      await conn.disconnect();
      return shadow;
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  }

  getState() {
    switch (this.state) {
      case "ephemeralAuth":
        return hsm.enums.NSAUTH_STATE.EPHEMERAL_AUTH;
      case "associado":
        return hsm.enums.NSAUTH_STATE.ASSOCIATED;
      case "autorizado":
        return hsm.enums.NSAUTH_STATE.AUTHORIZED;
      case "reset":
        return hsm.enums.NSAUTH_STATE.RESET;
      case "check":
        return hsm.enums.NSAUTH_STATE.CHECK;
      default:
        return hsm.enums.NSAUTH_STATE.RESET;
    }
  }

  getAcls() {
    const aclMap = {
      nop: hsm.enums.ACL_MASK.NOP,
      objCreate: hsm.enums.ACL_MASK.OBJ_CREATE,
      delObj: hsm.enums.ACL_MASK.OBJ_DEL,
      check: hsm.enums.ACL_MASK.CHECK,
    };

    return this.acl.reduce((aclMask, acl) => {
      const mask = aclMap[acl] || hsm.enums.ACL_MASK.NOP;
      return aclMask === undefined ? mask : aclMask | mask;
    }, undefined);
  }

  async setNsAuth() {
    try {
      const hsm = new Hsm(
        process.env.HSM_USER,
        process.env.HSM_PASSWORD,
        process.env.HSM_HOST,
        process.env.HSM_PORT
      );
      const conn = await hsm.connect();

      const acl = this.getAcls();
      const state = this.getState();

      const result = await conn.management.setNsAuthState(
        acl,
        state,
        this.shadow
      );

      await conn.disconnect();
      return result;
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}

module.exports = { Management };
