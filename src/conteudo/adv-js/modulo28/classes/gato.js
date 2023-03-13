const Animal = require("./animal");

class Gato extends Animal {
  getSom() {
    console.log(`${this.especie} faz 'miau'`);
  }

  getComida() {
    console.log(`${this.especie} come ração`);
  }

  getColetivo() {
    console.log(`O coletivo de ${this.especie} é bando`);
  }
}

module.exports = Gato;
