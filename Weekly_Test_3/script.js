const count = 3;
const products = Array.from({ length: count }).map((product, index) => {
  return {
    name: `Product ${index + 1}`,
    price: (index + 1) * 100,
    quantity: 0,
  };
});

const updateCartTotal = () => {
  const totalPrice = document.querySelector(".total-price");
  let total = 0;
  products.forEach((product) => {
    if (product.quantity > 0) {
      total += product.quantity * product.price;
    }
  });
  totalPrice.innerHTML = `Rs. ${total}`;
};

const addProductActions = () => {
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((product, index) => {
    product
      .querySelector("[data-action='increase']")
      .addEventListener("click", () => {
        products[index].quantity = parseInt(products[index].quantity) + 1;
        updateProductList();
      });
    product
      .querySelector("[data-action='decrease']")
      .addEventListener("click", () => {
        products[index].quantity = Math.max(
          0,
          parseInt(products[index].quantity) - 1
        );
        updateProductList();
      });
  });
};

const updateCartList = () => {
  const cartList = document.getElementById("cart-list");
  let html = "";
  products.forEach((product, index) => {
    if (product.quantity > 0) {
      let productHtml = `
          <div class="cart-card ${index !== products.length - 1 ? "mb-1" : ""}">
               <div class="name fw-700">${product.name}</div>
               <div class="price fw-600">${product.quantity} X ${
        product.price
      }</div>
          </div>
     `;
      html += productHtml;
    }
  });
  if (html === "") {
    cartList.innerHTML =
      "<div class='blank fw-600'>You have not added anything to cart</div>";
  } else {
    cartList.innerHTML = html;
  }
};

const updateProductList = () => {
  const productList = document.getElementById("product-list");
  let html = "";
  products.forEach((product, index) => {
    let productHtml = `
          <div class="product-card ${
            index !== products.length - 1 ? "mb-1" : ""
          }">
            <div class="name fw-700">${product.name}</div>
            <div class="price fw-600">Rs. ${product.price}</div>
            <div class="quantity text-center">
              <button data-action="increase">+</button>
              <input
                type="text"
                name="quantity"
                data-product="1"
                readonly
                value=${product.quantity}
                class="w-100 text-center"
              />
              <button data-action="decrease">-</button>
            </div>
          </div>
          `;
    html += productHtml;
  });
  productList.innerHTML = html;
  addProductActions();
  updateCartTotal();
  updateCartList();
};

window.addEventListener("load", updateProductList());
