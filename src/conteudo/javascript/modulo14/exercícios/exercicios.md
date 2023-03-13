# Módulo 14 - Exercícios

Preencha os resultados das operações e o tipo de dado

Exemplos
8 + 6 = 14 (number)
“8” + “6” = “86” (string)
“8.6” + 4 = “8.64” (string)
“8” * 4 = 32 (number)
“8” - 4 = 4 (number)
“8” / 3 = 2.6666666666666665 (float)
5 + true = 6 (number)
“teste” + true = “testetrue” (string)
“8” == 8 = true (boolean)
“8” == 4 = false (boolean)
8 === “8” = false (boolean)
8 !== “8” = true (boolean)
8 < 4 = false (boolean)
8 > 4 = true (boolean)

## 1. Resolva as operações

- 10 + 15 = 25 (number)
- “10” + 2 = '102' (string)
- “10” * 2 = 20 (number)
- “10” / 3 = 3.3333333333333335 (float)
- “10” % 3 = 1 (number)
- 10 + true = 11 (number)
- 10 == ”10” = true (boolean)
- 10 === “10” = false (boolean)
- 10 < 11 = true (boolean)
- 10 > 12 = false (boolean)
- 10 <= 10.1 = true (boolean)
- 10 > 9.99 = true (boolean)
- 10 != “dez” = true (boolean)
- 10 + true = 11 (number)
- “dez” + true = 'deztrue' (string)
- 10 + false = 10 (number)
- 10 * false = 0 (number)
- true + true = 2 (number)
- 10++ = 11 (number)
- 10-- = 9 (number)
- 1 & 1 = 1 (number)
- 1 & 0 = 0 (number)
- 0 & 0 = 0 (number)
- 1 & 0 = 0 (number)
- 0 / 1 = 0 (number)
- 5 + 5 == 10 = true (boolean)
- “5” + ”5” == 10 = false (boolean)
- “5” * 2 > 9 = true (boolean)
- (10 + 10) * 2 = 40 (number)
- 10 + 10 * 2 = 30 (number)

## 2. Responda as perguntas de acordo com as variáveis

var branco = “preto”;
var preto = “cinza”;
var cinza = “branco”;
var carro = “preto”;
var valor = 30000;
var prestacao = 750;

a) branco == “branco”
R: false

b) branco == cinza
R: false

c) carro === branco
R: true

d) var cavalo = carro == “preto” ? “cinza” : “marron”;
R: 'cinza'

e) Quantas prestações são necessárias para pagar o valor do carro com uma entrada
de 3.000? Demonstre a operação.
R:

```javascript

let valor = 30000;
let prestacao = 750;
let entrada = 3000;

let parcelas = ((valor - entrada) / prestacao);

//parcelas = 36

```

f) Somando as variáveis de cores é formada uma string de quantos caracteres?
R:

```javascript

let branco = 'preto';
let preto = 'cinza';
let cinza = 'branco';

let length = (branco + preto + cinza).toString().length;

//length = 16

```
