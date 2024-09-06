export class Ocra {
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

  async ocraGen() {
    try {
    } catch (error) {}
  }
}
