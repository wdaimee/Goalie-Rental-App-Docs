//base url to heroku api
const BASE_URL = "https://goalie-rental-app.herokuapp.com/api/"

/*-- Below Code for Arena Section --*/
/*-- Constants --*/


/*-- State Variables --*/
let arenaView;

/*-- Cached Elements --*/
const arenaIndexViewEl = document.getElementById('arena-show');
const arenaCreateViewEl = document.getElementById('arena-create');
const arenaListContainerIndexEl = document.querySelector('#arena-show section');
const arenaListContainerCreateEl = document.getElementById('sec-arena-create');
const arenaCreateInputEls = document.querySelectorAll('#arena-create input')


/*-- Event Listeners --*/

//when hide button is pressed
document.getElementById('btn-arena-hide')
.addEventListener('click', arenaInit);

//when get button is pressed
document.getElementById('btn-arena-index')
.addEventListener('click', arenaGetAll);

//when add an arena button is pressed
document.getElementById('btn-arena-post')
.addEventListener('click', function() {
    arenaView = 'create';
    arenaRender();
});

//when add arena button is pressed
document.getElementById('btn-add-arena')
.addEventListener('click', addArena);

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
    console.log(arenas);
    arenaRender();
}

//async function for adding an arena
async function addArena() {
    if (arenaCreateInputEls[0].value) {
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
        arenaCreateInputEls[0] = arenaCreateInputEls[1] = arenaCreateInputEls[2] = '';
    }
}

//render function for arena section
function arenaRender() {
    arenaIndexViewEl.style.display = 
        arenaView === 'index' ? 'block' : 'none';
    arenaCreateViewEl.style.display = 
        arenaView === 'create' ? 'block' : 'none';
    if (arenaView === 'index') {
        let html = JSON.stringify(arenas);
        // let html = arenas.reduce((html, arena) => html + 
        // `<div>${arena}</div>`, '');
        arenaListContainerIndexEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
    }
}


