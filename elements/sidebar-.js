let items = [
    {
        name: 'levitation potion',
        translatable: true,
        held: true
    }
];

// contains inventory and general notes
class Sidebar extends HTMLElement {
    constructor() {
        super();
        // this.innerHTML = 'sidebar here';
        this.renderInventory();
    }

    renderInventory() {
        let inv = this.querySelector('.inv');
        inv.innerHTML = '';

        items.forEach(item => { // using just innerHTML might cause problems with removing item from inventory? or should I just re-render whole inventory on addition/removal?
            if (item.held) {
                if (item.translatable) {
                    inv.innerHTML += `<li><scribbles->${item.name}</scribbles-></li>`;
                } else {
                    inv.innerHTML += `<li>${item.name}</li>`
                }
            }
        });
    }
} customElements.define('sidebar-', Sidebar);