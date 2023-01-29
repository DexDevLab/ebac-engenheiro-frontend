document.getElementById("form1").addEventListener("submit", function (evt) {
  evt.preventDefault();
  evt.stopPropagation();

  let errors = 0;

  const elements = document.getElementById("form1").querySelectorAll("input");
  for (let obj of elements) {
    if (obj.value == "") {
      document.querySelector("#form1").classList.add("was-validated");
      errors++;
    }
  }

  const elements2 = document
    .getElementById("form1")
    .querySelectorAll("textarea");
  for (let obj of elements2) {
    if (obj.value == "") {
      document.querySelector("#form1").classList.add("was-validated");
      errors++;
    }
  }


  if (errors === 0) {
    document.querySelector("#form1").classList.remove("was-validated");
    document.querySelector("#form1").submit();
    window.alert("Enviado com sucesso!");
  } else {
    errors = 0;
  }
});

document.getElementById("form2").addEventListener("submit", function (evt) {
  evt.preventDefault();
  evt.stopPropagation();

  let errors = 0;

  const elements = document.getElementById("form2").querySelectorAll("input");
  for (let obj of elements) {
    if (obj.value == "") {
      document.querySelector("#form2").classList.add("was-validated");
      errors++;
    }
  }

  const elements2 = document
    .getElementById("form2")
    .querySelectorAll("textarea");
  for (let obj of elements2) {
    if (obj.value == "") {
      document.querySelector("#form2").classList.add("was-validated");
      errors++;
    }
  }


  if (errors === 1) {
    document.querySelector("#form2").classList.remove("was-validated");
    document.querySelector("#form2").submit();
    window.alert("Enviado com sucesso!");
    let myModalEl = document.getElementById("modal-cadastro");
    let modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  } else {
    errors = 0;
  }
});

jQuery(document).ready(function () {
  let html = jQuery("#caption-0").html();
  jQuery("#newTextPosition").html(html);

  jQuery("#carouselExampleCaptions").on("slide.bs.carousel", function (evt) {
    let step = jQuery(evt.relatedTarget).index();
    html = jQuery("#caption-" + step).html();
    jQuery("#newTextPosition").html(html);
  });
});
