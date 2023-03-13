const Animal = require("./animal");

class Vaca extends Animal {
  getSom() {
    console.log(`${this.especie} faz 'mu'`);
  }

  getComida() {
    console.log(`${this.especie} come grama`);
  }

  getColetivo() {
    console.log(`O coletivo de ${this.especie} é rebanho`);
  }
}

module.exports = Vaca;
