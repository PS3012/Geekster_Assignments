const mainText = document.querySelector(".main-text");
const textContainer = document.querySelector(".text-container");

document.addEventListener("keydown", function (e) {
  mainText.innerHTML = `You Pressed <span class="text-red">${e.key}</span>`;
  let keyCode = textContainer.querySelector(".key");
  if (!keyCode) {
    keyCode = document.createElement("div");
    keyCode.classList.add("key");
    textContainer.append(keyCode);
  }
  keyCode.innerText = e.keyCode;
});
