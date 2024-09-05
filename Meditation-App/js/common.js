const toaster = document.querySelector(".toaster");
const hamBtn = document.querySelector("header .hamBtn");
const close = document.querySelector("header .close>div");
const headLinks = document.querySelector("header .links");

const showToaster = (text) => {
  toaster.innerText = text;
  toaster.classList.remove("hide");
  setTimeout(() => {
    toaster.classList.add("hide");
  }, 3000);
};

const checkLoginUser = () => {
  const medUsers = JSON.parse(localStorage.getItem("medUsers")) || [];
  const idx = medUsers.findIndex((user) => user.isLogin);
  if (idx >= 0) {
  }
};

window.addEventListener("load", () => {
  hamBtn.addEventListener("click", () => {
    headLinks.classList.add("active");
  });
  close.addEventListener("click", () => {
    headLinks.classList.remove("active");
  });
});
