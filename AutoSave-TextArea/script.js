const textarea = document.querySelector("textarea");
const switcher = document.querySelector(".toggle");
const hider = document.querySelector(".toggle .hider");

switcher.addEventListener("click", () => {
  hider.classList.toggle("dark");
  document.body.classList.toggle("dark");
});

const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const saveTextareaInput = () => {
  localStorage.setItem("autosaveText", textarea.value);
};

window.addEventListener("load", () => {
  const text = localStorage.getItem("autosaveText");
  if (text) {
    textarea.value = text;
  }
  textarea.focus();
  textarea.addEventListener("input", debounce(saveTextareaInput, 300));
});
