const Animal = require("./animal");

class Galinha extends Animal {
  getSom() {
    console.log(`${this.especie} faz 'có có'`);
  }

  getComida() {
    console.log(`${this.especie} come milho`);
  }

  getColetivo() {
    console.log(`O coletivo de ${this.especie} é galinhada`);
  }
}

module.exports = Galinha;
