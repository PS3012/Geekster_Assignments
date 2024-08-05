const sendButton = document.getElementById("send-review");
const items = document.querySelectorAll(".item");
const userFeedback = document.querySelector(".user-feedback");
const feedbackResponse = document.querySelector(".feedback-response");
const response = document.querySelector(".response");
const toaster = document.querySelector(".toaster");
let selected = "";

const showToaster = (text) => {
  toaster.innerText = text;
  toaster.classList.remove("hide");
  setTimeout(() => {
    toaster.classList.add("hide");
  }, 3000);
};

window.addEventListener("load", () => {
  items.forEach((item) => {
    item.addEventListener("click", function (e) {
      selected = item.dataset.rating;
      items.forEach((item) => {
        if (item.dataset.rating === selected) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    });
  });
});

sendButton.addEventListener("click", () => {
  if (selected === "") {
    showToaster("Please select rating first!");
    return false;
  }
  response.innerText = selected;
  userFeedback.classList.add("none");
  feedbackResponse.classList.remove("none");
});
