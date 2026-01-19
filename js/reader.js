// js/reader.js
// ChatGPT was used as a coding assistant for this file and this assignment.

"use strict";

let lastRetrievedTime = null;
let retrieveIntervalId = null;

document.addEventListener("DOMContentLoaded", () => {
    const titleEl = document.getElementById("app-title");
    const studentEl = document.getElementById("student-name");
    const timestampEl = document.getElementById("timestamp");
    const noteContainerEl = document.getElementById("note-container");
    const backBtnEl = document.getElementById("back-btn");

    titleEl.textContent = MSG_APP_TITLE;
    studentEl.textContent = MSG_STUDENT_NAME;
    backBtnEl.textContent = MSG_BACK_TO_HOME;
    backBtnEl.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    function renderNotes() {
        const storedNotes = loadNotesFromStorage();
        noteContainerEl.innerHTML = "";

        if (storedNotes.length === 0) {
            const p = document.createElement("p");
            p.textContent = MSG_NO_NOTES;
            noteContainerEl.appendChild(p);
        } else {
            storedNotes.forEach(n => {
                const wrapper = document.createElement("div");
                wrapper.className = "note";

                const textarea = document.createElement("textarea");
                textarea.value = n.text;
                textarea.readOnly = true;

                wrapper.appendChild(textarea);
                noteContainerEl.appendChild(wrapper);
            });
        }

        lastRetrievedTime = new Date();
        timestampEl.textContent = MSG_LAST_RETRIEVED_PREFIX + formatTime(lastRetrievedTime);
    }

    // Initial render
    renderNotes();

    // Retrieve every 2 seconds
    retrieveIntervalId = setInterval(renderNotes, 2000);

    // Optional: also react to storage events (same browser, other tab)
    window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEY_NOTES) {
            renderNotes();
        }
    });
});