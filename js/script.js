jQuery(async function ($) {
  const moduleBanners = await import("../components/banners.js");
  const banners = moduleBanners.banners();

  banners.forEach((item, idx) => {
    let componentButtons = ``;

    item.bannerButtons.forEach((item2) => {
      componentButtons =
        componentButtons +
        `
    <a type="button" class="btn btn-outline-secondary" id="button1"
    href=${item2.buttonUrl}
    target="_blank"
    ${item2.download}
  >
  ${item2.buttonName}
  </a>`;
    });

    let componentNavbar = `
    <li class="nav-item">
    <a class="nav-link" href=#${item.id}>${item.bannerTitle}</a>
    </li>
    `;

    let componentModulos = `
    <div class="modulo-wrapper" id=${item.id}>
    <div
    class="d-flex flex-lg-row flex-column flex-md-column flex-sm-column"
    id="modulo-container"
  >
    <span
      class="shadow-lg p-4 w-100 bg-body-secondary rounded"
    >
      <div
        class="d-flex flex-column-reverse h-100 flex-lg-row flex-md-column-reverse flex-sm-column-reverse justify-content-between"
        id="modulo-parent"
      >
        <div
          class="d-flex flex-column justify-content-around align-items-center gap-5"
          id="modulo-content"
        >
          <div id="modulo-content-title-frame" class="d-flex flex-column justify-content-between align-content-center">
            <h2>${item.bannerTitle}</h2>
            <h5>
             ${item.bannerDesc}
            </h5>
          </div>
          <div class="d-flex h-100 justify-content-center align-content-center">
          <div
            class="grid-buttons"
          >
          ${componentButtons}
          </div>
          </div>
        </div>
        <div id="modulo-img-div">
        <img src='${item.bannerImg}' ></img>
        </div>
      </div>
    </span>
  </div>
  </div>`;
    $("#section-modulo-container").append(componentModulos);
    $("#navbar-content").append(componentNavbar);
  });
});
