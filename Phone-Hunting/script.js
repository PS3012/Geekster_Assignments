const productGrid = document.querySelector(".product-grid");
const searchButton = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");
const loaderBox = document.querySelector(".loader-box");
const toaster = document.querySelector(".toaster");
const dialogContainer = document.querySelector(".product-dialog-container");

const fetchData = async (query) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${query}`
  );
  const result = await response.json();
  return result;
};

const fetchSinglePhoneData = async (query) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${query}`
  );
  const result = await response.json();
  return result;
};

const showToaster = (text) => {
  toaster.innerText = text;
  toaster.classList.remove("hide");
  setTimeout(() => {
    toaster.classList.add("hide");
  }, 3000);
};

const renderProducts = (productList) => {
  productList.forEach((ele) => {
    productGrid.innerHTML += `
          <div class="product-card">
               <div class="image">
                    <img src=${ele.image} alt="..." class="w-100" />
               </div>
               <div class="name fs-2 fw-700 mb-1">${ele.brand} ${ele.phone_name}</div>
               <div class="content fw-600 fs-1 mb-2">
                    There are many variations of passages of available, but the majority
                    have suffered
               </div>
               <button data-slug="${ele.slug}">Show Details</button>
          </div>
     `;
  });
  addDetailsEventListener();
};

const addDetailsEventListener = () => {
  const detailsButton = document.querySelectorAll("button[data-slug]");
  detailsButton.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const { data } = await fetchSinglePhoneData(btn.dataset.slug);
      const html = `
          <div class="dialog">
               <div class="close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16"><path fill="#ffffff" d="m8.746 8l3.1-3.1a.527.527 0 1 0-.746-.746L8 7.254l-3.1-3.1a.527.527 0 1 0-.746.746l3.1 3.1l-3.1 3.1a.527.527 0 1 0 .746.746l3.1-3.1l3.1 3.1a.527.527 0 1 0 .746-.746zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16"/></svg>
               </div>
               <div class="image">
                    <img src=${data.image} alt=${data.name} class="w-100" />
               </div>
               <div class="fs-2 fw-700 mb-1 text-white">${data.name}</div>
               <div class="fs-1 fw-600 mb-2">Brand: ${data.brand}</div>
               <div class="fs-500">
                    <div class="mb-half"><span class="text-white fw-700">Storage:</span> ${
                      data.mainFeatures.storage
                    }</div>
                    <div class="mb-half"><span class="text-white fw-700">Display Size:</span> ${
                      data.mainFeatures.displaySize
                    }</div>
                    <div class="mb-half"><span class="text-white fw-700">Chip Set:</span> ${
                      data.mainFeatures.chipSet
                    }</div>
                    <div class="mb-half"><span class="text-white fw-700">Memory:</span> ${
                      data.mainFeatures.memory
                    }</div>
                    <div>
                         <span class="text-white fw-700">Sensors:</span> 
                         ${data.mainFeatures.sensors.join(", ")}
                    </div>
               </div>
          </div>
      `;
      dialogContainer.innerHTML = html;
      dialogContainer.style.display = "flex";
      document.body.style.overflow = "hidden";
      dialogContainer.querySelector(".close").addEventListener("click", () => {
        dialogContainer.style.display = "none";
        document.body.style.overflow = "unset";
        dialogContainer.innerHTML = "";
      });
    });
  });
};

searchButton.addEventListener("click", async () => {
  const query = searchInput.value;

  if (query.trim() === "") {
    showToaster("Enter valid query!");
  } else {
    loaderBox.style.display = "block";
    searchButton.setAttribute("disabled", "disabled");
    productGrid.innerHTML = "";
    const data = await fetchData(query);
    loaderBox.style.display = "none";
    searchButton.removeAttribute("disabled");
    renderProducts(data.data);
  }
});

window.addEventListener("load", async () => {
  loaderBox.style.display = "block";
  const data = await fetchData("13");
  loaderBox.style.display = "none";
  renderProducts(data.data);
});
