const accessKey = "0LCXjmq66l6RXbIsZKBhfYrF3iwFVraCuE8cCSreJ3o";
const gallery = document.getElementById("gallery");
let page = 1;
const perPage = 30;
let loading = false;

async function fetchPhotos(page, perPage) {
  const response = await fetch(
    `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}&client_id=${accessKey}`
  );
  const photos = await response.json();
  return photos;
}

function renderPhotos(photos) {
  photos.forEach((photo) => {
    const img = document.createElement("img");
    img.src = photo.urls.small;
    img.alt = photo.alt_description;
    gallery.appendChild(img);
  });
}

async function loadPhotos() {
  if (loading) return;
  loading = true;
  const photos = await fetchPhotos(page, perPage);
  renderPhotos(photos);
  loading = false;
  page++;
}

// Load initial photos
loadPhotos();

// Detect when the user scrolls to the bottom of the page
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    !loading
  ) {
    loadPhotos();
  }
});
