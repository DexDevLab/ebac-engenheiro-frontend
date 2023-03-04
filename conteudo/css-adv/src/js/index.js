import { default as imgProduto1 } from "../assets/product (1).jpg";
import { default as imgProduto2 } from "../assets/product (2).jpg";
import { default as imgProduto3 } from "../assets/product (3).jpg";
import { default as imgProduto4 } from "../assets/product (4).jpg";
import { default as imgProduto5 } from "../assets/product (5).jpg";
import { default as imgProduto6 } from "../assets/product (6).jpg";

import "../scss/styles.scss";

const elemRoot = document.getElementById("root");
elemRoot.classList.add("container");

const elemImgProduto1 = new Image();
elemImgProduto1.src = imgProduto1;

const elemImgProduto2 = new Image();
elemImgProduto2.src = imgProduto2;

const elemImgProduto3 = new Image();
elemImgProduto3.src = imgProduto3;

const elemImgProduto4 = new Image();
elemImgProduto4.src = imgProduto4;

const elemImgProduto5 = new Image();
elemImgProduto5.src = imgProduto5;

const elemImgProduto6 = new Image();
elemImgProduto6.src = imgProduto6;

document.querySelector("#produto1").appendChild(elemImgProduto1);
document.querySelector("#produto2").appendChild(elemImgProduto2);
document.querySelector("#produto3").appendChild(elemImgProduto3);
document.querySelector("#produto4").appendChild(elemImgProduto4);
document.querySelector("#produto5").appendChild(elemImgProduto5);
document.querySelector("#produto6").appendChild(elemImgProduto6);
