const dob = document.querySelector("input[type='date']");
const userShow = document.querySelector("input[type='text']");
const htmlYear = document.querySelector(".years");
const htmlMonth = document.querySelector(".months");
const htmlDay = document.querySelector(".days");
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
dob.addEventListener("change", (e) => {
  const value = new Date(e.target.value);
  const date = value.getDate();
  const month = months[value.getMonth()];
  const year = value.getFullYear();
  userShow.value = `${date} ${month}, ${year}`;
  const today = new Date();
  const diff = {
    years: today.getFullYear() - value.getFullYear(),
    months: today.getMonth() - value.getMonth(),
    days: today.getDate() - value.getDate(),
  };
  if (diff.days < 0) {
    diff.months--;
    diff.days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (diff.months < 0) {
    diff.years--;
    diff.months += 12;
  }
  htmlYear.innerHTML = diff.years;
  htmlMonth.innerHTML = diff.months;
  htmlDay.innerHTML = diff.days;
});
