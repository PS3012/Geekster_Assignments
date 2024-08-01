const addForm = document.getElementById("addNote");
const noteList = document.getElementById("notes-list");
const message = document.querySelector(".message");

addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const noteText = e.target.noteContent.value;
  const background = e.target.background.value;

  //! Checking if Note Text is Blank
  if (noteText.trim() === "") {
    message.textContent = "Write valid Note Value";
    e.target.noteContent.style.borderColor = "#ff0000";
    setTimeout(() => {
      e.target.noteContent.style.borderColor = "#21212160";
      message.textContent = "";
    }, 3000);
    return false;
  }

  //! Creating a Note Element
  let noteElement = document.createElement("div");
  noteElement.classList.add("note-item");
  noteElement.style.background = background;

  //! Creating a Delete Button of Note
  let crossButton = document.createElement("button");
  crossButton.innerText = "x";
  noteElement.appendChild(crossButton);
  crossButton.addEventListener("click", () => {
    noteElement.style.display = "none";

    //! Checking if Note List is blank or not
    const notesArray = noteList.querySelectorAll(".note-item");
    let filterNotes = Array.from(notesArray).filter(
      (ele) => ele.style.display !== "none"
    );
    if (filterNotes.length === 0) {
      noteList.innerHTML = `<div class="no-notes">You have not added any notes yet!</div>`;
    }
  });

  //! Adding Text to the Note
  let note = document.createElement("div");
  note.innerHTML = noteText;
  noteElement.appendChild(note);

  //! Appending the element to the Note List
  noteList.append(noteElement);
  if (noteList.querySelector(".no-notes")) {
    noteList.querySelector(".no-notes").remove();
  }
  e.target.noteContent.value = "";
});
