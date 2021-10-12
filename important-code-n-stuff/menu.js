class Menu extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <button>wipe save</button>
            <button>view dict</button>
        `;
        
        this.querySelectorAll('button')[0].addEventListener('click', () => {
            wipeSave();
        });

        this.querySelectorAll('button')[1].addEventListener('click', () => {
            console.log(localStorage.getItem('dictionary'));
        });
    }
} customElements.define('menu-', Menu);