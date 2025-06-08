document.querySelector('.add').addEventListener('click', () => {
    document.getElementById('noteModal').style.display = 'flex';
});

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('noteModal').style.display = 'none';
});

document.getElementById('saveNote').addEventListener('click', () => {
    const title = document.getElementById('noteTitle').value;
    const desc = document.getElementById('noteDesc').value;

    if (title && desc) {
        const noteBox = document.createElement('div');
        noteBox.className = 'box note';
        noteBox.innerHTML = `<h1>${title}</h1><p>${desc}</p><p class="data">${new Date().toLocaleDateString()}</p>`;
        document.querySelector('.all_notes').appendChild(noteBox);

        document.getElementById('noteModal').style.display = 'none';
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteDesc').value = '';
    } else {
        alert('Заповніть всі поля!');
    }
});
