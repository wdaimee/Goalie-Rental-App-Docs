//base url to heroku api
const BASE_URL = "http://localhost:3000/api/"

/*-- Below Code for Arena Section --*/
/*-- Constants --*/


/*-- State Variables --*/
let arenaView, arenaShow, arenaE, arenaD, arenas;

/*-- Cached Elements --*/
//cached elements for get/create/show/put/delete sections
const arenaIndexViewEl = document.getElementById('arena-show');
const areanShowViewEl = document.getElementById('arena-show-single');
const arenaCreateViewEl = document.getElementById('arena-create');
const arenaEditViewEl = document.getElementById('arena-edit');
const arenaDeleteViewEl = document.getElementById('arena-delete');
//cached elements for sections that display JSON
const arenaListContainerIndexEl = document.querySelector('#arena-show section');
const arenaListContainerCreateEl = document.getElementById('sec-arena-create');
const arenaListContainerShowEl = document.getElementById('sec-arena-show');
const arenaListContainerEditEl = document.getElementById('sec-arena-edit');
const arenaListContainerDeleteEl = document.getElementById('sec-arena-delete');
//cached elements for input elements for adding/editing/querying/etc.
const arenaCreateInputEls = document.querySelectorAll('#arena-create input')
const arenaShowInputEl = document.querySelectorAll('#arena-show-single input');
const arenaEditInputEl = document.querySelectorAll('#arena-edit input');
const arenaDeleteInputEl = document.querySelectorAll('#arena-delete input');

/*-- Event Listeners --*/

//when hide button is pressed
document.getElementById('btn-arena-hide')
.addEventListener('click', arenaInit);

//when get button is pressed
document.getElementById('btn-arena-index')
.addEventListener('click', arenaGetAll);

//when add an arena button is pressed to show the CREATE form
document.getElementById('btn-arena-post')
.addEventListener('click', function() {
    arenaView = 'create';
    arenaRender();
});

//when add arena button is pressed within the CREATE section
document.getElementById('btn-add-arena')
.addEventListener('click', addArena);

//when the show button is pressed
document.getElementById('btn-arena-show')
.addEventListener('click', function() {
    arenaView = 'show';
    arenaRender();
});

//when the get arean button inside the show view is pressed
document.getElementById('btn-get-arena')
.addEventListener('click', arenaGetOne);

//when the PUT button is pressed to show the EDIT form
document.getElementById('btn-arena-edit')
.addEventListener('click', function() {
    arenaView = 'edit';
    arenaRender();
});

//when the edit arena button is pressed within the PUT section
document.getElementById('btn-edit-arena')
.addEventListener('click', arenaEdit);

//when the DELETE button is pressed to show the DELETE form
document.getElementById('btn-arena-delete')
.addEventListener('click', function() {
    arenaView = 'delete'
    arenaRender();
});

//when the DELETE ARENA button is pressed inside the DELETE form
document.getElementById('btn-delete-one-arena')
.addEventListener('click', arenaDelete);

/*-- Functions --*/

arenaInit();

//initial view of arena section
async function arenaInit() {
    arenaView = 'hide';
    arenaRender();
}

//async function to get a list of arenas 
async function arenaGetAll() {
    arenaView = 'index';
    arenas = await fetch(BASE_URL + 'arenas')
    .then(res => res.json());
    arenaRender();
}

//async function for adding an arena
async function addArena() {
    if(arenaCreateInputEls[0].value) {
        let newArena = await fetch(BASE_URL + 'arenas', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: arenaCreateInputEls[0].value,
                city: arenaCreateInputEls[1].value,
                address: arenaCreateInputEls[2].value
            })
        }).then(res => res.json())
        let html = JSON.stringify(newArena);
        arenaListContainerCreateEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`
        arenaCreateInputEls[0].value = arenaCreateInputEls[1].value = arenaCreateInputEls[2].value = '';
    }
}

//async function for getting one arena
async function arenaGetOne() {
    if(arenaShowInputEl[0].value) {
        arenaShow = await fetch(BASE_URL + 'arenas/' + arenaShowInputEl[0].value)
        .then(res => res.json());
    }
    let html = JSON.stringify(arenaShow);
    arenaListContainerShowEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
    render();
    arenaShowInputEl[0].value = '';
}

//async function for editing an arena
async function arenaEdit() {
    if(arenaEditInputEl[0].value) {
        let arena = {};
        if(arenaEditInputEl[1].value) {
            arena.name = arenaEditInputEl[1].value;
        }
        if(arenaEditInputEl[2].value) {
            arena.city = arenaEditInputEl[2].value;
        }
        if(arenaEditInputEl[3].value) {
            arena.address = arenaEditInputEl[3].value;
        }
        arenaE = await fetch(BASE_URL + 'arenas/' + arenaEditInputEl[0].value, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(arena)
        }).then(res => res.json())
    }
    let html = JSON.stringify(arenaE);
    arenaListContainerEditEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
    arenaEditInputEl[0].value = arenaEditInputEl[1].value = arenaEditInputEl[2].value = arenaEditInputEl[3].value = '';
}

//function for deleting an arena
async function arenaDelete() {
    if(arenaDeleteInputEl[0]) {
        arenaD = await fetch(BASE_URL + 'arenas/' + arenaDeleteInputEl[0].value, {
            method: 'DELETE'
        }).then(res => res.json())
    }
    let html = JSON.stringify(arenaD);
    arenaListContainerDeleteEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
    arenaDeleteInputEl[0].value = '';
}

//render function for arena section
function arenaRender() {
    arenaIndexViewEl.style.display = 
        arenaView === 'index' ? 'block' : 'none';
    arenaCreateViewEl.style.display = 
        arenaView === 'create' ? 'block' : 'none';
    areanShowViewEl.style.display = 
        arenaView === 'show' ? 'block' : 'none';
    arenaEditViewEl.style.display =
        arenaView === 'edit' ? 'block' : 'none';
    arenaDeleteViewEl.style.display = 
        arenaView === 'delete' ? 'block' : 'none';
    if (arenaView === 'index') {
        let html = JSON.stringify(arenas);
        arenaListContainerIndexEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
    }
}

/*-- Below Code for User Section --*/
