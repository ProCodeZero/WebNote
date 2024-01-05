const form = document.querySelector("form");
const boardWithNotes = document.querySelector(".board-with-notes__wrapper");
const closeBtnsArray = Array.from(document.querySelectorAll(".note__close-btn"));
const changeBtnsArray = Array.from(document.querySelectorAll(".note__do-change-btn"));
// const formChangeBtn = form.querySelector('.form__change-button');
// let correctNote;

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
	boardWithNotes.prepend(createNote(title, text));
}


//Delete btn
closeBtnsArray.forEach((closeBtn) => {
	closeBtn.addEventListener("click", deleteNote);
});
function deleteNote(e) {
	e.target.parentNode.parentNode.remove();
}

//Change btn

changeBtnsArray.forEach((changeBtn) => {
	changeBtn.addEventListener("click", changeNoteParams);
});

function changeNoteParams(e) {
	const formSubmitBtn = form.querySelector('.form__button');
	const correctNoteTitle = e.target.parentNode.querySelector('.note-title');
	const correctNoteText = e.target.parentNode.querySelector('.note-text');
	const formChangeBtn = form.querySelector('.form__change-button');
	formSubmitBtn.className = 'form__button hide-btn';
	formChangeBtn.classList.remove('hide-btn');
	fillForm(correctNoteTitle.textContent, correctNoteText.textContent);
	formChangeBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const formData = new FormData(form);
		const newTitle = formData.get("title");
		const newText = formData.get("text");
		correctNoteTitle.textContent = newTitle;
		correctNoteText.textContent = newText;
		resetForm();
		formChangeBtn.className = 'form__change-button hide-btn';
		formSubmitBtn.classList.remove('hide-btn');
	}, { once: true });
}

function fillForm(oldNoteTitle, oldNoteText) {
	const formInputTitle = form.querySelector('.form__title');
	const formInputText = form.querySelector('.form__textarea');
	formInputTitle.value = oldNoteTitle;
	formInputText.value = oldNoteText;
}