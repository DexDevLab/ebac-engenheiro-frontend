particlesJS.load("particles-js", "src/assets/particles.json", function () {});

jQuery(async function ($) {
  const moduleBanners = await import("../../components/banners.js");

  const banners = moduleBanners.banners();
  let availableTags = [{ id: "", parent: "", label: "" }];

  banners.forEach((item, idx) => {
    let componentNavbarMenuId = item.menu
      .toString()
      .replace(/[^A-Za-z0-9]/g, "");

    availableTags.push({
      id: item.id,
      parent: "",
      label: item.bannerTitle,
    });

    // MONTANDO MENUS DA NAVBAR

    const navbarContent = $("#navbar-content").text();
    if (!navbarContent.includes(item.menu)) {
      let componentNavbarMenu = `
      <li class="nav-item dropdown my-auto">
      <a
      class="nav-link dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      >${item.menu}</a
      ><ul class="dropdown-menu" id="dropdownMenu-${componentNavbarMenuId}">
      </ul>
      </li>
      `;
      $("#navbar-content").append(componentNavbarMenu);
    }

    // MONTANDO OS BOTÕES DE CADA BANNER

    let componentButtons = ``;
    item.bannerButtons.forEach((item2) => {
      availableTags.push({
        id: item.id,
        parent: item.bannerTitle,
        label: item2.buttonName,
      });

      availableTags.push({
        id: item.id,
        parent: item2.buttonName,
        label: item2.keywords,
      });

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

    // MONTANDO OS ITENS DE MENU DA NAVBAR

    let componentNavbarItem = `
      <li class="dropdown-item"><a class="nav-link" href=#${item.id}>${item.bannerTitle}</a></li>
    `;

    $(`#dropdownMenu-${componentNavbarMenuId}`).append(componentNavbarItem);

    // MONTANDO O BANNER

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
  });

  // LIMPANDO TAGS DE ID VAZIA PARA NÃO SE REPETIREM COM OS RESULTADOS
  availableTags = availableTags.filter((item) => {
    if (item.id !== "") {
      return item;
    }
  });

  // CONFIGIRAÇÃO DO AUTOCOMPLETE
  $("#form-search")
    .autocomplete({
      minLength: 1,
      source: availableTags,
      position: {
        my: "left+0 top+9",
        mx: "left+0, right-10",
      },
      focus: function (event, ui) {
        let val = "";
        if (ui.item?.parent.length === 0) {
          val = ui.item?.label;
        } else if (!ui.item?.label.includes("Módulo")) {
          val = ui.item?.parent;
        }
        $("#form-search").val(val);
        return false;
      },
      select: function (event, ui) {
        $([document.documentElement, document.body]).animate(
          {
            scrollTop: $(`#${ui.item.id}`).offset().top,
          },
          50
        );
        return false;
      },
      response: function (event, ui) {
        if (ui.content.length === 0) {
          ui.content.push({
            id: "",
            parent: "",
            value: "",
            label: "Nenhum resultado.",
          });
        }
      },
    })
    .autocomplete("instance")._renderItem = function (ul, item) {
    if (item?.parent.length > 0) {
      if (item?.label.includes("Módulo")) {
        return $("<li>")
          .append(
            "<div class='container-search'>" +
              "<div> " +
              item?.label +
              " </div>" +
              "<div class='container-search-subtitle'> em <b> " +
              item?.parent +
              " </b></div></div>"
          )
          .appendTo(ul);
      } else {
        return $("<li>")
          .append(
            "<div class='container-search'>" +
              "<div> conteúdo de <b>" +
              item?.parent +
              "</b></div></div>"
          )
          .appendTo(ul);
      }
    } else {
      if (item.id.length === 0) {
        return $("<li>")
          .append(
            "<div class='container-search'>" +
              "<div><b>" +
              " Nenhum resultado encontrado." +
              "</b></div></div>"
          )
          .appendTo(ul);
      } else {
        return $("<li>")
          .append(
            "<div class='container-search'>" +
              "<div> seção <b>" +
              item?.label +
              "</b></div></div>"
          )
          .appendTo(ul);
      }
    }
  };
});
