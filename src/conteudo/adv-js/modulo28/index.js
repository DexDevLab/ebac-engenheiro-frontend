const Cachorro = require("./classes/cachorro");
const Galinha = require("./classes/galinha");
const Gato = require("./classes/gato");
const Vaca = require("./classes/vaca");

  console.log("");
  console.log("// CACHORRO //");
  const cachorro = new Cachorro("cachorro");

  cachorro.getSom();
  cachorro.getComida();
  cachorro.getColetivo();

  console.log("");
  console.log("// GALINHA //");
  const galinha = new Galinha("galinha");

  galinha.getSom();
  galinha.getComida();
  galinha.getColetivo();

  console.log("");
  console.log("// GATO //");
  const gato = new Gato("gato");

  gato.getSom();
  gato.getComida();
  gato.getColetivo();

  console.log("");
  console.log("// VACA //");
  const vaca = new Vaca("vaca");

  vaca.getSom();
  vaca.getComida();
  vaca.getColetivo();