const baseUrl = "https://notes-api.dicoding.dev/v2";
var notesData = [];

const notesContainer = document.getElementById("notes");
const loadingIndicator = document.querySelector(".loader");
const newNoteButton = document.getElementById("newNote");

newNoteButton.addEventListener("click", function () {
	var form = document.querySelector(".new-note-form");
	if (form.style.display === "none" || form.style.display === "") {
		form.style.display = "flex";
	} else {
		form.style.display = "none";
	}
});

function createNoteElement(note) {
	const noteElement = document.createElement("div");
	noteElement.className = "note";
	noteElement.id = note.id;
	const noteContent = `
      <p class="note-content">${note.title}</p>
      <p class="note-body">${note.body}</p>
      <div class="note-actions" style="display: block;">
          <button class="archive-button">Archive</button>
          <button class="delete-button">Delete</button>
      </div>
      <small>${new Date(note.createdAt).toLocaleString()}</small>
  `;
	noteElement.innerHTML = noteContent;
	notesContainer.appendChild(noteElement);

	noteElement
		.querySelector(".archive-button")
		.addEventListener("click", function () {
			archiveNote(note.id);
		});

	noteElement
		.querySelector(".delete-button")
		.addEventListener("click", function () {
			deleteNote(note.id);
		});
}

async function renderNotes() {
	loadingIndicator.style.display = "block";
	try {
		var apiUrl = baseUrl + "/notes";
		const response = await fetch(apiUrl);

		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}

		const data = await response.json();
		const notes = data.data;

		notes.forEach((note) => {
			notesData.push(note);
			createNoteElement(note);
		});
	} catch (error) {
		console.error("Error fetching data:", error.message);
	} finally {
		loadingIndicator.style.display = "none";
	}
}

document
	.getElementById("newNoteForm")
	.addEventListener("submit", async function (event) {
		event.preventDefault();
		var title = this.noteTitle.value;
		var body = this.noteBody.value;
		var mode = this.dataset.mode;
		if (mode) {
			return;
		}
		if (title.trim() !== "" && body.trim() !== "") {
			loadingIndicator.style.display = "block";
			try {
				var apiUrl = baseUrl + "/notes";
				const newNote = {
					title: title,
					body: body,
				};
				const response = await fetch(apiUrl, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newNote),
				});

				if (!response.ok) {
					throw new Error("Failed to post data");
				}

				const data = await response.json();
				createNoteElement(data.data);
				notesData.push(data.data);
				console.log("Response data:", data);
			} catch (error) {
				console.error("Error posting data:", error.message);
			} finally {
				loadingIndicator.style.display = "none";
				this.reset();
				this.style.display = "none";
			}
		}
	});

async function archiveNote(noteId) {
	const confirmArchive = confirm(
		"Apakah Anda yakin ingin mengarsip catatan ini?"
	);

	if (confirmArchive) {
		loadingIndicator.style.display = "block";
		try {
			var apiUrl = baseUrl + "/notes/" + noteId + "/archive";

			const response = await fetch(apiUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});

			if (!response.ok) {
				throw new Error("Failed to post data");
			}
		} catch (error) {
			console.error("Error:", error.message);
		} finally {
			loadingIndicator.style.display = "none";
		}

		const noteIndexToDelete = notesData.findIndex((note) => note.id === noteId);
		notesData.splice(noteIndexToDelete, 1);
		const noteElementToDelete = document.getElementById(noteId);
		noteElementToDelete.remove();
	}
}

async function deleteNote(noteId) {
	const confirmDelete = confirm(
		"Apakah Anda yakin ingin menghapus catatan ini?"
	);
	if (confirmDelete) {
		loadingIndicator.style.display = "block";
		try {
			var apiUrl = baseUrl + "/notes/" + noteId;

			const response = await fetch(apiUrl, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Failed to post data");
			}
		} catch (error) {
			console.error("Error:", error.message);
		} finally {
			loadingIndicator.style.display = "none";
		}

		const noteIndexToDelete = notesData.findIndex((note) => note.id === noteId);
		notesData.splice(noteIndexToDelete, 1);
		const noteElementToDelete = document.getElementById(noteId);
		noteElementToDelete.remove();
	}
}

const toggleModeButton = document.getElementById("toggleModeButton");

toggleModeButton.addEventListener("click", function (e) {
	const body = document.body;
  console.log('tes')
	body.classList.toggle("dark-mode");
  e.stopPropagation();
  e.preventDefault();
});

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  notesContainer.innerHTML = "";
  loadingIndicator.style.display = "block";
  
	const searchInput = document
		.getElementById("searchInput")
		.value.trim()
		.toLowerCase();
	const searchResults = notesData.filter((note) => {
		return (
			note.title.toLowerCase().includes(searchInput) ||
			note.body.toLowerCase().includes(searchInput)
		);
	});

	
  setTimeout(() => {
		searchResults.forEach((note) => {
			createNoteElement(note);
		});
		loadingIndicator.style.display = "none";
	}, 1000);
});



renderNotes();
