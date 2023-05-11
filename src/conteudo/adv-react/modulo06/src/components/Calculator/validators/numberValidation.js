// SANITIZA O NÚMER0 PARA SER PROCESSADO ADEQUADAMENTE
function numberValidation(num) {
  if (
    num.toString().length === 0 ||
    (num.toString().includes("0") && num.toString().length === 1) ||
    (num.toString().includes(".") && num.toString().length === 1)
  ) {
    return 0;
  }
  if (num.toString().includes(".")) {
    return parseFloat(num - 0);
  } else {
    return parseInt(num - 0);
  }
}

export default numberValidation;
