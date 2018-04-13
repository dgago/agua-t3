var MySql = require("./MySql");

class Polls extends MySql {
  constructor() {
    super();
    this.table = "polls";
  }
}

module.exports = Polls;
