jQuery(async function ($) {
  const outputArr = [];

  class Animal {
    constructor(especie) {
      this.especie = especie;
    }

    getSom() {
      return this.especie + " fala ";
    }

    getComida() {
      return this.especie + " come ";
    }

    getColetivo() {
      return this.especie + " dorme ";
    }
  }

  class Cachorro extends Animal {
    getSom() {
      return `${this.especie} faz 'au au'`;
    }

    getComida() {
      return `${this.especie} come ração`;
    }

    getColetivo() {
      return `O coletivo de ${this.especie} é matilha`;
    }
  }

  class Galinha extends Animal {
    getSom() {
      return `${this.especie} faz 'có có'`;
    }

    getComida() {
      return `${this.especie} come milho`;
    }

    getColetivo() {
      return `O coletivo de ${this.especie} é galinhada`;
    }
  }

  class Gato extends Animal {
    getSom() {
      return `${this.especie} faz 'miau'`;
    }

    getComida() {
      return `${this.especie} come ração`;
    }

    getColetivo() {
      return `O coletivo de ${this.especie} é bando`;
    }
  }

  class Vaca extends Animal {
    getSom() {
      return `${this.especie} faz 'mu'`;
    }

    getComida() {
      return `${this.especie} come grama`;
    }

    getColetivo() {
      return `O coletivo de ${this.especie} é rebanho`;
    }
  }

  outputArr.push("// INÍCIO ! //");

  outputArr.push(" ");
  outputArr.push("// CACHORRO //");

  const cachorro = new Cachorro("cachorro");

  outputArr.push(cachorro.getSom());
  outputArr.push(cachorro.getComida());
  outputArr.push(cachorro.getColetivo());

  outputArr.push(" ");
  outputArr.push("// GALINHA //");

  const galinha = new Galinha("galinha");

  outputArr.push(galinha.getSom());
  outputArr.push(galinha.getComida());
  outputArr.push(galinha.getColetivo());

  outputArr.push(" ");
  outputArr.push("// GATO //");

  const gato = new Gato("gato");

  outputArr.push(gato.getSom());
  outputArr.push(gato.getComida());
  outputArr.push(gato.getColetivo());

  outputArr.push(" ");
  outputArr.push("// VACA //");

  const vaca = new Vaca("vaca");

  outputArr.push(vaca.getSom());
  outputArr.push(vaca.getComida());
  outputArr.push(vaca.getColetivo());

  outputArr.push("// FIM ! //");

  outputArr.forEach(function (item, idx) {
    setTimeout(function () {
        if(idx > 0){
            $("#log").append("<br>");
        }
      $("#log").append(item);
    }, 1000 * (idx + 1));
  });
});
