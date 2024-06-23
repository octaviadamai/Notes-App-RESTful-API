
class CustomHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header>
          <h1>Welcome to My Notes</h1>
        </header>
      `;
    }
  }
  

  class CustomFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <footer>
          <p>&copy; 2024 My Notes App</p>
        </footer>
      `;
    }
  }
  class NoteCounter extends HTMLElement {
    constructor(notesData) {
        super();
        this.render(0);
        document.addEventListener('updateNoteCounter', () => {
            this.updateCount(notesData.length);
        });
    }

    render(count) {
        this.innerHTML = `Total Notes: ${count}`;
    }

    updateCount(count) {
        this.render(count);
    }
}


  
  customElements.define('custom-header', CustomHeader);
  customElements.define('custom-footer', CustomFooter);
  customElements.define('note-counter', NoteCounter);

  