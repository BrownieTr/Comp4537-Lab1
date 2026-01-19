const STORAGE_KEY_NOTES = "lab1_notes";

class Note {
    constructor(id, text, textareaElement, removeButtonElement) {
        this.id = id;
        this.text = text;
        this.textareaElement = textareaElement;
        this.removeButtonElement = removeButtonElement;
    }

    attachEvents(onRemoveCallback, onChangeCallback) {
        this.textareaElement.addEventListener("input", () => {
            this.text = this.textareaElement.value;
            onChangeCallback(this);
        });

        this.removeButtonElement.addEventListener("click", () => {
            onRemoveCallback(this);
        });
    }
}

// Optional button class to satisfy “buttons via OOP” requirement
class AppButton {
    constructor(element, onClick) {
        this.element = element;
        this.element.addEventListener("click", onClick);
    }
}

function loadNotesFromStorage() {
    const json = localStorage.getItem(STORAGE_KEY_NOTES);
    if (!json) {
        return [];
    }
    try {
        const arr = JSON.parse(json);
        return Array.isArray(arr) ? arr : [];
    } catch {
        return [];
    }
}

function saveNotesToStorage(notesArray) {
    const plain = notesArray.map(n => ({ id: n.id, text: n.text }));
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(plain));
}

function formatTime(date) {
    return date.toLocaleTimeString();
}

// Initialize index.html text
document.addEventListener("DOMContentLoaded", () => {
    const titleEl = document.getElementById("app-title");
    const studentEl = document.getElementById("student-name");
    const writerLinkEl = document.getElementById("writer-link");
    const readerLinkEl = document.getElementById("reader-link");

    if (titleEl) titleEl.textContent = MSG_APP_TITLE;
    if (studentEl) studentEl.textContent = MSG_STUDENT_NAME;
    if (writerLinkEl) writerLinkEl.textContent = MSG_WRITER_LINK;
    if (readerLinkEl) readerLinkEl.textContent = MSG_READER_LINK;
});