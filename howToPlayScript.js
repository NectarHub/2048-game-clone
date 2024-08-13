let slider = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let circles = document.querySelectorAll(".slider .circles li");

let lengthItems = items.length - 1;
let active = 0;

const closeBtn = document.querySelector(".close-btn input");

circles[active].classList.add("active");

next.addEventListener("click", () => {
  active = active + 1 <= lengthItems ? active + 1 : 0;
  reloadSlider();
});

prev.addEventListener("click", () => {
  active = active - 1 >= 0 ? active - 1 : lengthItems;
  reloadSlider();
});

let refreshInterval = setInterval(() => {
  next.click();
}, 3000);
function reloadSlider() {
  slider.style.left = -items[active].offsetLeft + "px";

  let lastActiveCircle = document.querySelector(".slider .circles li.active");
  lastActiveCircle.classList.remove("active");
  circles[active].classList.add("active");

  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 3000);
}

circles.forEach((li, key) => {
  li.addEventListener("click", () => {
    active = key;
    reloadSlider();
  });
});
window.onresize = function (event) {
  reloadSlider();
};

//handling the close feature

closeBtn.addEventListener("click", () => (window.location.href = "index.html"));
