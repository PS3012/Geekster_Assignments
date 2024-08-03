const players = [];
const firstName = document.querySelector("input[name='firstName']");
const lastName = document.querySelector("input[name='lastName']");
const city = document.querySelector("input[name='city']");
const score = document.querySelector("input[name='score']");
const addBtn = document.querySelector(".add-player");
const listing = document.getElementById("players-list");
const blank = document.querySelector(".blank");

const addCardActions = () => {
  const playerCard = document.querySelectorAll(".player-card");
  playerCard.forEach((card, index) => {
    card
      .querySelector("[data-action='increase']")
      .addEventListener("click", () => {
        players[index].score = parseInt(players[index].score) + 5;
        updateFrontend();
      });
    card
      .querySelector("[data-action='decrease']")
      .addEventListener("click", () => {
        players[index].score = Math.max(0, parseInt(players[index].score) - 5);
        updateFrontend();
      });
    card
      .querySelector("[data-action='delete']")
      .addEventListener("click", () => {
        players.splice(index, 1);
        updateFrontend();
      });
  });
};

const updateFrontend = () => {
  let html = "";
  players.sort((a, b) => b.score - a.score);
  players.forEach((player) => {
    html += `<div class="player-card">
          <div class="top-block">
            <div>
              <div class="name fw-700">${player.firstName} ${player.lastName}</div>
              <div>${player.city}</div>
            </div>
            <button data-action="delete">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ff000020"
                  stroke="#ff0000"
                  d="M9.5 9v9m5-9v9m-6-13.5h-6v.25l.24 1.05A70 70 0 0 1 4.5 21.398V22.5h15v-1.102c0-5.249.59-10.48 1.76-15.598l.24-1.05V4.5h-6m-7 0V4a3.5 3.5 0 1 1 7 0v.5m-7 0h7"
                />
              </svg>
            </button>
          </div>
          <div class="bottom-block">
            <div>Score: ${player.score}</div>
            <button data-action="increase">+5</button>
            <button data-action="decrease">-5</button>
          </div>
        </div>`;
  });
  listing.innerHTML = html;
  addCardActions();
  if (players.length === 0) {
    blank.style.display = "block";
    return;
  } else {
    blank.style.display = "none";
  }
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!firstName.value || !lastName.value || !city.value || !score.value) {
    alert("Please add all details");
    return false;
  }
  const player = {
    firstName: firstName.value,
    lastName: lastName.value,
    city: city.value,
    score: score.value,
  };
  players.push(player);
  updateFrontend();
  firstName.value = "";
  lastName.value = "";
  city.value = "";
  score.value = "";
});
