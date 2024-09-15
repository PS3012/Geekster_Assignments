const generateButton = document.getElementById("generate");
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";
const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
const passwordField = document.querySelector(".password");
const passwordInclusions = document.querySelectorAll(".inclusion-grid div");
const copyClipboard = document.querySelector(".copy-clipboard");
const toaster = document.querySelector(".toaster");
const time = 3000;
const inclusions = ["upper-case", "lower-case", "numbers", "symbols"];

const showToaster = (text) => {
  toaster.innerText = text;
  toaster.classList.remove("hide");
  setTimeout(() => {
    toaster.classList.add("hide");
  }, time);
};

passwordInclusions.forEach((inclusion) =>
  inclusion.addEventListener("click", () => {
    const include = inclusion.dataset.include;
    if (inclusion.classList.contains("active")) {
      inclusion.classList.remove("active");
      const idx = inclusions.findIndex((item) => item === include);
      inclusions.splice(idx, 1);
    } else {
      inclusion.classList.add("active");
      inclusions.push(include);
    }
  })
);

generateButton.addEventListener("click", () => {
  const passwordLength = document.querySelector('[name="passwordLength"]');
  if (
    passwordLength.value === "" ||
    parseInt(passwordLength.value) < 8 ||
    parseInt(passwordLength.value) > 50
  ) {
    showToaster("Password length must be greater than 8 and less than 50");
    return false;
  }
  if (inclusions.length === 0) {
    showToaster("Select atleast one criteria for your password.");
    return false;
  }
  let password = "";
  let count = 0;
  let allChars = "";
  if (inclusions.includes("upper-case")) {
    count++;
    allChars += upperCase;
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
  }
  if (inclusions.includes("lower-case")) {
    count++;
    allChars += lowerCase;
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  }
  if (inclusions.includes("numbers")) {
    count++;
    allChars += digits;
    password += digits[Math.floor(Math.random() * digits.length)];
  }
  if (inclusions.includes("symbols")) {
    count++;
    allChars += specialChars;
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
  }
  for (let i = count; i < passwordLength.value; i++) {
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
