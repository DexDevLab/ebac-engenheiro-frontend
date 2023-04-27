console.log("Script");

// FUNÇÃO GERADORA DE ALFABETO
function generateAlphabet(capital = false) {
  return [...Array(26)].map((_, i) =>
    String.fromCharCode(i + (capital ? 65 : 97))
  );
}

// DECLARAÇÃO DE VARIÁVEIS

let expressions = [
  "Hello World",
  ["H", "e", "l", "l", "o", "W", "o", "r", "l", "d"],
  [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
  [
    {
      word: "Hello",
    },
    {
      word: "World",
    },
  ],
  [
    generateAlphabet(true)[7],
    generateAlphabet()[4],
    generateAlphabet()[11],
    generateAlphabet()[11],
    generateAlphabet()[14],
    generateAlphabet(true)[22],
    generateAlphabet()[14],
    generateAlphabet()[17],
    generateAlphabet()[11],
    generateAlphabet()[3],
  ],
];

// CRIAÇÃO DAS DEMAIS EXPRESSÕES

const expression1 = expressions[0];
expressions.push(expression1);

let expression2 = "";
Array.from(expressions[1]).forEach((letter, index) => {
  expression2 = expression2.concat(letter);
  if (index === 4) {
    expression2 = expression2.concat(" ");
  }
});

expressions.push(expression2);

let expression3 = "".concat(
  expressions[2][7].toUpperCase(),
  expressions[2][4],
  expressions[2][11],
  expressions[2][11],
  expressions[2][14],
  " ",
  expressions[2][22].toUpperCase(),
  expressions[2][14],
  expressions[2][17],
  expressions[2][11],
  expressions[2][3]
);

expressions.push(expression3);

const expression4 = expressions[3][0].word + " " + expressions[3][1].word;

expressions.push(expression4);

const expression5 =
  expressions[4].toString().substring(0, 9).replaceAll(",", "") +
  " " +
  expressions[4].toString().substring(10, 20).replaceAll(",", "");

expressions.push(expression5);

// 10 FORMAS DE CONSTITUIR A MENSAGEM
console.log("Expressions: " + JSON.stringify(expressions));

// ATRIBUINDO O VALOR AOS ELEMENTOS

// MENSAGEM 1
//const message1 = window.alert(expressions[0]);
// MENSAGEM 2
const message2 = (document.getElementById("message2").innerHTML = expression1);
// MENSAGEM 3
const message3 = (document.getElementById("message3").innerHTML =
  expressions[5]);
// MENSAGEM 4
const message4 = (document.getElementById("message4").innerHTML =
  expressions[6]);
// MENSAGEM 5
const message5 = (document.getElementById("message5").innerHTML =
  expressions[7]);
// MENSAGEM 6
const message6 = (document.getElementById("message6").innerHTML =
  expressions[8]);
// MENSAGEM 7
const message7 = (document.getElementById("message7").innerHTML =
  expressions[9]);
// MENSAGEM 8
const message8 = (document.getElementById("message8").innerHTML = expression2);
// MENSAGEM 9
const message9 = (document.getElementById("message9").innerHTML = expression3);
// MENSAGEM 10
const message10 = (document.getElementById("message10").innerHTML =
  expression4);
