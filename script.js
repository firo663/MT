const notesContainer = document.querySelector('.all_notes');
const addNoteBtn = document.getElementById('addNoteBtn');
const noteModal = document.getElementById('noteModal');
const saveNoteBtn = document.getElementById('saveNote');
const closeModalBtn = document.getElementById('closeModal');
const noteTitleInput = document.getElementById('noteTitle');
const noteDescInput = document.getElementById('noteDesc');
const noteTemplate = document.querySelector('#noteTemplate .note');

let editingNoteId = null;  // Для ідентифікації нотатки під час редагування

// Завантаження нотаток з localStorage
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach(note => {
    createNoteElement(note.id, note.title, note.desc, note.date);
  });
}

// Збереження нотаток у localStorage
function saveNotes() {
  const notesElems = notesContainer.querySelectorAll('.note:not(#noteTemplate .note)');
  const notes = [];
  notesElems.forEach(noteElem => {
    const id = noteElem.dataset.id;
    const title = noteElem.querySelector('.note-title').textContent;
    const desc = noteElem.querySelector('.note-desc').textContent;
    const date = noteElem.querySelector('.data').textContent;
    notes.push({id, title, desc, date});
  });
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Створення елемента нотатки і додавання в DOM
function createNoteElement(id, title, desc, date) {
  const newNote = noteTemplate.cloneNode(true);
  newNote.style.display = 'flex';  // бо в шаблоні display:none
  newNote.dataset.id = id;
  newNote.querySelector('.note-title').textContent = title;
  newNote.querySelector('.note-desc').textContent = desc;
  newNote.querySelector('.data').textContent = date;

  // Кнопка редагування
  newNote.querySelector('.edit-note').addEventListener('click', () => {
    editingNoteId = id;
    noteTitleInput.value = title;
    noteDescInput.value = desc;
    noteModal.style.display = 'flex';
    noteModal.querySelector('h2').textContent = 'Редагувати нотатку';
    noteTitleInput.focus();
  });

  // Кнопка видалення
  newNote.querySelector('.delete-note').addEventListener('click', () => {
    if (confirm('Видалити цю нотатку?')) {
      newNote.remove();
      saveNotes();
    }
  });

  notesContainer.appendChild(newNote);
}

// Генерація унікального id (можна замінити на краще, але для прикладу підходить)
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Додавання нової нотатки
addNoteBtn.addEventListener('click', () => {
  noteTitleInput.value = '';
  noteDescInput.value = '';
  editingNoteId = null;
  noteModal.style.display = 'flex';
  noteModal.querySelector('h2').textContent = 'Нова нотатка';
  noteTitleInput.focus();
});

// Закриття модалки
closeModalBtn.addEventListener('click', () => {
  noteModal.style.display = 'none';
});

// Збереження нотатки (нова або редагування)
saveNoteBtn.addEventListener('click', () => {
  const title = noteTitleInput.value.trim();
  const desc = noteDescInput.value.trim();

  if (!title && !desc) {
    alert('Будь ласка, введіть заголовок або опис нотатки.');
    return;
  }

  const dateStr = new Date().toLocaleDateString();

  if (editingNoteId) {
    // Оновити існуючу нотатку
    const noteElems = notesContainer.querySelectorAll('.note');
    noteElems.forEach(noteElem => {
      if (noteElem.dataset.id === editingNoteId) {
        noteElem.querySelector('.note-title').textContent = title;
        noteElem.querySelector('.note-desc').textContent = desc;
        noteElem.querySelector('.data').textContent = dateStr;
      }
    });
  } else {
    // Створити нову нотатку
    const newId = generateId();
    createNoteElement(newId, title, desc, dateStr);
  }

  saveNotes();
  noteModal.style.display = 'none';
});

// Закрити модалку при кліку поза нею
noteModal.addEventListener('click', e => {
  if (e.target === noteModal) {
    noteModal.style.display = 'none';
  }
});

// Закрити модалку клавішею Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && noteModal.style.display === 'flex') {
    noteModal.style.display = 'none';
  }
});

// При завантаженні сторінки — завантажуємо нотатки
window.addEventListener('load', loadNotes);
