const typedText = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");
const header = document.querySelector("header");

const textArray = [
  "Find your harmony.",
  "Let music guide.",
  "Amplify your soul.",
  "Embrace the tranquility.",
];

let textArrayIndex = 0;
let charIndex = 0;

const erase = () => {
  if (charIndex > 0) {
    cursor.classList.remove("blink");
    typedText.textContent = textArray[textArrayIndex].slice(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 80);
  } else {
    cursor.classList.add("blink");
    textArrayIndex++;
    if (textArrayIndex > textArray.length - 1) {
      textArrayIndex = 0;
    }
    setTimeout(handleTypeWriter, 1000);
  }
};

const handleTypeWriter = () => {
  if (charIndex <= textArray[textArrayIndex].length - 1) {
    cursor.classList.remove("blink");
    typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(handleTypeWriter, 120);
  } else {
    cursor.classList.add("blink");
    setTimeout(erase, 1000);
  }
};

const handleAccordion = () => {
  const accordions = document.querySelectorAll(".accordion");

  const openAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion__content");
    accordion.classList.add("accordion__active");
    content.style.maxHeight = content.scrollHeight + 32 + "px";
  };

  const closeAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion__content");
    accordion.classList.remove("accordion__active");
    content.style.maxHeight = null;
  };

  accordions.forEach((accordion) => {
    const intro = accordion.querySelector(".accordion__intro");
    const content = accordion.querySelector(".accordion__content");

    intro.onclick = () => {
      if (content.style.maxHeight) {
        closeAccordion(accordion);
      } else {
        accordions.forEach((accordion) => closeAccordion(accordion));
        openAccordion(accordion);
      }
    };
  });
};

document.addEventListener("DOMContentLoaded", () => {
  handleTypeWriter();
  handleAccordion();
  window.addEventListener("scroll", () => {
    if (window.scrollY < 50) {
      header.classList.remove("dark-header");
    } else {
      header.classList.add("dark-header");
    }
  });
});
