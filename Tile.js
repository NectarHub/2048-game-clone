
export default class Tile {
  #tileElement;
  #x;
  #y;
  #value;

  constructor(tileContainer, value = Math.random() > 0.5 ? 2 : 4) {
    this.#tileElement = document.createElement("div");
    this.#tileElement.classList.add("tile");
    tileContainer.append(this.#tileElement);
    this.value = value;
  }

  get value() {
    return this.#value;
  }

  set value(v) {
    this.#value = v;
    this.#tileElement.textContent = v;
    this.updateColors();
  }

  updateColors() {
    const currentTheme = localStorage.getItem("theme");
     const tilesBgColors = {
       default: {
         2: "#eee3dd",
         4: "#efdfc5",
         8: "#efb27b",
         16: "#f79663",
         32: "#fb7b65",
         64: "#f95b3b",
         128: "#efcd73",
         256: "#efca62",
         512: "#efc652",
         1024: "#efca62",
         2048: "#efc231",
         others: "#393931",
       },
       teal: {
         2: "#ffffff",
         4: "#eef3ef",
         8: "#52c6ff",
         16: "#4996e6",
         32: "#ee92a4",
         64: "#f7617c",
         128: "#fa6f11",
         256: "#bd5a19",
         512: "#ce8e08",
         1024: "#9c6900",
         2048: "#105db5",
         others: "#105db5",
       },
       green: {
         2: "#ffffff",
         4: "#f7ffef",
         8: "#39b66a",
         16: "#c5c64b",
         32: "#d6a134",
         64: "#de7139",
         128: "#ca564c",
         256: "#de86cc",
         512: "#ce51ad",
         1024: "#6365bc",
         2048: "#319183",
         others: "#1a8a7c",
       },
       indigo: {
         2: "#ffffff",
         4: "#f7f7ff",
         8: "#092d8d",
         16: "#c4b649",
         32: "#b5a228",
         64: "#9e891c",
         128: "#cb6186",
         256: "#c64973",
         512: "#de1f62",
         1024: "#7a4dc4",
         2048: "#5a3594",
         others: "#8d188b",
       },
     };

    const tilesTextColors = {
      default: {
        2: "#736d63",
        4: "#726964",
        8: "#fef4e3",
        16: "#f6f9e5",
        32: "#f4f7eb",
        64: "#f1f5e8",
        128: "#f7f8e1",
        256: "#fff4df",
        512: "#f7f6ee",
        1024: "#fefcd6",
        2048: "#f7f7ee",
        others: "#f4f3ee",
      },
      teal: {
        2: "#736e66",
        4: "#756d64",
        8: "#f2f2f5",
        16: "#f3f9fc",
        32: "#f8f8f2",
        64: "#faf7ea",
        128: "#fdf2db",
        256: "#fcf4f3",
        512: "#f8f9dd",
        1024: "#f6f1db",
        2048: "#f9f5f5",
        others: "#f5f6f1",
      },
      green: {
        2: "#746d65",
        4: "#746d65",
        8: "#f0f1e9",
        16: "#f9f4ee",
        32: "#f9f1e7",
        64: "#fdf3fb",
        128: "#faf1e8",
        256: "#f6eee8",
        512: "#f8f8f0",
        1024: "#f8f8f8",
        2048: "#f3f0f0",
        others: "#f3fcfc",
      },
      indigo: {
        2: "#706963",
        4: "#716d63",
        8: "#e3e3e6",
        16: "#f9fae6",
        32: "#fcf4da",
        64: "#fef3e8",
        128: "#fbefef",
        256: "#fdecee",
        512: "#effaf1",
        1024: "#fdf8f8",
        2048: "#f6f9f0",
        others: "#fdeff3",
      },
    };

    this.#tileElement.style.setProperty(
      "background-color",
      tilesBgColors[currentTheme][this.value] ||
        tilesBgColors[currentTheme].others
    );

    this.#tileElement.style.setProperty(
      "color",
      tilesTextColors[currentTheme][this.value] ||
        tilesTextColors[currentTheme].others
    );
  }

  set x(value) {
    this.#x = value;
    this.#tileElement.style.setProperty("--x", value);
  }

  set y(value) {
    this.#y = value;
    this.#tileElement.style.setProperty("--y", value);
  }

  remove() {
    this.#tileElement.remove();
  }

  waitForTransition(animation = false) {
    return new Promise((resolve) => {
      this.#tileElement.addEventListener(
        animation ? "animationend" : "transitionend",
        resolve,
        {
          once: true,
        }
      );
    });
  }
}
