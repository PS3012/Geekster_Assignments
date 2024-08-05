const emojiGrid = document.querySelector(".emoji-grid");
const input = document.querySelector("input[name='search']");
const toaster = document.querySelector(".toaster");
const filter = document.querySelectorAll(".filter");
let filterList = [...emojiList];

const showToaster = (text) => {
  toaster.innerText = text;
  toaster.classList.remove("hide");
  setTimeout(() => {
    toaster.classList.add("hide");
  }, 3000);
};

const renderAllEmojis = () => {
  let html = "";
  filterList.forEach((element) => {
    let item = `
      <div class="emoji-item">${element.emoji}</div>
    `;
    html += item;
  });
  emojiGrid.innerHTML = html;
  addEmojiItemActions();
};

const addEmojiItemActions = () => {
  const emojiItems = document.querySelectorAll(".emoji-item");
  emojiItems.forEach((item) => {
    item.addEventListener("click", () => {
      const emoji = item.innerText;
      navigator.clipboard.writeText(emoji);
      showToaster(`Emoji ${emoji} copied to clipboard!`);
    });
  });
};

const filterEmojiList = (query) => {
  filterList = emojiList.filter(
    (element) =>
      element.emoji === query ||
      element.category.toLowerCase().includes(query.toLowerCase()) ||
      element.description.toLowerCase().includes(query.toLowerCase()) ||
      element.tags.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      )
  );
  renderAllEmojis();
};

window.addEventListener("load", () => {
  renderAllEmojis();
  input.addEventListener("input", function (e) {
    filterEmojiList(e.target.value);
  });
  filter.forEach((item) => {
    item.addEventListener("click", () => {
      const query = item.dataset.query;
      input.value = query;
      filterEmojiList(query);
    });
  });
});
