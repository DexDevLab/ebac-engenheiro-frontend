const useZIndex = () => {
  const body = document.querySelector(`body`);
  const navbar = document.querySelector(".navbar");
  const image = document.querySelector("img");
  const switchElements = document.querySelectorAll("[class^='switch']");

  const setToBottom = () => {
    body.style.setProperty("overflow", "hidden");
    body.style.setProperty("z-index", "-1");
    navbar.style.setProperty("z-index", "0");
    image.style.setProperty("z-index", "-1");
    switchElements.forEach((el) => {
      switch (true) {
        case el.classList.contains("overlay"):
          el.style.setProperty("z-index", "1");
          break;
        case el.classList.contains("switch-icon"):
          el.style.setProperty("z-index", "-1");
          break;
        default:
          el.style.setProperty("z-index", "-2");
          break;
      }
    });
  };

  const resetZIndex = () => {
    body.style.setProperty("overflow", "unset");
    body.style.setProperty("z-index", "0");
    navbar.style.setProperty("z-index", "500");
    image.style.setProperty("z-index", "0");
    switchElements.forEach((el) => {
      switch (true) {
        case el.classList.contains("switch-label"):
          el.style.setProperty("z-index", "1");
          break;
        case el.classList.contains("switch-marker"):
          el.style.setProperty("z-index", "2");
          break;
        case el.classList.contains("switch-icon"):
          el.style.setProperty("z-index", "3");
          break;
        default:
          el.style.setProperty("z-index", "unset");
          break;
      }
    });
  };

  return { setToBottom, resetZIndex };
};

export default useZIndex;
