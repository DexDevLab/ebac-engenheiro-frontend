jQuery(function ($) {
  // ESTILO DE COR DE BACKGROUND
  let backgroundColor = {
    background: "linear-gradient(115deg, #a87f32 10%, #092E5C 90%)",
  };

  // APLICANDO COR DE FUNDO
  $("body").css(backgroundColor);

  // LISTA DE ITENS DO CARROSSEL DE PRODUTOS
  let destaquesProdutos = [
    {
      img: "./assets/images/item-01.jpg",
      h4: "Clear Jeans by Denim",
      novo: true,
      h6: "R$248,00",
      ahref: "",
    },
    {
      img: "./assets/images/item-02.jpg",
      h4: "Dark Jeans by Denim",
      novo: false,
      h6: "R$248,00",
      ahref: "",
    },
    {
      img: "./assets/images/item-03.jpg",
      h4: "Blue Winter Jacket by Blu",
      novo: false,
      h6: "R$160,00",
      ahref: "",
    },
    {
      img: "./assets/images/item-04.jpg",
      h4: "Prada Blue Mint",
      novo: false,
      h6: "R$1200,00",
      ahref: "",
    },
    {
      img: "./assets/images/item-05.jpg",
      h4: "Prada Pink Dreams",
      novo: false,
      h6: "R$1399,00",
      ahref: "",
    },
    {
      img: "./assets/images/item-06.jpg",
      h4: "Converse AllStar Classic Red",
      novo: false,
      h6: "R$45,00",
      ahref: "",
    },
    {
      img: "./assets/images/item-04.jpg",
      h4: "Louis Vuitton Cyan",
      novo: false,
      h6: "R$2100,00",
      ahref: "",
    },
    {
      img: "./assets/images/item-05.jpg",
      h4: "Louis Vuitton Pink",
      novo: false,
      h6: "R$1800,00",
      ahref: "",
    },
    {
      img: "./assets/images/item-06.jpg",
      h4: "Converse AllStar Power Red",
      novo: false,
      h6: "R$65,00",
      ahref: "",
    },
  ];

  // MONTANDO COMPONENTE DE CARROSSEL
  destaquesProdutos.forEach((prod, idx) => {
    let component =
      `<div class="featured-item"> <img src="${prod.img}" alt="Item ${idx}" />` +
      `<h4>${prod.h4}<span id="product-badge" class="badge bg-primary">Novo</span></h4>` +
      `<h6>${prod.h6}</h6>` +
      `<a href="${prod.ahref}"> Comprar </a> </div>`;
    $("#carousel-contents").append(component);

    let children = $(".featured-item > h4 > span").get();
    if (!prod.novo) {
      $(children[idx]).css({
        color: "transparent",
        backgroundColor: "transparent",
        opacity: "0",
      });
    }
  });

  // INSTANCIANDO CARROSSEL DENTRO DA PÁGINA
  $(".owl-carousel").owlCarousel();

  // ESTILIZANDO BOTÃO DOS ITENS DO CARROSSEL
  $(".featured-item a").addClass("btn btn-outline-primary stretch-link");

  // MODAL DE PRODUTO ESGOTADO
  $(".featured-item a").on("click", function (event) {
    event.preventDefault();
    $("#modal-stock").modal("show");
  });

  // CONTROLE DO FORMULÁRIO DE CADASTRO COM MODAL NA SAÍDA DO SUBMIT
  $("#button0").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    $("#form1").addClass("submit-not-ready");

    $("#form1 input").trigger("input");
    $("#form1 textarea").trigger("input");

    if (!$("#form1").hasClass("submit-not-ready")) {
      $("#modal-contato").modal("toggle");
      $("#modal-formsent-title").text("Contato");
      $("#modal-formsent-message").text(
        "Formulário de contato enviado com sucesso! Em breve lhe responderemos via email!"
      );
      $("#modal-formsent").modal("toggle");
    } else {
      $("#button0").prop("disabled", true);
    }
  });

  // VALIDAÇÃO DINÂMICA DE EMAIL DO FORMULÁRIO DO CADASTRO
  $("#form1 #email").on("mousein input mouseout blur focusout", function (evt) {
    $("input[type='email']:focus").css({
      "border-color": "green",
    });
    $("#button0").prop("disabled", false);
    const emailValido = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const formValue = $("#form1 #email").val();
    if (formValue.toString().match(emailValido)) {
      $("#form1 #email").addClass("was-validated");
      $("#form1 #email").removeClass("is-invalid");
      $("#form1 #email").addClass("is-valid");
      $("#form1").removeClass("submit-not-ready");
      $("#button0").prop("disabled", false);
    } else {
      $("input[type='email']:focus").css({
        "border-color": "red",
      });
      $("#form1 #email").removeClass("was-validated");
      $("#form1 #email").removeClass("is-valid");
      $("#form1 #email").addClass("is-invalid");
      $("#form1").addClass("submit-not-ready");
      $("#button0").prop("disabled", true);
    }
  });

  // VALIDAÇÃO DINÂMICA DE EMAIL DO CAMPO PARA NEWSLETTER
  $("#subscribe #email2").on(
    "mousein input mouseout blur focusout",
    function (evt) {
      const emailValido = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const formValue = $("#subscribe #email2").val();
      if (formValue.toString().match(emailValido)) {
        $("#subscribe #email2").addClass("was-validated");
        $("#subscribe #email2").removeClass("is-invalid");
        $("#subscribe #email2").addClass("is-valid");
        $("#subscribe").removeClass("submit-not-ready");
        $("#button1").prop("disabled", false);
      } else {
        $("#subscribe #email2").removeClass("was-validated");
        $("#subscribe #email2").removeClass("is-valid");
        $("#subscribe #email2").addClass("is-invalid");
        $("#subscribe").addClass("submit-not-ready");
        $("#button1").prop("disabled", true);
      }
    }
  );

  $("#button1").on("click", function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    $("#subscribe #email2").trigger("input");
    if (!$("#subscribe").hasClass("submit-not-ready")) {
      window.alert(
        "Em breve você receberá nossa newsletter com nossos novos produtos!"
      );
      $("#subscribe").trigger("submit");
    } else {
      $("#button1").prop("disabled", true);
    }
  });

  // VALIDAÇÃO DINÂMICA DE INPUTS
  $("#form1 input").on("mousein input", function (evt) {
    $("#button0").prop("disabled", false);
    $("#form1 input")
      .get()
      .forEach((elmt) => {
        if (
          elmt.value == "" &&
          elmt.id !== "complemento" &&
          elmt.id !== "email"
        ) {
          $("#form1").addClass("was-validated");
          $("#form1").addClass("submit-not-ready");
          $("#button0").prop("disabled", true);
        }
      });
  });

  // VALIDAÇÃO DINÂMICA DE TEXTAREA
  $("#form1 textarea").on("mousein input", function (evt) {
    $("#button0").prop("disabled", false);
    $("#form1 textarea")
      .get()
      .forEach((elmt) => {
        if (elmt.value == "") {
          $("#form1").addClass("was-validated");
          $("#form1").addClass("submit-not-ready");
          $("#button0").prop("disabled", true);
        }
      });
  });

  // CONFIRMAÇÃO DO SUBMIT DO MODAL DO FORMULÁRIO DE CADASTRO
  $("#modal-formsent button").on("click", function (event) {
    $("#cep").mask("00000-000");
    $("#form1").trigger("submit");
  });

  // AJUSTE DO COMPORTAMENTO RESPONSIVO DA NAVBAR PARA POSICIONAMENTO EM DISPOSITIVOS MOBILE
  $("#navbarResponsive a").on("click", function (event) {
    let screenWidth = $("body").width();
    if (screenWidth < 992) {
      $("#navbar-collapse-button").trigger("click");
    }
  });
});
