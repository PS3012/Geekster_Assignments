const input = document.querySelector("input");
const searchButton = document.querySelector(".searchButton");
const loadMore = document.querySelector(".loadMore");
const toaster = document.querySelector(".toaster");
const message = document.querySelector(".message");
const imageGrid = document.querySelector(".image-grid");
let page = 1;

const showToaster = (text) => {
  toaster.innerText = text;
  toaster.classList.remove("hide");
  setTimeout(() => {
    toaster.classList.add("hide");
  }, 3000);
};

const updateMessage = (action, text = "") => {
  if (action === "show") {
    message.innerHTML = text;
    message.style.display = "block";
  } else if (action === "hide") {
    message.style.display = "none";
  }
};

const fetchImages = async (page, query) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=12&client_id=RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw`
  );
  const result = await response.json();
  return result;
};

const formatText = (text) => {
  text = text.split(/\s+/);
  text = text.map((ele) => ele[0].toUpperCase() + ele.slice(1));
  return text.join(" ");
};

const renderImages = (images) => {
  images.forEach((image) => {
    let item = `
    <div class="image-item">
      <div class="image">
        <img src="${image.urls.full}" alt="${
      image.alt_description
    }" class="w-100" />
      </div>
      <div class="text fw-600">
        ${formatText(image.alt_description)}
      </div>
    </div>
    `;
    imageGrid.innerHTML += item;
  });
};

const updateLoadMore = (total_pages, query) => {
  if (page <= total_pages) {
    loadMore.style.display = "block";
    loadMore.addEventListener("click", async () => {
      const moreImages = await fetchImages(++page, query);
      renderImages(moreImages.results);
    });
  } else {
    loadMore.style.display = "none";
    updateMessage("show", `You've reached the end of the list.`);
  }
};

const resetList = () => {
  imageGrid.innerHTML = "";
  updateMessage("hide");
  loadMore.style.display = "none";
  input.value = "";
};

searchButton.addEventListener("click", async () => {
  const query = input.value;
  if (query.trim() === "") {
    showToaster("Enter valid search query.");
    return false;
  }
  resetList();
  const { results, total_pages } = await fetchImages(page, query);
  if (results.length > 0) {
    renderImages(results);
    updateLoadMore(total_pages, query);
  } else {
    updateMessage(
      "show",
      `<div>We couldn't find anything for <span>"${query}"</span>.</div><div>Try to refine your search.</div>`
    );
  }
});
