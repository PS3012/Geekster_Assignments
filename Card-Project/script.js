window.addEventListener("load", () => {
  let user = localStorage.getItem("user");
  if (!user) {
    user = takeUserInformation();
  } else {
    try {
      user = JSON.parse(user);
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
      localStorage.removeItem("user");
      user = takeUserInformation();
    }
  }
  renderUserInformation(user);
});

const takeUserInformation = () => {
  const firstName = prompt("Enter your First Name.");
  if (!firstName) {
    alert("First Name is required.");
    return takeUserInformation();
  }
  const lastName = prompt("Enter your Last Name.");
  if (!lastName) {
    alert("Last Name is required.");
    return takeUserInformation();
  }
  const country = prompt("Enter your country.");
  if (!country) {
    alert("Country is required.");
    return takeUserInformation();
  }
  const phoneNumber = prompt("Enter your Phone Number.");
  if (!phoneNumber) {
    alert("Phone Number is required.");
    return takeUserInformation();
  }
  const state = prompt("Enter your State.");
  if (!state) {
    alert("State is required.");
    return takeUserInformation();
  }
  const city = prompt("Enter your City.");
  if (!city) {
    alert("City is required.");
    return takeUserInformation();
  }
  const village = prompt("Enter your Village.");
  if (!village) {
    alert("Village is required.");
    return takeUserInformation();
  }
  const user = {
    firstName: firstName,
    lastName: lastName,
    country: country,
    phoneNumber: phoneNumber,
    state: state,
    city: city,
    village: village,
  };
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

const renderUserInformation = (user) => {
  const userInfoItems = document.querySelectorAll(".userInfo");
  userInfoItems.forEach((ele) => {
    ele.innerText = user[ele.dataset.info] || " ";
  });
};
