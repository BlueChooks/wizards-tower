class Menu extends HTMLElement {
    constructor() {
        super();
        this.classList.add('hidden');
        this.innerHTML = `
            <button>Reset</button>
        `;
        // this.innerHTML = `
        //     <button>wipe save</button>
        //     <button>view dict</button>
        //     <button>give ash</button>
        //     <button>give feathers</button>
        //     <button>give insect wings</button>
        // `;
        
        // this.querySelectorAll('button')[0].addEventListener('click', () => {
        //     wipeSave();
        // });

        // this.querySelectorAll('button')[1].addEventListener('click', () => {
        //     console.log(localStorage.getItem('dictionary'));
        // });

        // this.querySelectorAll('button')[2].addEventListener('click', () => {
        //     gainItem('ash');
        // });

        // this.querySelectorAll('button')[3].addEventListener('click', () => {
        //     gainItem('feathers');
        // });

        // this.querySelectorAll('button')[4].addEventListener('click', () => {
        //     gainItem('insect wings');
        // });
    }
} customElements.define('menu-', Menu);