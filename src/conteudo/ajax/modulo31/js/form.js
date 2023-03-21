const form = document.querySelector("#form");
const nome = document.getElementById("nome");
const cpf = document.getElementById("cpf");
const email = document.getElementById("email");
const cep = document.getElementById("cep");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const uf = document.getElementById("uf");
const rua = document.getElementById("rua");
const mensagem = document.querySelector("#mensagem");
const notNull = document.getElementsByClassName("not-null");

function isEmpty(elem) {
  return elem.value.length < 1
    ? `O campo <strong>${elem.name}</strong> não pode ser vazio.`
    : "";
}

function validaEmail(elem) {
  return elem.value.match(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? ""
    : `Digite um <strong>e-mail</strong> válido`;
}

function validaCEP(elem) {
  if (!elem.value.match(/^[0-9]{8}/)) return `Digite um CEP válido.`;
  else return "";
}

// function updateAdress(data) {
//   if (!("erro" in data)) {
//     rua.value = data.logradouro;
//     bairro.value = data.bairro;
//     cidade.value = data.localidade;
//     uf.value = data.uf;
//     mensagem.innerHTML = "";
//     return data;
//   } else {
//     mensagem.innerHTML = `CEP não encontrado`;
//   }
// }

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let msg = new Array();
  let dataArr = new Array();
  let markup = "";

  Array.from(notNull).forEach((field) => {
    let fieldState = isEmpty(field);
    if (fieldState) {
      mensagem.innerHTML = fieldState;
    } else {
      msg = {
        ...msg,
        [field.getAttribute("name")]: field.value,
      };
    }
  });

  const isEmail = validaEmail(email);
  if (isEmail) {
    mensagem.innerHTML = isEmail;
  } else {
    msg = {
      ...msg,
      [email.getAttribute("name")]: email.value,
    };
  }

  const isCEP = validaCEP(cep);
  if (isCEP.length > 0) {
    mensagem.innerHTML = isCEP;
  } else {
    // const script = document.createElement("script");
    // script.src =
    //   "https://viacep.com.br/ws/" + cep.value + "/json?callback=updateAdress";
    // document.body.appendChild(script);
    fetch(`https://viacep.com.br/ws/${cep.value}/json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!("erro" in data)) {
          rua.value = data.logradouro;
          bairro.value = data.bairro;
          cidade.value = data.localidade;
          uf.value = data.uf;
          mensagem.innerHTML = "";
          Object.keys(data).forEach((item, idx) => {
            msg = {
              ...msg,
              [item]: data[item],
            };
          });
        } else {
          mensagem.innerHTML = `CEP não encontrado`;
        }
      });
  }

  //   Array.from(msg).forEach((item) => {
  //     markup += `<p>${item}</p>`;
  //   });

  //   mensagem.innerHTML = markup;

  /*     var request = new Request('https://httpbin.org/post', {
    method: 'POST', 
    mode: 'cors',
    data: 'The sky is green',
    redirect: 'follow',
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
}); */

  // if(msg.length == 0)  form.submit();
});
