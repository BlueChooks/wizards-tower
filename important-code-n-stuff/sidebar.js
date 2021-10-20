// =====---------------------------------------------------------------------------------===== //
// =====----------------------------------- inventory -----------------------------------===== //
// =====---------------------------------------------------------------------------------===== //
let inventory = [ // keep untranslatable items at top
    {
        name: 'ash',
        translatable: false,
        ingredient: true,
        held: false
    },
    {
        name: 'feathers',
        translatable: true,
        ingredient: true,
        held: false
    },
    {
        name: 'cinnamon',
        translatable: true,
        ingredient: true,
        held: false
    },
    {
        name: 'insect wings',
        translatable: true,
        ingredient: true,
        held: false
    },
    {
        name: 'flowers',
        translatable: true,
        ingredient: true,
        held: false
    },
    {
        name: 'sugar',
        translatable: true,
        ingredient: true,
        held: false
    },
    {
        name: 'levitation potion',
        translatable: true,
        ingredient: false,
        held: false
    }
];

let sidebar = document.getElementById('sidebar');
sidebar.innerHTML = `
                    <h1 class="sidebar-heading">Inventory</h1>
                    <div id="inv"></div>
                    <h1 class="sidebar-heading">Notes</h1>
                    <textarea id="gen-notes" rows="20" cols="30">${localStorage.getItem('gen-notes') ? localStorage.getItem('gen-notes') : ''}</textarea>
                    <button id="reset">Reset Game</button>
                    `;

let inv = document.getElementById('inv');
let notepad = document.getElementById('gen-notes');

document.querySelector('#reset').addEventListener('click', () => {
    wipeSave();
    location.replace('reset.html');
});

notepad.addEventListener('keyup', () => {
    localStorage.setItem('gen-notes', notepad.value);
});

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

function getCurrentInv() {
    let currentInv = [];

    inventory.forEach(item => {
        if (item.held) {
            // currentInv += item;
            currentInv.push(item);
        }
    });

    return currentInv;
}

function getCurrentIngredients() {
    let currentIngredients = [];

    inventory.forEach(item => {
        if (item.held && item.ingredient) {
            currentIngredients.push(item);
        }
    });

    return currentIngredients;
}

function gainItem(name) { // changes given item held status to true
    if (!getItem(name).held) {
        getItem(name).held = true;
        saveInv();
        location.reload();
    }
}

function removeItem(name) { // changes given item held status to false
    getItem(name).held = false;
    saveInv();
    // location.reload();
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