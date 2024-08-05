const generateButton = document.getElementById("generate");
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";
const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
const allChars = upperCase + lowerCase + digits + specialChars;
const passwordField = document.querySelector(".password");
const copyClipboard = document.querySelector(".copy-clipboard");
const toaster = document.querySelector(".toaster");
const time = 3000;

const showToaster = (text) => {
  toaster.innerText = text;
  toaster.classList.remove("hide");
  setTimeout(() => {
    toaster.classList.add("hide");
  }, time);
};

generateButton.addEventListener("click", () => {
  const passwordLength = document.querySelector('[name="passwordLength"]');
  if (passwordLength.value === "" || parseInt(passwordLength.value) < 4) {
    showToaster("Password length must be greater than 4");
    return false;
  }
  let password = "";
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];
  for (let i = 4; i < passwordLength.value; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  passwordField.innerText = password;
  passwordLength.value = "";
});

copyClipboard.addEventListener("click", () => {
  const text = passwordField.innerText;
  if (text.trim() === "") {
    showToaster("Create Password First!");
  } else {
    navigator.clipboard.writeText(text);
    showToaster(`Password "${text}" copied to clipboard!`);
  }
});
