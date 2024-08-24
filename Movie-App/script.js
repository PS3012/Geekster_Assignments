const toaster = document.querySelector(".toaster");
const input = document.querySelector("input[name='search']");
const movieGrid = document.querySelector(".movie-grid");
const loaderBox = document.querySelector(".loader-box");
const apiKey = "ff76a801";
let page = 1;
let loading = false;
let total = 0;
let query = "";

const showToaster = (text) => {
  toaster.innerText = text;
  toaster.classList.remove("hide");
  setTimeout(() => {
    toaster.classList.add("hide");
  }, 3000);
};

const fetchMovies = async (query, page) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${query}&page=${page}`
    );
    const movies = await response.json();
    if (movies.Response === "False") {
      showToaster(`${movies.Error} Search for another name.`);
      return [];
    }
    total = parseInt(movies.totalResults, 10);
    return movies.Search || [];
  } catch (error) {
    showToaster("Error fetching movies");
    return [];
  }
};

const renderMovies = (movies) => {
  movies.forEach((movie) => {
    movieGrid.innerHTML += `
     <div class="movie-item">
          <div class="image h-100">
               <img 
                    src=${
                      movie.Poster === "N/A" ? "images/demo.jfif" : movie.Poster
                    } 
                    alt=${movie.Title} class="w-100" 
               />
          </div>
          <div class="details w-100 h-100">
               <div>
                    <div class="name fw-700">${movie.Title}</div>
                    <div class="fw-700">${movie.Year}</div>
               </div>
          </div>
     </div>
    `;
  });
};

const loadMovies = async () => {
  if (loading) return;
  if (page * 10 >= total) {
    showToaster("You have reached the end of the list!");
  }
  loading = true;
  console.log(loaderBox);
  loaderBox.style.display = "block";
  const movies = await fetchMovies(query, page);
  loaderBox.style.display = "none";
  renderMovies(movies);
  loading = false;
  page++;
};

const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const filterByName = async () => {
  query = input.value.trim();
  if (query !== "") {
    page = 1;
    movieGrid.innerHTML = "";
    const movies = await fetchMovies(query, page);
    renderMovies(movies);
    page++;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  input.addEventListener("input", debounce(filterByName, 300));
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000 &&
      !loading
    ) {
      loadMovies();
    }
  });
});
