import Grid from "./grid.js";
import Tile from "./Tile.js";

const boardElement = document.getElementById("game-board");
const scoreContainer = document.querySelector(".score input");

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

const grid = new Grid(boardElement);

grid.randomEmptyCell().tile = new Tile(boardElement);
grid.randomEmptyCell().tile = new Tile(boardElement);

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

setUpInput();

function setUpInput() {
  window.addEventListener("keydown", handleInput);

  //for the touch screen
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchend", handleTouchEnd);
}

//function to update tile colors
function updateTileColors() {
  const theme = localStorage.getItem("theme") || "default";
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    const value = parseInt(tile.textContent, 10) || 2;
    const bgColor = tilesBgColors[theme][value] || tilesBgColors.others;
    const textColor = tilesTextColors[theme][value] || tilesTextColors.others;

    tile.style.backgroundColor = bgColor;
    tile.style.color = textColor;
  });
}

//for theme switching

const switcher = document.querySelector(".theme-switcher");
const themesUi = document.querySelector(".themes-container");

switcher.addEventListener("click", () => {
  themesUi.classList.toggle("d-none");
});

const themeSwitches = document.querySelectorAll(".board-container input");
let selectedItem;
themeSwitches.forEach((switchElement) => {
  switchElement.addEventListener("change", function () {
    if (this.checked) {
      //only one be checked at a time
      themeSwitches.forEach((otherSwitch) => {
        if (otherSwitch !== this) {
          otherSwitch.checked = false;
        }
      });

      //switching the theme
      selectedItem = this.id;
      document.documentElement.setAttribute("data-theme", selectedItem);
      localStorage.setItem("theme", selectedItem);
      updateTileColors();
    } else {
      document.documentElement.setAttribute("data-theme", "default");
      localStorage.setItem("theme", "default");
      updateTileColors();
    }
  });
});

//apply save theme when loaded
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
  updateTileColors(); // Update colors initially based on saved theme
});

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;

  handleSwipe();
}


function handleSwipe() {
  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;

  // Set a threshold for detecting swipes
  const threshold = 30;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        handleInput({ key: "ArrowRight" });
      } else {
        handleInput({ key: "ArrowLeft" });
      }
    }
  } else {
    if (Math.abs(diffY) > threshold) {
      if (diffY > 0) {
        handleInput({ key: "ArrowDown" });
      } else {
        handleInput({ key: "ArrowUp" });
      }
    }
  }
}

async function handleInput(e) {
  switch (e.key) {
    case "ArrowUp":
      if (!canMoveUp) {
        setUpInput();
        return;
      }
      await moveUp();
      break;
    case "ArrowDown":
      if (!canMoveDown) {
        setUpInput();
        return;
      }
      await moveDown();
      break;
    case "ArrowRight":
      if (!canMoveRight) {
        setUpInput();
        return;
      }
      await moveRight();
      break;
    case "ArrowLeft":
      if (!canMoveLeft) {
        setUpInput();
        return;
      }
      await moveLeft();
      break;
    default:
      setUpInput();
      return;
  }

  grid.cells.forEach((cell) => cell.mergeTiles());
  let currentScore = grid.getscore();
  scoreContainer.value = currentScore;
  const newTile = new Tile(boardElement);
  grid.randomEmptyCell().tile = newTile;

  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
    newTile.waitForTransition(true).then(() => {
      alert("You Lost");
    });
    return;
  }

  setUpInput();
}

function moveUp() {
  return slideTiles(grid.cellByColumn);
}

function moveDown() {
  return slideTiles(grid.cellByColumn.map((column) => [...column].reverse()));
}

function moveRight() {
  return slideTiles(grid.cellByRow.map((row) => [...row].reverse()));
}

function moveLeft() {
  return slideTiles(grid.cellByRow);
}

function slideTiles(cells) {
  return Promise.all(
    cells.flatMap((group) => {
      const promises = [];
      for (let i = 1; i < group.length; i++) {
        const cell = group[i];
        if (cell.tile == null) continue;
        let lastValidCell;
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group[j];
          if (!moveToCell.canAccept(cell.tile)) break;
          lastValidCell = moveToCell;
        }
        if (lastValidCell != null) {
          promises.push(cell.tile.waitForTransition());
          if (lastValidCell.tile != null) {
            lastValidCell.mergeTile = cell.tile;
          } else {
            lastValidCell.tile = cell.tile;
          }
          cell.tile = null;
        }
      }
      return promises;
    })
  );
}

function canMoveUp() {
  return canMove(grid.cellByColumn);
}

function canMoveDown() {
  return canMove(grid.cellByColumn.map((column) => [...column].reverse()));
}

function canMoveLeft() {
  return canMove(grid.cellByRow);
}

function canMoveRight() {
  return canMove(grid.cellByRow.map((row) => [...row].reverse()));
}

function canMove(cells) {
  return cells.some((group) => {
    return group.some((cell, index) => {
      if (index === 0) return false;
      if (cell.tile == null) return false;
      const moveToCell = group[index - 1];
      return moveToCell.canAccept(cell.tile);
    });
  });
}
