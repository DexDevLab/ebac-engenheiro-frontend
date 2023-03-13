const Animal = require("./animal");

class Cachorro extends Animal {
  getSom() {
    console.log(`${this.especie} faz 'au au'`);
  }

  getComida() {
    console.log(`${this.especie} come ração`);
  }

  getColetivo() {
    console.log(`O coletivo de ${this.especie} é matilha`);
  }
}

module.exports = Cachorro;
