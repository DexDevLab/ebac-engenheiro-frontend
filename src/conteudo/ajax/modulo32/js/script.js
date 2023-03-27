const apiCors = "https://dex-nextjs-proxy-cors.vercel.app/api/cors?url=";
// const apiCors = "http://localhost:3000/api/cors?url=";
const apiGithub = "https://api.github.com/users";
const apiCat = "https://http.cat";
const apiDocs = "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status";
const apiCep = `https://viacep.com.br/ws`;
const apiHttp = `https://httpbin.org/post`;
const textField = document.getElementById("api-github-get");
const textName = document.getElementById("header-name");
const textBio = document.getElementById("header-bio");
const userInput = document.getElementById("username");
const catInput = document.getElementById("input-cat");
let lastCat = "";
const catDesc = document.getElementById("catdesc");
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
const formButton = document.getElementById("form-button");
const notNull = document.getElementsByClassName("not-null");

function getGithub(user) {
  if (user.match(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i)) {
    fetch(`${apiGithub}/${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        const res = response.json();
        if (response.status !== 200) {
          const err = new Error();
          err.status = response.status;
          err.message = res.message;
          throw err;
        } else {
          return res;
        }
      })
      .then((data) => {
        changeGitHubInfo(data);
      })
      .catch((error) => {
        console.log(error);
        switch (error.status) {
          case 404: {
            changeValue(
              textField,
              `<p id='error'>Digite um nome de usuário válido</p>`
            );
            break;
          }
          case 403: {
            changeValue(
              textField,
              `<p id='error'>Você excedeu o limite de requisições. Por favor aguarde uns instantes e tente novamente.</p>`
            );
            break;
          }
          default:
            changeValue(
              textField,
              `<p id='error'>Erro inesperado${
                error.message ? `: ${error.message}` : ""
              }. Tente novamente.</p>`
            );
            break;
        }
      });
  } else {
    if (user.length === 0) {
      resetGitHubInfo("");
    } else {
      resetGitHubInfo("<p id='error'>Digite um nome de usuário válido</p>");
    }
  }
}

function getCat(httpCode) {
  fetch(`${apiCors}${apiCat}/${httpCode}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.status === 200) {
        changeValue(catDesc, `<p id="cat-label">Carregando seu gato...</p>`);
        return response.blob();
      } else {
        const err = new Error();
        err.status = response.status;
        err.message = response.message;
        throw err;
      }
    })
    .then((blob) => {
      const imageObjectURL = URL.createObjectURL(blob);
      // lastCat = httpCode;
      changeValue(catDesc, ``);
      setTimeout(
        changeValue(
          catDesc,
          `<a href='${apiDocs}/${
            httpCode > 0 ? httpCode : ""
          }' target="_blank"><img src='${imageObjectURL}'></img></a>`
        ),
        500
      );
    })
    .catch((error) => {
      // console.log(error);
      switch (error.status) {
        case 404: {
          console.log(error.status);
          // lastCat = httpCode;
          changeValue(
            catDesc,
            `<p id="error-2">Nenhum gato encontrado! Tente novamente...</p>`
          );
          break;
        }
        case 429: {
          console.log(error.status);
          // lastCat = httpCode;
          changeValue(
            catDesc,
            `<p id="error-2">Você excedeu o limite de requisições. Por favor aguarde uns instantes e tente novamente.</p>`
          );
          break;
        }
        case 999: {
          changeValue(
            catDesc,
            `<p id="error-2">Nenhum gato encontrado! Tente novamente...</p>`
          );
          break;
        }
        default:
          changeValue(
            catDesc,
            `<p id='error-2'>Erro inesperado${
              error.message ? `: ${error.message}` : ""
            }. Tente novamente.</p>`
          );
          break;
      }
    });
}

function getCep(cepCode) {
  fetch(`${apiCors}${apiCep}/${cepCode}/json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      const res = response.json();
      if (response.status !== 200) {
        const err = new Error();
        err.status = response.status;
        err.message = res.message;
        throw err;
      } else {
        return res;
      }
    })
    .then((data) => {
      if (data.erro) {
        const err = new Error();
        err.status = 404;
        err.message = data;
        throw err;
      } else {
        changeInput(rua, `${data.logradouro} ${data.complemento}`);
        changeInput(bairro, data.bairro);
        changeInput(cidade, data.localidade);
        changeInput(uf, data.uf);
        changeElement(cep);
        changeValue(mensagem, ``);
        formButton.disabled = false;
      }
    })
    .catch((error) => {
      console.log(error);
      switch (error.status) {
        case 404: {
          changeValue(
            mensagem,
            `<p id='error-2'>Endereço não encontrado. Digite um CEP válido.</p>`
          );
          break;
        }
        default:
          changeValue(
            mensagem,
            `<p id='error-2'>Erro inesperado${
              error.message ? `: ${error.message}` : ""
            }. Tente novamente.</p>`
          );
          break;
      }
    });
}

function submitForm(formData) {
  fetch(`${apiHttp}`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(formData),
    redirect: "follow",
    headers: new Headers({
      "Content-Type": "text/plain",
    }),
  })
    .then((response) => {
      const res = response.json();
      if (response.status !== 200) {
        const err = new Error();
        err.status = response.status;
        err.message = res.message;
        throw err;
      } else {
        return res;
      }
    })
    .then((data) => {
      const rawData = JSON.parse(
        JSON.stringify(data, null, 2).replaceAll('\\"', "'")
      );
      const output = JSON.stringify({ ...rawData }, null, 2).replaceAll(
        '\\"',
        "'"
      );
      changeValue(
        mensagem,
        `<p id='cep-label'>O Método POST funcionou perfeitamente! Seguem os dados da resposta HTTP:<pre><i>output.json<br></i>${output}</pre></p>`
      );
    })
    .catch((error) => {
      console.log(error);
      switch (error.status) {
        case 404: {
          changeValue(
            mensagem,
            `<p id='error-2'>Digite um nome de usuário válido</p>`
          );
          break;
        }
        case 429: {
          changeValue(
            mensagem,
            `<p id='error-2'>Você excedeu o limite de requisições. Por favor aguarde uns instantes e tente novamente.</p>`
          );
          break;
        }
        default:
          changeValue(
            mensagem,
            `<p id='error-2'>Erro inesperado${
              error.message ? `: ${error.message}` : ""
            }. Tente novamente.</p>`
          );
          break;
      }
    });
}

function changeValue(element, value) {
  element.innerHTML = value;
}

function changeInput(inputElmt, val) {
  inputElmt.value = val;
}

function changeElement(elmt) {
  elmt.blur();
}

function maskCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
}

function changeGitHubInfo(data) {
  changeValue(textName, `Olá ${data.name} !`);
  changeValue(textBio, `${data.bio || ""}`);
  changeValue(
    textField,
    `<p> Você possui ${data.public_repos} repositórios públicos e ${data.followers} seguidores</p>`
  );
}

function resetGitHubInfo(textFieldContent) {
  changeValue(textName, `Olá!`);
  changeValue(textBio, ``);
  changeValue(textField, textFieldContent);
}

userInput.addEventListener("mouseenter", function (event) {
  document.getElementById("username").focus();
});
userInput.addEventListener("mouseleave", function (event) {
  document.getElementById("username").blur();
  getGithub(event.target.value);
});

catInput.addEventListener("mouseenter", function (event) {
  document.getElementById("input-cat").focus();
});

catInput.addEventListener("input", function (event) {
  if (/[0-9]{3}/.test(event.target.value)) {
    changeValue(catDesc, `<p id="cat-label">Carregando seu gato...</p>`);
    getCat(event.target.value);
  } else {
    if (event.target.value.toString().length === 0) {
      changeValue(catDesc, ``);
    } else {
      changeValue(
        catDesc,
        `<p id="cat-label">Apenas números de 3 dígitos são aceitos.</p>`
      );
    }
  }
});

cep.addEventListener("input", function (event) {
  let cepValue = event.target.value
    .toString()
    .replaceAll(".", "")
    .replaceAll("-", "");
  if (/[0-9]{8}/.test(cepValue)) {
    changeValue(mensagem, `<p id="cep-label">Aguarde...</p>`);
    getCep(cepValue);
  } else {
    if (cepValue.length === 0) {
      changeValue(mensagem, ``);
    } else {
      changeValue(
        mensagem,
        `<p id="cep-label">CEP inválido. Tente novamente.</p>`
      );
    }
  }
});

cep.addEventListener("focusout", function (event) {
  let cepValue = event.target.value
    .toString()
    .replaceAll(".", "")
    .replaceAll("-", "");
  let newValue = cepValue.replace(/\D/g, "");
  newValue = newValue.replace(/^(\d{5})(\d)/, "$1-$2");
  cep.value = newValue.toString();
});

nome.addEventListener("input", function (event) {
  const nomeTrim = event.target.value.toString().replace(/\s+/g, " ").trim();
  const nomeArray = nomeTrim.split(" ");
  let nomeFormatted = "";
  nomeArray.forEach((item) => {
    nomeFormatted += item.slice(0, 1).toUpperCase() + item.substring(1) + " ";
  });
  const nomeRegex = new RegExp(/([a-zA-Z]{3,100}\D)/);
  if (nomeRegex.test(nomeFormatted)) {
    formButton.disabled = false;
    changeValue(mensagem, ``);
  } else {
    formButton.disabled = true;
    if (event.target.value.length === 0) {
      changeValue(mensagem, ``);
    } else {
      changeValue(mensagem, `<p id="cep-label">Digite um nome válido.</p>`);
    }
  }
});

cpf.addEventListener("input", function (event) {
  let cpfFormatted = event.target.value
    .toString()
    .replaceAll(".", "")
    .replaceAll("-", "");
  const cpfRegex = new RegExp(/([0-9]{11})/);
  if (cpfRegex.test(cpfFormatted)) {
    formButton.disabled = false;
    cpfFormatted = maskCPF(cpfFormatted);
    cpf.value = cpfFormatted.toString();
    changeValue(mensagem, ``);
  } else {
    formButton.disabled = true;
    if (event.target.value.length === 0) {
      changeValue(mensagem, ``);
    } else {
      changeValue(mensagem, `<p id="cep-label">Digite um CPF válido.</p>`);
    }
  }
});

email.addEventListener("input", function (event) {
  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if (emailRegex.test(event.target.value)) {
    formButton.disabled = false;
    changeValue(mensagem, ``);
  } else {
    formButton.disabled = true;
    if (event.target.value.length === 0) {
      changeValue(mensagem, ``);
    } else {
      changeValue(mensagem, `<p id="cep-label">Digite um email válido</p>`);
    }
  }
});

formButton.addEventListener("click", function (event) {
  let formValid = true;
  const data = {
    nome: nome.value,
    cpf: cpf.value,
    email: email.value,
    cpf: cpf.value,
    endereco: `${rua.value}, ${bairro.value}`,
    cidade: cidade.value,
    uf: uf.value,
    cep: cep.value,
  };
  for (let key in data) {
    if (
      data[key].toString().length === 0 ||
      data["endereco"].toString().length < 3
    ) {
      formValid = false;
    }
  }

  if (formValid) {
    submitForm(data);
  } else {
    changeValue(
      mensagem,
      `<p id="cep-label">Foram detectados um ou mais campos inválidos. Revise o formulário e tente novamente.</p>`
    );
    formButton.disabled = true;
  }
});
