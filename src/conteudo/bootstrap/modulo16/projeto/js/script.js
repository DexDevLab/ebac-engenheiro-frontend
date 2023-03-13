function checkBeforeSubmit() {
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
}
