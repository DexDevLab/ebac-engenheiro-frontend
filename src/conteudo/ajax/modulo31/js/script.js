const apiGithub = "https://api.github.com/users";
const apiCat = "https://http.cat";
const textField = document.getElementById("api-github-get");
let textName = document.getElementById("header-name");
let textBio = document.getElementById("header-bio");
const userInput = document.getElementById("username");
const catBtn = document.getElementById("btn-cat");
let catDesc = document.getElementById("catdesc");
let catLabel = document.getElementById("cat-label");

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
        textName.innerHTML = `Olá ${data.name} !`;
        textBio.innerHTML = `${data.bio || ""}`;
        textField.innerHTML = `<p> Você possui ${data.public_repos} repositórios públicos e ${data.followers} seguidores</p>`;
      })
      .catch((error) => {
        console.log(error);
        switch (error.status) {
          case 404: {
            textField.innerHTML = `<p id='error'>Digite um nome de usuário válido</p>`;
            break;
          }
          case 403: {
            textField.innerHTML = `<p id='error'>Você excedeu o limite de requisições. Por favor aguarde uns instantes e tente novamente.</p>`;
            break;
          }
          default:
            textDesc.innerHTML = `<p id='error'>Erro inesperado${
              error.message ? `: ${error.message}` : ""
            }. Tente novamente.</p>`;
            break;
        }
      });
  } else {
    if (user.length === 0) {
      textName.innerHTML = `Olá!`;
      textField.innerHTML = ``;
      textBio.innerHTML = ``;
    } else {
      textName.innerHTML = `Olá!`;
      textField.innerHTML = `<p id='error'>Digite um nome de usuário válido</p>`;
      textBio.innerHTML = ``;
    }
  }
}

function getCat() {
  fetch(`https://cataas.com/cat`, {
    method: "GET",
    headers: {
      "Content-Type": "image/jpeg",
    },
  })
    .then((response) => {
      return response.blob();
    })
    .then((data) => {
      const imageObjectURL = URL.createObjectURL(data);
      catDesc.innerHTML = `<img src='${imageObjectURL}'></img><p id="cat-label">Lindo, né?</p>`;
    })
    .catch((error) => {
      console.log(error);
      switch (error.status) {
        default:
          catDesc.innerHTML = `<p id='error'>Erro inesperado${
            error.message ? `: ${error.message}` : ""
          }. Tente novamente.</p>`;
          break;
      }
    });
}

window.onload = function () {
  document.getElementById("username").blur();
  //   getGithub("a");
};

userInput.addEventListener("mouseenter", function (event) {
  document.getElementById("username").focus();
});

catBtn.addEventListener("click", function (event) {
  catLabel.innerHTML = `Carregando seu gato...`;
  getCat();
});

userInput.addEventListener("mouseleave", function (event) {
  document.getElementById("username").blur();
  getGithub(event.target.value);
});
