// =====---------------------------------------------------------------------------------===== //
// =====---------------------------------- dictionary -----------------------------------===== //
// =====---------------------------------------------------------------------------------===== //
let dictionary = [
    {
        eng: 'orange1',
        scribble: 'orange',
        userTrans: 'orange',
        userNotes: ''
    },
    {
        eng: 'text1',
        scribble: 'text',
        userTrans: 'text',
        userNotes: ''
    },
    {
        eng: 'great',
        scribble: 'jpile',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'throne',
        scribble: 'bqsizr',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'room',
        scribble: 'azzp',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'swift',
        scribble: 'zasrt',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'water',
        scribble: 'bnver',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'river',
        scribble: 'jshcj',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'blue',
        scribble: 'psmp',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'feathers',
        scribble: 'pxatjxim',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'ash',
        scribble: 'xaz',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'insect',
        scribble: 'gvbwzu',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'wings',
        scribble: 'qzlnd',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'potion',
        scribble: 'icmxcz',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'levitation',
        scribble: 'awcvumuvptr',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'bed',
        scribble: 'ual',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'recipes',
        scribble: 'paxfnay',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'ingredients',
        scribble: 'vbfqivqbp',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'colour',
        scribble: 'wuburm',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'effects',
        scribble: 'caacpqb',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'flowers',
        scribble: 'yclpqbua',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'sugar',
        scribble: 'azlid',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'cinnamon',
        scribble: 'bovvwmtx',
        userTrans: '',
        userNotes: ''
    },
    {
        eng: 'brief',
        scribble: 'ybqox',
        userTrans: '',
        userNotes: ''
    }
];

if (localStorage.getItem('dictionary')) {
    loadDict();
    updateWords();
}

// =====----- utilities -----===== //
function updateEntry(eng, trans, notes) {
    let entry = getEntry(eng);
    entry.userTrans = trans;
    entry.userNotes = notes;

    updateWords();

    saveDict();
}

function updateWords() { // upadate all <w-> tags
    document.querySelectorAll('w-').forEach(w => {
        w.updateContent();
    });
}

function getEntry(word) {
    return dictionary.filter(w => {
        return w.eng === word;
    })[0];
}

// =====----- saving -----===== //
function saveDict() {
    localStorage.setItem('dictionary', JSON.stringify(dictionary));
}

function loadDict() {
    dictionary = JSON.parse(localStorage.getItem('dictionary'));
}

function wipeSave() {
    localStorage.clear();
    location.reload();
}









// =====----------------------------------------------------------------------------===== //
// =====----------------------------------- word -----------------------------------===== //
// =====----------------------------------------------------------------------------===== //
class Word extends HTMLElement {
    constructor() {
        super();
        this.entry;
    }
    
    connectedCallback() {
        // this.entry = getEntry(this.querySelector('span').innerHTML); //
        this.entry = getEntry(this.innerText); //
        this.addNotepad();
        this.updateContent();

        this.addEventListener('mouseenter', () => {
            this.classList.add('visible-pad');
            // this.updateContent();
        });

        this.addEventListener('mouseleave', () => this.classList.remove('visible-pad'));
    }

    updateContent() { // updates the visible content of this <w-> based on current state of dictionary
        if (this.entry.userTrans !== '') {
            this.querySelector('span').innerHTML = this.entry.userTrans;
            this.querySelector('input').value = this.entry.userTrans;
            this.classList.remove('untrans');
        } else {
            this.querySelector('span').innerHTML = this.entry.scribble;
            this.classList.add('untrans');
        }

        if (this.entry.userNotes !== '') {
            this.querySelector('textarea').innerHTML = this.entry.userNotes;
        }
    }

    addNotepad() {
        let notepad = `
            <div class="notepad">
                <h1 class="untrans">${this.entry.scribble}</h1>
                <input type="text" value="${this.entry.userTrans !== '' ? this.entry.userTrans : ''}" placeholder="your translation" />
                <p>Notes</p>
                <textarea placeholder="notes" rows="10" cols="30">${this.entry.userNotes !== '' ? this.entry.userNotes : ''}</textarea>
            </div>
        `;

        this.innerHTML += notepad;

        this.querySelector('.notepad').addEventListener('keyup', () => {
            updateEntry(this.entry.eng, this.querySelector('input').value, this.querySelector('textarea').value);
        });
    }

} customElements.define('w-', Word);









// =====---------------------------------------------------------------------------------===== //
// =====----------------------------------- scribbles -----------------------------------===== //
// =====---------------------------------------------------------------------------------===== //
class Scribbles extends HTMLElement {
    constructor() {
        super();
        this.initialProcessing();
    }

    initialProcessing() {
        // read innerHTML and split into word array
        let separated = this.innerText.split(' ');
        this.innerHTML = '';
        separated.forEach(word => {
            let newWord = new Word;
            newWord.innerHTML = `<span>${word}</span>`;
            this.appendChild(newWord);
        });
    }

} customElements.define('scribbles-', Scribbles);









// =====--------------------------------------------------------------------------------===== //
// =====----------------------------------- page-nav -----------------------------------===== //
// =====--------------------------------------------------------------------------------===== //

