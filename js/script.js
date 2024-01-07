const form = document.querySelector("form");
const boardWithNotes = document.querySelector(".board-with-notes__wrapper");
const closeBtnsArray = Array.from(
  document.querySelectorAll(".note__close-btn")
);
const changeBtnsArray = Array.from(
  document.querySelectorAll(".note__do-change-btn")
);
const count = { c: 0 }; // To find max key's value from localStorage
addNotesFromLocalStoage(getNotesFromLocalStorage());
console.log("localStorage :>> ", localStorage);

function getNotesFromLocalStorage() {
  const arrayOfNotes = [];
  const storageNotes = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    storageNotes.push(JSON.parse(localStorage.getItem(key)));
  }
  for (key in storageNotes) {
    arrayOfNotes.push([...storageNotes[key]]);
  }
  return arrayOfNotes;
}

// Добавить правильную последовательность вывода заметок на экран в порядке старения.
function getKeysOfNotes(array) {
  return array.map((note) => note[2]);
}

function addNotesFromLocalStoage(notesInfoArray) {
  const keys = getKeysOfNotes(notesInfoArray);
  let len = keys.length;
  if (len != 0) {
    for (let i = 0; i < len; i++) {
      let min = Math.min.apply(null, keys);
      let index = keys.indexOf(min);
      let correctNote = JSON.parse(localStorage.getItem(min));
      [title, text, correctKey] = correctNote;
      let newNote = createNote(title, text);
      boardWithNotes.prepend(newNote);
      keys.splice(index, 1);
    }
  }
}

function removeCorrectNoteFromLocalStoage(correctNoteTitle, notesInfoArray) {
  notesInfoArray.forEach((noteInfo) => {
    [title, text, correctKey] = noteInfo;
    if (title === correctNoteTitle) {
      localStorage.removeItem(correctKey);
    }
  });
}

//! Finish Custom validation check
document.addEventListener("DOMContentLoaded", function () {
  var elements = document.getElementsByClassName("form__input");
  for (var i = 0; i < elements.length; i++) {
    elements[i].oninvalid = function (e) {
      e.target.setCustomValidity("");
      if (!e.target.validity.valid) {
        // e.target.setAttribute('style', 'border: 1px solid #ff0000;')
        e.target.setCustomValidity("This field cannot be left blank");
      }
    };
    elements[i].oninput = function (e) {
      e.target.setCustomValidity("");
      // e.target.setAttribute('style', 'border: 1px solid #ffffff;')
      // e.target.addEventListener("mouseover", (e) => {
      // 	e.target.setAttribute('style', 'border: 1px solid #683be4;')
      // });
      // e.target.addEventListener("mouseout", (e) => {
      // 	e.target.setAttribute('style', 'border: 1px solid #ffffff;')
      // });
    };
  }
});

//Add btn
form.addEventListener("submit", submitFn);

function createNote(title, text) {
  const newNoteWrapper = document.createElement("article");
  const newNote = document.createElement("div");
  const newChangeBtn = document.createElement("button");
  const newCloseBtn = document.createElement("button");
  const newTitle = document.createElement("h3");
  const newText = document.createElement("p");
  newNoteWrapper.className = "note-wrapper";
  newNote.className = "note-body note";
  newChangeBtn.className = "note__btn note__do-change-btn";
  newCloseBtn.className = "note__btn note__close-btn";
  newTitle.className = "note-title";
  newText.className = "note-text";
  newTitle.insertAdjacentHTML("beforeend", title);
  newText.insertAdjacentHTML("beforeend", text);
  newNoteWrapper.append(newNote);
  newNote.append(newChangeBtn);
  newNote.append(newCloseBtn);
  newNote.append(newTitle);
  newNote.append(newText);
  closeBtnsArray.push(newCloseBtn);
  changeBtnsArray.push(newChangeBtn);
  newChangeBtn.addEventListener("click", changeNoteParams);
  newCloseBtn.addEventListener("click", deleteNote);
  return newNoteWrapper;
}

function resetForm() {
  document.getElementById("formTitle").value = "";
  document.getElementById("formText").value = "";
}

function submitFn(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const title = formData.get("title");
  const text = formData.get("text");
  resetForm();
  const newNote = createNote(title, text);
  boardWithNotes.prepend(newNote);
  addToLocalStorage(title, text);
}

function addToLocalStorage(title, text) {
  let maxValue =
    parseInt(
      Object.keys(localStorage).reduce((start, value) => {
        start >= value ? (start = start) : (start = value);
        return start;
      }, 0)
    ) + 1;
  count.c = maxValue;
  let noteValues = [];
  noteValues[0] = title;
  noteValues[1] = text;
  noteValues[2] = count.c;
  localStorage.setItem(count.c, JSON.stringify(noteValues));
  count.c++;
}

//Delete btn
closeBtnsArray.forEach((closeBtn) => {
  closeBtn.addEventListener("click", deleteNote);
});

function deleteNote(e) {
  const noteTitleText =
    e.target.parentNode.querySelector(".note-title").textContent;
  removeCorrectNoteFromLocalStoage(noteTitleText, getNotesFromLocalStorage());
  e.target.parentNode.parentNode.remove();
}

//Change btn

changeBtnsArray.forEach((changeBtn) => {
  changeBtn.addEventListener("click", changeNoteParams);
});

function changeNoteParams(e) {
  const formSubmitBtn = form.querySelector(".form__button");
  const correctNoteTitle = e.target.parentNode.querySelector(".note-title");
  const correctNoteText = e.target.parentNode.querySelector(".note-text");
  const formChangeBtn = form.querySelector(".form__change-button");
  formSubmitBtn.className = "form__button hide-btn";
  formChangeBtn.classList.remove("hide-btn");
  fillForm(correctNoteTitle.textContent, correctNoteText.textContent);
  formChangeBtn.addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const newTitle = formData.get("title");
      const newText = formData.get("text");
      correctNoteTitle.textContent = newTitle;
      correctNoteText.textContent = newText;
      resetForm();
      formChangeBtn.className = "form__change-button hide-btn";
      formSubmitBtn.classList.remove("hide-btn");
    },
    { once: true }
  );
}

function fillForm(oldNoteTitle, oldNoteText) {
  const formInputTitle = form.querySelector(".form__title");
  const formInputText = form.querySelector(".form__textarea");
  formInputTitle.value = oldNoteTitle;
  formInputText.value = oldNoteText;
}
