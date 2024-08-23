// http://www.omdbapi.com/?i=tt3896198&apikey=ff76a801

const fetchMovies = async () => {
  const response = await fetch(
    "http://www.omdbapi.com/?i=tt3896198&apikey=ff76a801"
  );
  const movies = response.json();
};
