let notes = [];
let lastSavedTime = null;
let saveIntervalId = null;

document.addEventListener("DOMContentLoaded", () => {
    const titleEl = document.getElementById("app-title");
    const studentEl = document.getElementById("student-name");
    const timestampEl = document.getElementById("timestamp");
    const noteContainerEl = document.getElementById("note-container");
    const addNoteBtnEl = document.getElementById("add-note-btn");
    const backBtnEl = document.getElementById("back-btn");

    titleEl.textContent = MSG_APP_TITLE;
    studentEl.textContent = MSG_STUDENT_NAME;
    backBtnEl.textContent = MSG_BACK_TO_HOME;
    backBtnEl.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Load existing notes from localStorage and create Note objects
    const storedNotes = loadNotesFromStorage();
    storedNotes.forEach(stored => {
        createNoteUI(stored.id, stored.text, noteContainerEl);
    });

    // Add note button via OOP
    new AppButton(addNoteBtnEl, () => {
        const newId = Date.now().toString();
        createNoteUI(newId, "", noteContainerEl);
    });

    // Auto-save every 2 seconds
    saveIntervalId = setInterval(() => {
        saveNotesToStorage(notes);
        lastSavedTime = new Date();
        timestampEl.textContent = MSG_LAST_SAVED_PREFIX + formatTime(lastSavedTime);
    }, 2000);
});

function createNoteUI(id, text, container) {
    const wrapper = document.createElement("div");
    wrapper.className = "note";

    const textarea = document.createElement("textarea");
    textarea.value = text;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    wrapper.appendChild(textarea);
    wrapper.appendChild(removeBtn);
    container.appendChild(wrapper);

    const note = new Note(id, text, textarea, removeBtn);
    notes.push(note);

    note.attachEvents(
        (noteToRemove) => {
            container.removeChild(wrapper);
            notes = notes.filter(n => n.id !== noteToRemove.id);
            saveNotesToStorage(notes);
        },
        (noteChanged) => {
            // Just keep text in sync; periodic save will persist
            const idx = notes.findIndex(n => n.id === noteChanged.id);
            if (idx !== -1) {
                notes[idx].text = noteChanged.text;
            }
        }
    );
}