const switcher = document.querySelector(".toggle");
const hider = document.querySelector(".toggle .hider");
const categoryList = document.querySelector(".category-list");
const bookListingBlock = document.querySelector(".books-listing-block");
const bookDetailModal = document.querySelector("#book-detail-modal");
const signUpButton = document.querySelector("header button.signup");
const userLogOutButton = document.querySelector("header button.user");
const loginRegisterContainer = document.querySelector(
  "#login-register-container"
);
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");
const toaster = document.querySelector(".toaster");

const showToaster = (text) => {
  toaster.innerText = text;
  toaster.classList.remove("hide");
  setTimeout(() => {
    toaster.classList.add("hide");
  }, 3000);
};

switcher.addEventListener("click", () => {
  hider.classList.toggle("dark");
  document.body.classList.toggle("dark");
});

const triggerAPI = async (link) => {
  const response = await fetch(link);
  const result = await response.json();
  return result;
};

const fetchCategoryList = async () => {
  const categories = await triggerAPI(
    "https://books-backend.p.goit.global/books/category-list"
  );
  categories.unshift({ list_name: "All Categories" });
  renderCategoryList(categories);
};

const renderCategoryList = (categories) => {
  categories.forEach((item) => {
    let html = `
                <div 
                     class="item" 
                     data-category=${item.list_name.split(" ").join("+")}
                     >
                     ${item.list_name}
                </div>
           `;
    categoryList.innerHTML += html;
  });
  addCategoryActions();
};

const addCategoryActions = () => {
  const categoryItems = categoryList.querySelectorAll(".item");
  categoryItems.forEach((item) => {
    const category = item.dataset.category;
    item.addEventListener("click", () => {
      categoryItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
      if (category === "All+Categories") {
        fetchTopBooks();
      } else {
        fetchSingleCategoryBook(category);
      }
    });
    if (category === "All+Categories") {
      item.click();
    }
  });
};

const fetchTopBooks = async () => {
  const booksList = await triggerAPI(
    "https://books-backend.p.goit.global/books/top-books"
  );
  renderAllCategoryBooks(booksList);
};

const renderAllCategoryBooks = (booksList) => {
  const bookListingBlockContent = `
     <div class="main-head fw-700">
          BEST <span class="text-theme">SELLER</span> BOOKS
     </div>
     ${booksList
       .map(
         (listItem) => `
          <div class="single-book-list">
               <div class="head fw-700">${listItem.list_name}</div>
               ${renderBookListGrid(listItem.books)}
               <div class="see-more">
                    <button 
                         class="custom see-more-btn" 
                         data-category=${listItem.list_name
                           .split(" ")
                           .join("+")}
                    ><span>See More</span></button>
               </div>
          </div>
          `
       )
       .join("")}
     `;
  bookListingBlock.innerHTML = bookListingBlockContent;
  addBookItemActions();

  const seeMoreButtons = bookListingBlock.querySelectorAll(".see-more-btn");
  seeMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const categoryItems = categoryList.querySelectorAll(".item");
      categoryItems.forEach((el) => el.classList.remove("active"));
      fetchSingleCategoryBook(button.dataset.category);
    });
  });
};

const renderBookListGrid = (books) => {
  const html = `
     <div class="book-list">
          ${books
            .map(
              (book) => `
               <div class="book-item" data-id="${book._id}">
                    <div class="image">
                         <img 
                              src="${
                                book.book_image
                                  ? book.book_image
                                  : "images/cover.png"
                              }" 
                              alt="${book.title}" class="w-100" 
                         />
                    </div>
                    <div class="name fw-600">${book.title}</div>
                    <div class="author fw-500">${book.author}</div>
               </div>
          `
            )
            .join(" ")}
     </div>
     `;
  return html;
};

const addBookItemActions = () => {
  const bookItems = document.querySelectorAll(".book-item");
  bookItems.forEach((item) => {
    item.removeEventListener("click", () => handleBookClick);
    item.addEventListener("click", () => handleBookClick(item));
  });
};

const handleBookClick = async (item) => {
  const book = await triggerAPI(
    `https://books-backend.p.goit.global/books/${item.dataset.id}`
  );
  const html = `
     <div class="dialog">
          <div class="close">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="inherit" d="m8.746 8l3.1-3.1a.527.527 0 1 0-.746-.746L8 7.254l-3.1-3.1a.527.527 0 1 0-.746.746l3.1 3.1l-3.1 3.1a.527.527 0 1 0 .746.746l3.1-3.1l3.1 3.1a.527.527 0 1 0 .746-.746zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16"/></svg>
          </div>
          <div class="inner-grid">
               <div class="image">
                    <img 
                         src="${
                           book.book_image
                             ? book.book_image
                             : "images/cover.png"
                         }" 
                         alt="${book.title}" class="w-100" 
                    />
               </div>
               <div class="details">
                    <div class="name fw-600">${book.title}</div>
                    <div class="author fw-500">${book.author}</div>
                    <div class="description">
                         ${
                           book.description
                             ? book.description
                             : "There is no description of this book."
                         }
                    </div>
                    <div class="buy-links">
                         ${book.buy_links
                           .map((link, idx) =>
                             idx < 3
                               ? `
                                   <a href="${link.url}" class="fw-500" target="_blank">
                                        ${link.name}
                                   </a>
                              `
                               : ""
                           )
                           .join("")}
                    </div>
                    <button class="custom"><span>Add to Bag</span></button>
               </div>
          </div>
     </div>
  `;
  bookDetailModal.innerHTML = html;
  bookDetailModal.style.display = "flex";
  document.body.style.overflow = "hidden";
  bookDetailModal.querySelector(".close").addEventListener("click", () => {
    bookDetailModal.style.display = "none";
    document.body.style.overflow = "unset";
    bookDetailModal.innerHTML = "";
  });
};

const fetchSingleCategoryBook = async (category) => {
  const books = await triggerAPI(
    `https://books-backend.p.goit.global/books/category?category=${category}`
  );
  bookListingBlock.innerHTML = `
     <div class="main-head fw-700">
          ${category
            .split("+")
            .map((word, idx) =>
              idx % 2 === 0 ? word : `<span class="text-theme">${word}</span>`
            )
            .join(" ")}
     </div>
     <div class="single-book-list">
          ${renderBookListGrid(books)}
     </div>
  `;
  addBookItemActions();
};

const implementLogin = () => {
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
      const bookUsers = JSON.parse(localStorage.getItem("bookUsers")) || [];
      const idx = bookUsers.findIndex((user) => user.email === email);
      if (idx >= 0) {
        if (bookUsers[idx].password === password) {
          bookUsers.forEach((user) => {
            user.isLogin = false;
          });
          bookUsers[idx].isLogin = true;
          localStorage.setItem("bookUsers", JSON.stringify(bookUsers));
          loginRegisterContainer.style.display = "none";
          showToaster("User Login successfully!");
          checkLoginUser();
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

const implementSignUp = () => {
  const button = signupForm.querySelector("button");
  button.addEventListener("click", (e) => {
    const name = signupForm.querySelector("input[name='name']").value;
    const email = signupForm.querySelector("input[name='email']").value;
    const password = signupForm.querySelector("input[name='password']").value;
    e.preventDefault();
    if (name.trim() === "") {
      showToaster("Enter valid name");
    } else if (email.trim() === "") {
      showToaster("Enter valid email");
    } else if (password.trim() === "") {
      showToaster("Enter valid password");
    } else {
      const bookUsers = JSON.parse(localStorage.getItem("bookUsers")) || [];
      const idx = bookUsers.findIndex((user) => user.email === email);
      if (idx >= 0) {
        showToaster("User already exists!");
      } else {
        const user = {
          name: name,
          email: email,
          password: password,
          isLogin: true,
        };
        bookUsers.forEach((user) => {
          user.isLogin = false;
        });
        bookUsers.push(user);
        localStorage.setItem("bookUsers", JSON.stringify(bookUsers));
        loginRegisterContainer.style.display = "none";
        showToaster("User Login successfully!");
        checkLoginUser();
      }
      signupForm.querySelector("input[name='name']").value = "";
      signupForm.querySelector("input[name='email']").value = "";
      signupForm.querySelector("input[name='password']").value = "";
    }
  });
};

const checkLoginUser = () => {
  const bookUsers = JSON.parse(localStorage.getItem("bookUsers"));
  const idx = bookUsers.findIndex((user) => user.isLogin);
  if (idx >= 0) {
    signUpButton.style.display = "none";
    userLogOutButton.style.display = "block";
    userLogOutButton.innerHTML = `
     <span>
          ${bookUsers[idx].name.split(" ")[0]} 
          <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5.615 20q-.69 0-1.152-.462Q4 19.075 4 18.385V5.615q0-.69.463-1.152Q4.925 4 5.615 4h6.404v1H5.615q-.23 0-.423.192Q5 5.385 5 5.615v12.77q0 .23.192.423q.193.192.423.192h6.404v1H5.615Zm10.847-4.462l-.702-.719l2.319-2.319H9.192v-1h8.887l-2.32-2.32l.703-.718L20 12l-3.538 3.538Z"
                />
          </svg>
     </span>
    `;
    userLogOutButton.addEventListener("click", () => {
      bookUsers[idx].isLogin = false;
      localStorage.setItem("bookUsers", JSON.stringify(bookUsers));
      signUpButton.style.display = "block";
      userLogOutButton.style.display = "none";
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchCategoryList();
  signUpButton.addEventListener("click", () => {
    loginRegisterContainer.style.display = "flex";
    loginRegisterContainer.querySelector(".image").classList.remove("signUp");
  });
  loginRegisterContainer.querySelectorAll(".close").forEach((close) => {
    close.addEventListener("click", () => {
      loginRegisterContainer.style.display = "none";
    });
  });
  loginRegisterContainer.querySelectorAll(".switch").forEach((change) => {
    change.addEventListener("click", () => {
      loginRegisterContainer.querySelector(".image").classList.toggle("signUp");
    });
  });
  implementLogin();
  implementSignUp();
  checkLoginUser();
});
