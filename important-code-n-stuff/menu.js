class Menu extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <button>wipe save</button>
            <button>view dict</button>
            <button>return to index</button>
        `;
        
        this.querySelectorAll('button')[0].addEventListener('click', () => {
            wipeSave();
        });

        this.querySelectorAll('button')[1].addEventListener('click', () => {
            console.log(localStorage.getItem('dictionary'));
        });

        this.querySelectorAll('button')[2].addEventListener('click', () => {
            window.location.replace('./../../wizards-tower.html');
        });
    }
} customElements.define('menu-', Menu);