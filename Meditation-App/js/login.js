const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");
const switchButton = document.querySelectorAll(".switchButton");

const handleLogin = () => {
  const button = loginForm.querySelector("button");
  button.addEventListener("click", (e) => {
    const email = loginForm.querySelector("input[name='email']").value;
    const password = loginForm.querySelector("input[name='password']").value;
    e.preventDefault();
    if (email.trim() === "") {
      showToaster("Enter valid email");
    } else if (password.trim() === "") {
      showToaster("Enter password");
    } else {
      const medUsers = JSON.parse(localStorage.getItem("medUsers")) || [];
      const idx = medUsers.findIndex((user) => user.email === email);
      if (idx >= 0) {
        if (medUsers[idx].password === password) {
          medUsers.forEach((user) => {
            user.isLogin = false;
          });
          medUsers[idx].isLogin = true;
          localStorage.setItem("medUsers", JSON.stringify(medUsers));
          showToaster("User Login successfully!");
          redirectUser();
        } else {
          showToaster("Wrong Password!");
        }
      } else {
        showToaster("No user found!");
      }
      loginForm.querySelector("input[name='email']").value = "";
      loginForm.querySelector("input[name='password']").value = "";
    }
  });
};

const handleSignUp = () => {
  const button = signupForm.querySelector("button");
  button.addEventListener("click", (e) => {
    const firstName = signupForm.querySelector("input[name='firstName']").value;
    const lastName = signupForm.querySelector("input[name='lastName']").value;
    const email = signupForm.querySelector("input[name='email']").value;
    const password = signupForm.querySelector("input[name='password']").value;
    e.preventDefault();
    if (firstName.trim() === "") {
      showToaster("Enter First Name");
    } else if (lastName.trim() === "") {
      showToaster("Enter Last Name");
    } else if (email.trim() === "") {
      showToaster("Enter valid email");
    } else if (password.trim() === "") {
      showToaster("Enter valid password");
    } else {
      const medUsers = JSON.parse(localStorage.getItem("medUsers")) || [];
      const idx = medUsers.findIndex((user) => user.email === email);
      if (idx >= 0) {
        showToaster("User already exists!");
      } else {
        const user = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          isLogin: true,
        };
        medUsers.forEach((user) => {
          user.isLogin = false;
        });
        medUsers.push(user);
        localStorage.setItem("medUsers", JSON.stringify(medUsers));
        showToaster("User Registered successfully!");
        redirectUser();
      }
      signupForm.querySelector("input[name='firstName']").value = "";
      signupForm.querySelector("input[name='lastName']").value = "";
      signupForm.querySelector("input[name='email']").value = "";
      signupForm.querySelector("input[name='password']").value = "";
    }
  });
};

const redirectUser = () => {
  const medUsers = JSON.parse(localStorage.getItem("medUsers")) || [];
  const idx = medUsers.findIndex((user) => user.isLogin);
  if (idx >= 0) {
    window.location.href = "index.html";
  }
};

const switchForm = () => {
  switchButton.forEach((item) => {
    item.addEventListener("click", () => {
      loginForm.classList.toggle("d-none");
      signupForm.classList.toggle("d-none");
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  handleLogin();
  handleSignUp();
  switchForm();
  redirectUser();
});
