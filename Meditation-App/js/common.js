const toaster = document.querySelector(".toaster");
const hamBtn = document.querySelector("header .hamBtn");
const close = document.querySelector("header .close>div");
const headLinks = document.querySelector("header .links");
const preloaderContainer = document.querySelector(".preloader-container");
const loginBtn = document.querySelector("header .loginBtn");
const logOutBtn = document.querySelector("header .logOutBtn");

const showToaster = (text) => {
  toaster.innerText = text;
  toaster.classList.remove("hide");
  setTimeout(() => {
    toaster.classList.add("hide");
  }, 3000);
};

const handleUserLogOut = () => {
  const medUsers = JSON.parse(localStorage.getItem("medUsers")) || [];
  const idx = medUsers.findIndex((user) => user.isLogin);
  medUsers[idx].isLogin = false;
  loginBtn.classList.remove("d-none");
  logOutBtn.classList.add("d-none");
  localStorage.setItem("medUsers", JSON.stringify(medUsers));
  showToaster("Have a peaceful day.");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
};

const checkLoginUser = () => {
  const medUsers = JSON.parse(localStorage.getItem("medUsers")) || [];
  const idx = medUsers.findIndex((user) => user.isLogin);
  if (idx >= 0 && loginBtn && logOutBtn) {
    loginBtn.classList.add("d-none");
    logOutBtn.classList.remove("d-none");
    logOutBtn.innerText = medUsers[idx].firstName;
    logOutBtn.addEventListener("click", handleUserLogOut);
  }
};

window.addEventListener("load", () => {
  if (hamBtn) {
    hamBtn.addEventListener("click", () => {
      headLinks.classList.add("active");
    });
  }
  if (close) {
    close.addEventListener("click", () => {
      headLinks.classList.remove("active");
    });
  }
  preloaderContainer.classList.add("d-none");
  checkLoginUser();
});
