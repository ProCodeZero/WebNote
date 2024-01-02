const form = document.querySelector('form')
const noteInfo = {};
console.log('form :>> ', form);
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	const title = formData.get('title')
	const text = formData.get('text')
	console.log('title :>> ', title);
	console.log('text :>> ', text);
	console.log('noteInfo :>> ', noteInfo);
	noteInfo.title = title;
	noteInfo.text = text;
	console.log('noteInfo :>> ', noteInfo);
});

// ! Make a delete btn
// ! Make a change btn
// ! Make an add btn