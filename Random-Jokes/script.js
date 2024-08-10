const jokeBtn = document.querySelector(".jokeBtn");
const joke = document.querySelector(".joke");

const fetchJoke = async () => {
  joke.innerText = "Thinking 🤔🤔...";
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/jokes", {
      headers: {
        "X-Api-Key": "rjSpuUjOl2MbA9O44ThqqA==QXfr8tBR2bA80nyp",
      },
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    joke.innerText = result[0]?.joke;
    jokeBtn.innerHTML = "<span>Get Another</span>";
  } catch (err) {
    console.error(err);
    joke.innerText = "Sorry, but we are facing some errors finding a joke.";
    jokeBtn.innerHTML = "<span>Try Again</span>";
  }
};

jokeBtn.addEventListener("click", () => {
  fetchJoke();
});
