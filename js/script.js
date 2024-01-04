const form = document.querySelector('form');
const boardWithNotes = document.querySelector('.board-with-notes__wrapper');
const closeBtnsArray = Array.from(document.querySelectorAll('.note__close-btn'));
const changeBtnsArray = Array.from(document.querySelectorAll('.note__close-btn'));

//! Finish Custom validation check
document.addEventListener("DOMContentLoaded", function () {
	var elements = document.getElementsByClassName('form__input');
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
})

//Add btn
function createNote(title, text) {
	const newNoteWrapper = document.createElement('article');
	const newNote = document.createElement('div');
	const newChangeBtn = document.createElement('button');
	const newCloseBtn = document.createElement('button');
	const newTitle = document.createElement('h3');
	const newText = document.createElement('p');
	newNoteWrapper.className = 'note-wrapper';
	newNote.className = 'note-body note';
	newChangeBtn.className = 'note__btn note__do-change-btn';
	newCloseBtn.className = 'note__btn note__close-btn';
	newTitle.className = 'note-title';
	newText.className = 'note-text';
	newTitle.insertAdjacentHTML("beforeend", title);
	newText.insertAdjacentHTML("beforeend", text);
	newNoteWrapper.append(newNote);
	newNote.append(newChangeBtn);
	newNote.append(newCloseBtn);
	newNote.append(newTitle);
	newNote.append(newText);
	closeBtnsArray.push(newCloseBtn);
	newCloseBtn.addEventListener('click', (e) => {
		e.target.parentNode.parentNode.remove();
	})
	return newNoteWrapper;
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	const title = formData.get('title');
	const text = formData.get('text');
	document.getElementById('formTitle').value = '';
	document.getElementById('formText').value = '';
	boardWithNotes.prepend(createNote(title, text));
});


//Delete btn
closeBtnsArray.forEach(closeBtn => {
	closeBtn.addEventListener('click', (e) => {
		e.target.parentNode.parentNode.remove();
	})
});


//Change btn
