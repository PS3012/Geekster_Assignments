const toaster = document.querySelector(".toaster");
const input = document.querySelector("input[name='search']");
const movieGrid = document.querySelector(".movie-grid");
const loaderBox = document.querySelector(".loader-box");
const movieDialog = document.querySelector(".movie-dialog-container");
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

const fetchSingleMovie = async (id) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
    );
    const movie = await response.json();
    if (movie.Response === "False") {
      showToaster(movie.Error);
      return {};
    }
    return movie;
  } catch (error) {
    showToaster("Error fetching movies");
    return {};
  }
};

const addActions = () => {
  const movieItems = document.querySelectorAll(".movie-item");
  movieItems.forEach((item) => {
    item.removeEventListener("click", handleMovieClick);
    item.addEventListener("click", handleMovieClick);
  });
};

const handleMovieClick = async function () {
  const movie = await fetchSingleMovie(this.dataset.imbdid);
  const html = `
     <div class="dialog">
          <div class="close">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="#ffffff" d="m8.746 8l3.1-3.1a.527.527 0 1 0-.746-.746L8 7.254l-3.1-3.1a.527.527 0 1 0-.746.746l3.1 3.1l-3.1 3.1a.527.527 0 1 0 .746.746l3.1-3.1l3.1 3.1a.527.527 0 1 0 .746-.746zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16"/></svg>
          </div>
          <div class="inner-grid">
               <div class="image">
                    <img 
                         src=${
                           movie.Poster === "N/A"
                             ? "images/demo.jfif"
                             : movie.Poster
                         } 
                         alt=${movie.Title} class="w-100" 
                    />
               </div>
               <div class="details">
                    <div class="fw-700 name">${movie.Title}</div>
                    <div class="mb-1">${movie.Year}</div>
                    <div class="mb-1">
                         ${Math.floor(parseInt(movie.Runtime) / 60)}hr 
                         ${parseInt(movie.Runtime) % 60}min
                    </div>
                    <div class="fw-600 mb-1">${movie.Plot}</div>
                    <div class="mb-1"><strong>Director: </strong> 
                         ${movie.Director}
                    </div>
                    <div class="mb-1"><strong>Writers: </strong> 
                         ${movie.Writer}
                    </div>
                    <div class="mb-1"><strong>Actors: </strong> 
                         ${movie.Actors}
                    </div>
                    <div class="mb-1"><strong>Rating: </strong> 
                         ${movie.imdbRating}/10
                    </div>
                    <div class="mb-1"><strong>Language: </strong> 
                         ${movie.Language}
                    </div>
                    <div><strong>Awards: </strong> 
                         ${movie.Awards}
                    </div>
               </div>
          </div>
     </div>
  `;
  movieDialog.innerHTML = html;
  movieDialog.style.display = "flex";
  document.body.style.overflow = "hidden";
  movieDialog.querySelector(".close").addEventListener("click", () => {
    movieDialog.style.display = "none";
    document.body.style.overflow = "unset";
    movieDialog.innerHTML = "";
  });
};

const renderMovies = (movies) => {
  movies.forEach((movie) => {
    movieGrid.innerHTML += `
     <div class="movie-item" data-imbdid=${movie.imdbID}>
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
  addActions();
};

const loadMovies = async () => {
  if (loading) return;
  if (page * 10 >= total) {
    showToaster("You have reached the end of the list!");
  }
  loading = true;
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

document.addEventListener("DOMContentLoaded", async () => {
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
