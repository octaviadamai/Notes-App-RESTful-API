/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const notesData = [\r\n    {\r\n        id: 'notes-jT-jjsyz61J8XKiI',\r\n        title: 'Welcome to Notes, Dimas!',\r\n        body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',\r\n        createdAt: '2022-07-28T10:03:12.594Z',\r\n        archived: false,\r\n    },\r\n];\r\n\r\nconst notesContainer = document.getElementById('notes');\r\n\r\nfunction createNoteElement(note) {\r\n    const noteElement = document.createElement('div');\r\n    noteElement.className = 'note';\r\n    noteElement.id = note.id;\r\n    noteElement.innerHTML = `\r\n        <p class=\"note-content\">${note.title}</p>\r\n        <p class=\"note-body\">${note.body}</p>\r\n        <div class=\"note-actions\" style=\"display: block;\">\r\n            <button onclick=\"editNote('${note.id}')\">Edit</button>\r\n            <button onclick=\"deleteNote('${note.id}')\">Delete</button>\r\n        </div>\r\n        <small>${new Date(note.createdAt).toLocaleString()}</small>\r\n    `;\r\n    notesContainer.appendChild(noteElement);\r\n}\r\n\r\nfunction renderNotes() {\r\n    notesData.forEach(note => {\r\n        createNoteElement(note);\r\n    });\r\n}\r\n\r\nfunction showForm() {\r\n    var form = document.querySelector('.new-note-form');\r\n    if (form.style.display === 'none' || form.style.display === '') {\r\n        form.style.display = 'flex';\r\n    } else {\r\n        form.style.display = 'none';\r\n    }\r\n}\r\n\r\ndocument.getElementById('newNoteForm').addEventListener('submit', function (event) {\r\n    event.preventDefault();\r\n    var title = this.noteTitle.value;\r\n    var body = this.noteBody.value;\r\n    if (title.trim() !== '' && body.trim() !== '') {\r\n        const newNote = {\r\n            id: 'notes-' + Math.random().toString(36).substr(2, 9),\r\n            title: title,\r\n            body: body,\r\n            createdAt: new Date().toISOString(),\r\n            archived: false\r\n        };\r\n        notesData.push(newNote);\r\n        createNoteElement(newNote);\r\n        this.reset();\r\n        this.style.display = 'none';\r\n    }\r\n});\r\n\r\nfunction editNote(noteId) {\r\n    const noteToEdit = notesData.find(note => note.id === noteId);\r\n    const form = document.querySelector('.new-note-form');\r\n    form.style.display = 'flex';\r\n    form.noteTitle.value = noteToEdit.title;\r\n    form.noteBody.value = noteToEdit.body;\r\n    form.dataset.mode = 'edit';\r\n    form.dataset.noteId = noteId;\r\n}\r\n\r\ndocument.getElementById('newNoteForm').addEventListener('submit', function (event) {\r\n    event.preventDefault();\r\n    const title = this.noteTitle.value;\r\n    const body = this.noteBody.value;\r\n    const mode = this.dataset.mode;\r\n    const noteId = this.dataset.noteId;\r\n    const smallElement = this.querySelector('small');\r\n    if (smallElement) {\r\n        smallElement.remove();\r\n    }\r\n\r\n    if (noteId) {\r\n        const editedNote = notesData.find(note => note.id === noteId);\r\n        if (editedNote) {\r\n            editedNote.title = title;\r\n            editedNote.body = body;\r\n\r\n            notesContainer.innerHTML = '';\r\n            renderNotes();\r\n\r\n            this.reset();\r\n            this.style.display = 'none';\r\n            delete this.dataset.noteId;\r\n        }\r\n    } else {\r\n\r\n        if (title.trim() !== '' && body.trim() !== '') {\r\n            const newNote = {\r\n                id: 'notes-' + Math.random().toString(36).substr(2, 9),\r\n                title: title,\r\n                body: body,\r\n                createdAt: new Date().toISOString(),\r\n                archived: false\r\n            };\r\n            notesData.push(newNote);\r\n            createNoteElement(newNote);\r\n            this.reset();\r\n            this.style.display = 'none';\r\n        }\r\n    }\r\n});\r\n\r\nfunction deleteNote(noteId) {\r\n    const confirmDelete = confirm('Apakah Anda yakin ingin menghapus catatan ini?');\r\n    if (confirmDelete) {\r\n        const noteIndexToDelete = notesData.findIndex(note => note.id === noteId);\r\n        notesData.splice(noteIndexToDelete, 1);\r\n        const noteElementToDelete = document.getElementById(noteId);\r\n        noteElementToDelete.remove();\r\n    }\r\n}\r\n\r\nrenderNotes();\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;