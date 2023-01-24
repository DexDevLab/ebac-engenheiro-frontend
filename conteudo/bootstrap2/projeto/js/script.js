document.getElementById("form1").addEventListener("submit", function (evt) {
  evt.preventDefault();
  evt.stopPropagation();
  const elements = document.querySelectorAll("input");
  for (let obj of elements) {
    if (obj.value == "") {
      document.querySelector("#form1").classList.add("was-validated");
    }
  }

  const elements2 = document.querySelectorAll("textarea");
  for (let obj of elements2) {
    if (obj.value == "") {
      document.querySelector("#form1").classList.add("was-validated");
    }
  }
});

document.getElementById("form2").addEventListener("submit", function (evt) {
  evt.preventDefault();
  evt.stopPropagation();
  const elements = document.querySelectorAll("input");
  for (let obj of elements) {
    if (obj.value == "") {
      document.querySelector("#form2").classList.add("was-validated");
    }
  }

  const elements2 = document.querySelectorAll("textarea");
  for (let obj of elements2) {
    if (obj.value == "") {
      document.querySelector("#form2").classList.add("was-validated");
    }
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
