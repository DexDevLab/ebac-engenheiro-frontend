import img from "./pexels-markus-spiske-1089438.jpg";
import "./styles.scss";

function rootStyle(){
    const elmRoot = document.getElementById('root');
    elmRoot.classList.add("container");
}

function titleComponent() {
  const elm1 = document.createElement("h1");
  elm1.innerHTML = "Hello World";
  elm1.classList.add("title");
  return elm1;
}

function imageComponent() {
  const elmImg = new Image(1200, 800);
  elmImg.src = img;
  return elmImg;
}

rootStyle();
document.body.appendChild(titleComponent());
document.body.appendChild(imageComponent());
