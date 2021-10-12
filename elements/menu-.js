class Menu extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = 'menu here';
        console.log('menu');
    }
} customElements.define('menu-', Menu);