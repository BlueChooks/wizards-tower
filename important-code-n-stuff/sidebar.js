// =====---------------------------------------------------------------------------------===== //
// =====----------------------------------- inventory -----------------------------------===== //
// =====---------------------------------------------------------------------------------===== //
let inventory = [
    {
        name: 'feathers',
        translatable: true,
        held: false
    },
    {
        name: 'ash',
        translatable: true,
        held: false
    },
    {
        name: 'insect wings',
        translatable: true,
        held: false
    },
    {
        name: 'levitation potion',
        translatable: true,
        held: false
    }
];

let sidebar = document.getElementById('sidebar');
sidebar.innerHTML = '<div id="inv"></div><textarea id="gen-notes" rows="20" cols="30"></textarea>';

let inv = document.getElementById('inv');
let notepad = document.getElementById('gen-notes');

if (localStorage.getItem('inventory')) { // load inventory from local storage
    loadInv();
    // TODO: update sidebar
}

renderInventory();









// =====----- utilities -----===== //
function getItem(name) { // returns the item in inventory[] with corresponding name
    return inventory.filter(item => {
        return item.name === name;
    })[0];
}

function gainItem(name) { // changes given item held status to true
    getItem(name).held = true;
    saveInv();
    location.reload();
}

function removeItem(name) { // changes given item held status to false
    getItem(name).held = false;
    saveInv();
    location.reload();
}

function renderInventory() { // populates inventory panel with held items. this function is a mess
    inventory.forEach(item => {
        if (item.held) {
            if (item.translatable) {
                let scrib = new Scribbles;
                scrib.innerText = item.name;
                scrib.classList.add('inv-item'); // make sure to reference held items by class
                inv.appendChild(scrib);
                scrib.initialProcessing();
                // this.inv.innerHTML += `<li><scribbles->${item.name}</scribbles-></li>`; // caused it to read the tags as text for some reason
            } else {
                inv.innerHTML += `<span class="inv-item">${item.name}</span>`;
            }
        }
    });
}

// =====----- saving -----===== //
function saveInv() { // adds inventory as-is to local storage
    localStorage.setItem('inventory', JSON.stringify(inventory));
}

function loadInv() { // parses local storage to inventory
    inventory = JSON.parse(localStorage.getItem('inventory'));
}










// =====---------------------------------------------------------------------------------===== //
// =====---------------------------------- item-pickup ----------------------------------===== //
// =====---------------------------------------------------------------------------------===== //
class ItemPickup extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('click', e => {
            if (!e.target.parentElement.classList.contains('notepad')) {
                gainItem(this.getAttribute('item'));
            }
        });
    }
} customElements.define('item-pickup', ItemPickup);