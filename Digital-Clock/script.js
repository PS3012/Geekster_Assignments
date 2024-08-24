const temperature = document.querySelector(".temperature");
const wind = document.querySelector(".wind");
const time = document.querySelector(".time");
const currentDate = document.querySelector(".currentDate");
const secondsBar = document.querySelector(".seconds-bar");
const audio = document.getElementById("audio");
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getCurrentDateTime = () => {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const hours = date.getHours();
  const weekDay = weekDays[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  secondsBar.style.width = `${Math.ceil((seconds / 60) * 100)}%`;
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const period = hours < 12 ? "AM" : "PM";
  time.innerText = `${formattedHours}:${minutes} ${period}`;
  currentDate.innerText = `${weekDay}, ${month} ${day}`;
};

const fetchWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Failed to fetch weather data:", err);
  }
};

const getWeatherInfo = () => {
  getCurrentDateTime();
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const weatherObj = await fetchWeather(
        position.coords.latitude,
        position.coords.longitude
      );
      if (weatherObj) {
        temperature.innerHTML = `${weatherObj.current.temperature_2m} ${weatherObj.current_units.temperature_2m}`;
        wind.innerHTML = `Wind Speed: ${weatherObj.current.wind_speed_10m} ${weatherObj.current_units.wind_speed_10m}`;
      }
    },
    (err) => {
      console.error("Geolocation error:", err);
    }
  );
};

window.addEventListener("load", () => {
  getWeatherInfo();
  setInterval(() => {
    getCurrentDateTime();
  }, 1000);

  audio.play().catch((error) => {
    console.error("Autoplay blocked or error occurred:", error);
  });
});
