const switcher = document.querySelector(".toggle");
const hider = document.querySelector(".toggle .hider");
const title = document.querySelector(".title");

switcher.addEventListener("click", () => {
  hider.classList.toggle("dark");
  document.body.classList.toggle("dark");
  title.classList.toggle("dark");
});
