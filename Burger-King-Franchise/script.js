const foodItems = document.querySelector(".food-items");
const orderID = document.querySelector(".orderID");
const orderButton = document.querySelector("button");
const toaster = document.querySelector(".toaster");
const thankYouBox = document.querySelector(".bottom-block");
const image = document.querySelector("img");
let selectedItems = [];
const loading = false;

const showToaster = (text) => {
  toaster.innerHTML = text;
  toaster.classList.remove("hide");
  setTimeout(() => {
    toaster.classList.add("hide");
  }, 3000);
};

foodItems.addEventListener("click", (e) => {
  const foodItem = e.target.dataset.item;
  const index = selectedItems.findIndex((ele) => ele === foodItem);
  if (index >= 0) {
    selectedItems.splice(index, 1);
    e.target.classList.remove("active");
  } else {
    selectedItems.push(foodItem);
    e.target.classList.add("active");
  }
});

const generateOrderID = () => {
  return Math.floor(Math.random() * 1000000);
};

orderButton.addEventListener("click", async () => {
  if (selectedItems.length > 0) {
    orderButton.innerText = "Just Wait...";
    thankYouBox.style.display = "none";
    orderButton.setAttribute("disabled", true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const id = generateOrderID();
        showToaster(
          `<div>Your order is placed.</div> <div>Order ID: ${id}</div>`
        );
        orderID.innerText = id;
        thankYouBox.style.display = "grid";
        image.setAttribute(
          "src",
          `images/${selectedItems.sort().join("-")}.jpeg`
        );
        orderButton.removeAttribute("disabled");
        orderButton.innerText = "Order Food";
        selectedItems = [];
        foodItems
          .querySelectorAll("div")
          .forEach((ele) => ele.classList.remove("active"));
        resolve(id);
      }, 5000);
    });
  } else {
    showToaster("Add some food items.");
  }
});
