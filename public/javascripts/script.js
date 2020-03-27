//base url to heroku api
const BASE_URL = 'http://localhost:3000/api/';

/*-- Below Code for Arena Section --*/
/*-- Constants --*/


/*-- State Variables --*/
let arenaView, arenaShow, arenaE, arenaD, arenas;

/*-- Cached Elements --*/
//cached elements for get/create/show/put/delete sections
const arenaIndexViewEl = document.getElementById('arena-show');
const arenaShowViewEl = document.getElementById('arena-show-single');
const arenaCreateViewEl = document.getElementById('arena-create');
const arenaEditViewEl = document.getElementById('arena-edit');
const arenaDeleteViewEl = document.getElementById('arena-delete');
//cached elements for sections that display JSON
const arenaListContainerIndexEl = document.querySelector('#arena-show pre');
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
    arenaShowViewEl.style.display = 
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

/*-- Constants --*/


/*-- State Variables --*/
let userView, userShow, userE, userD, users, is_goalie;

/*-- Cached Elements --*/
//cached elements for get/create/show/put/delete sections
const userIndexViewEl = document.getElementById('user-show');
const userShowViewEl = document.getElementById('user-show-single');
const userCreateViewEl = document.getElementById('user-create');
const userEditViewEl = document.getElementById('user-edit');
const userDeleteViewEl = document.getElementById('user-delete');
//cached elements for sections that display JSON
const userListContainerIndexEl = document.querySelector('#user-show pre');
const userListContainerCreateEl = document.getElementById('sec-user-create');
const userListContainerShowEl = document.getElementById('sec-user-show');
const userListContainerEditEl = document.getElementById('sec-user-edit');
const userListContainerDeleteEl = document.getElementById('sec-user-delete');
//cached elements for input elements for adding/editing/querying/etc.
const userCreateInputEls = document.querySelectorAll('#user-create input')
const userShowInputEl = document.querySelectorAll('#user-show-single input');
const userEditInputEl = document.querySelectorAll('#user-edit input');
const userDeleteInputEl = document.querySelectorAll('#user-delete input');

/*-- Event Listeners --*/

//when hide button is pressed
document.getElementById('btn-user-hide')
.addEventListener('click', userInit);

//when get button is pressed
document.getElementById('btn-user-index')
.addEventListener('click', userGetAll);

//when add an user button is pressed to show the CREATE form
document.getElementById('btn-user-post')
.addEventListener('click', function() {
    userView = 'create';
    userRender();
});

//when add user button is pressed within the CREATE section
document.getElementById('btn-add-user')
.addEventListener('click', addUser);

//when the show button is pressed
document.getElementById('btn-user-show')
.addEventListener('click', function() {
    userView = 'show';
    userRender();
});

//when the get user button inside the show view is pressed
document.getElementById('btn-get-user')
.addEventListener('click', userGetOne);

//when the PUT button is pressed to show the EDIT form
document.getElementById('btn-user-edit')
.addEventListener('click', function() {
    userView = 'edit';
    userRender();
});

//when the edit user button is pressed within the PUT section
document.getElementById('btn-edit-user')
.addEventListener('click', userEdit);

//when the DELETE button is pressed to show the DELETE form
document.getElementById('btn-user-delete')
.addEventListener('click', function() {
    userView = 'delete';
    userRender();
});

//when the DELETE USER button is pressed inside the DELETE form
document.getElementById('btn-delete-one-user')
.addEventListener('click', userDelete);

/*-- Functions --*/

userInit();

//initial view of user section
async function userInit() {
    userView = 'hide';
    userRender();
}

//async function to get a list of users
async function userGetAll() {
    userView = 'index';
    users = await fetch(BASE_URL + 'users')
    .then(res => res.json());
    userRender();
}

//async function for adding a user
async function addUser() {
    if(userCreateInputEls[0].value) {
        let user = {};
        user.name = userCreateInputEls[0].value;
        user.email = userCreateInputEls[1].value;
        user.phone_num = userCreateInputEls[2].value;
        user.age = userCreateInputEls[3].value;
        if(userCreateInputEls[4] === 'yes') {
            user.goalie = true;
        }
        else {
            user.goalie = false;
        }
        if(userCreateInputEls[5].value) {
            user.sport = userCreateInputEls[5].value.split(/\s*[\s,]\s*/);
            console.log(user.sport);
        }
        if(userCreateInputEls[6].value) {
            user.skill_level = userCreateInputEls[6].value;
        }
        let newUser = await fetch(BASE_URL + 'users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }).then(res => res.json())
        let html = JSON.stringify(newUser);
        userListContainerCreateEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`
        userCreateInputEls[0].value = userCreateInputEls[1].value = userCreateInputEls[2].value = userCreateInputEls[3].value = userCreateInputEls[4].value = userCreateInputEls[5].value = userCreateInputEls[6].value = '';
    }
}

//async function for getting one user
async function userGetOne() {
    if(userShowInputEl[0].value) {
        userShow = await fetch(BASE_URL + 'users/' + userShowInputEl[0].value)
        .then(res => res.json());
    }
    let html = JSON.stringify(userShow);
    userListContainerShowEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
    userShowInputEl[0].value = '';
}

//async function for editing an user
async function userEdit() {
    if(userEditInputEl[0].value) {
        let user = {};
        if(userEditInputEl[1].value) {
            user.name = userEditInputEl[1].value;
        }
        if(userEditInputEl[2].value) {
            user.email = userEditInputEl[2].value;
        }
        if(userEditInputEl[3].value) {
            user.phone_num = userEditInputEl[3].value;
        }
        if(userEditInputEl[4].value) {
            user.age = userEditInputEl[4].value;
        }
        if(userEditInputEl[5].value){
            if(userEditInputEl[5].value === 'yes') {
                user.goalie = true;
            }
            else {
                user.goalie = false;
            }
        }
        if(userEditInputEl[6].value) {
            user.sport = userEditInputEl[6].value.split(/\s*[\s,]\s*/);
        }
        if(userEditInputEl[7].value) {
            user.skill_level = userEditInputEl[7].value;
        }
        userE = await fetch(BASE_URL + 'users/' + userEditInputEl[0].value, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }).then(res => res.json())
    }
    let html = JSON.stringify(userE);
    userListContainerEditEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
    userEditInputEl[0].value = userEditInputEl[1].value = userEditInputEl[2].value = userEditInputEl[3].value = userEditInputEl[4].value = userEditInputEl[5].value = userEditInputEl[6].value = userEditInputEl[7].value = '';
}

//function for deleting a user
async function userDelete() {
    if(userDeleteInputEl[0]) {
        userD = await fetch(BASE_URL + 'users/' + userDeleteInputEl[0].value, {
            method: 'DELETE'
        }).then(res => res.json())
    }
    let html = JSON.stringify(userD);
    userListContainerDeleteEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
    userDeleteInputEl[0].value = '';
}

//render function for user section
function userRender() {
    userIndexViewEl.style.display = 
        userView === 'index' ? 'block' : 'none';
    userCreateViewEl.style.display = 
        userView === 'create' ? 'block' : 'none';
    userShowViewEl.style.display = 
        userView === 'show' ? 'block' : 'none';
    userEditViewEl.style.display =
        userView === 'edit' ? 'block' : 'none';
    userDeleteViewEl.style.display = 
        userView === 'delete' ? 'block' : 'none';
    if (userView === 'index') {
        let html = JSON.stringify(users);
        userListContainerIndexEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
    }
}

/*-- Below Code for Review Section --*/
/*-- Constants --*/


/*-- State Variables --*/
let reviewView, reviewShow, reviewD, reviews;

/*-- Cached Elements --*/
//cached elements for get/create/show/put/delete sections
const reviewShowViewEl = document.getElementById('review-show-single');
const reviewCreateViewEl = document.getElementById('review-create');
const reviewDeleteViewEl = document.getElementById('review-delete');
//cached elements for sections that display JSON
const reviewListContainerCreateEl = document.getElementById('sec-review-create');
const reviewListContainerShowEl = document.getElementById('sec-review-show');
const reviewListContainerDeleteEl = document.getElementById('sec-review-delete');
//cached elements for input elements for adding/editing/querying/etc.
const reviewCreateInputEls = document.querySelectorAll('#review-create input')
const reviewShowInputEl = document.querySelectorAll('#review-show-single input');
const reviewDeleteInputEl = document.querySelectorAll('#review-delete input');

/*-- Event Listeners --*/

//when hide button is pressed
document.getElementById('btn-review-hide')
.addEventListener('click', reviewInit);

//when add a review button is pressed to show the CREATE form
document.getElementById('btn-review-post')
.addEventListener('click', function() {
    reviewView = 'create';
    reviewRender();
});

//when add review button is pressed within the CREATE section
document.getElementById('btn-add-review')
.addEventListener('click', addReview);

//when the show button is pressed
document.getElementById('btn-review-show')
.addEventListener('click', function() {
    reviewView = 'show';
    reviewRender();
});

//when the get review button inside the show view is pressed
document.getElementById('btn-get-review')
.addEventListener('click', reviewGetOne);

//when the DELETE button is pressed to show the DELETE form
document.getElementById('btn-review-delete')
.addEventListener('click', function() {
    reviewView = 'delete'
    reviewRender();
});

//when the DELETE REVIEW button is pressed inside the DELETE form
document.getElementById('btn-delete-one-review')
.addEventListener('click', reviewDelete);

/*-- Functions --*/

reviewInit();

//initial view of review section
async function reviewInit() {
    reviewView = 'hide';
    reviewRender();
}

//async function for adding a review
async function addReview() {
    if(reviewCreateInputEls[1].value) {
        let newReview = await fetch(BASE_URL + 'users/' + reviewCreateInputEls[1] + '/reviews', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                review_by: reviewCreateInputEls[0].value,
                user_reviewed: reviewCreateInputEls[1].value,
                content: reviewCreateInputEls[2].value,
                rating: reviewCreateInputEls[3].value
            })
        }).then(res => res.json())
        let html = JSON.stringify(newReview);
        reviewListContainerCreateEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`
        reviewCreateInputEls[0].value = reviewCreateInputEls[1].value = reviewCreateInputEls[2].value = reviewCreateInputEls[3].value = '';
    }
}

//async function for getting all reviews for a user
async function reviewGetOne() {
    if(reviewShowInputEl[0].value) {
        reviewShow = await fetch(BASE_URL + 'users/' + reviewShowInputEl[0].value + '/reviews')
        .then(res => res.json());
    }
    let html = JSON.stringify(reviewShow);
    reviewListContainerShowEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
    reviewShowInputEl[0].value = '';
}

//function for deleting an review
async function reviewDelete() {
    if(reviewDeleteInputEl[0].value) {
        reviewD = await fetch(BASE_URL + 'users/reviews/' + reviewDeleteInputEl[0].value, {
            method: 'DELETE'
        }).then(res => res.json())
    }
    let html = JSON.stringify(reviewD);
    reviewListContainerDeleteEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
    reviewDeleteInputEl[0].value = '';
}

//render function for review section
function reviewRender() {
    reviewCreateViewEl.style.display = 
        reviewView === 'create' ? 'block' : 'none';
    reviewShowViewEl.style.display = 
        reviewView === 'show' ? 'block' : 'none';
    reviewDeleteViewEl.style.display = 
        reviewView === 'delete' ? 'block' : 'none';
}

/*-- Below Code for Game Section --*/
/*-- Constants --*/


/*-- State Variables --*/
let gameView, gamesAll, gamesAllOpen, gameShow, gameRequest, gameGoalie, gameAddGoalie, gameConfirm;

/*-- Cached Elements --*/
//cached elements for get/create/show/put/delete sections
const gameAllViewEl = document.getElementById('game-all');
const gameAllOpenViewEl = document.getElementById('game-all-open');
const gameShowViewEl = document.getElementById('game-show');
const gameRequestsViewEl = document.getElementById('game-requests');
const gameGoalieViewEl = document.getElementById('game-goalie');
const gameCreateViewEl = document.getElementById('game-create');
const gameAddGoalieViewEl = document.getElementById('game-add-goalie');
const gameConfirmViewEl = document.getElementById('game-confirm');
// const reviewDeleteViewEl = document.getElementById('review-delete');
//cached elements for sections that display JSON
const gameListContainerAllGamesEl = document.querySelector('#game-all pre');
const gameListContainerAllOpenEl = document.querySelector('#game-all-open pre');
const gameListContainerShowEl = document.querySelector('#game-show pre');
const gameListContainerRequestEl = document.querySelector('#game-requests pre');
const gameListContainerGoalieEl = document.querySelector('#game-goalie pre');
const gameListContainerCreateEl = document.querySelector('#game-create pre');
const gameListContainerAddGoalieEl = document.querySelector('#game-add-goalie pre');
const gameListContainerConfirmEl = document.querySelector('#game-confirm pre');
// const gameListContainerDeleteEl = document.getElementById('sec-review-delete');
//cached elements for input elements for adding/editing/querying/etc.
const gameShowInputEl = document.querySelectorAll('#game-show input');
const gameRequestInputEl = document.querySelectorAll('#game-requests input');
const gameGoalieInputEl = document.querySelectorAll('#game-goalie input');
const gameCreateInputEl = document.querySelectorAll('#game-create input');
const gameAddGoalieInputEl = document.querySelectorAll('#game-add-goalie input');
const gameConfirmInputEl = document.querySelectorAll('#game-confirm input');
// const reviewDeleteInputEl = document.querySelectorAll('#review-delete input');

/*-- Event Listeners --*/

//when hide button is pressed
document.getElementById('btn-game-hide')
.addEventListener('click', gameInit);

//when get all games button is pressed
document.getElementById('btn-game-all')
.addEventListener('click', gameGetAll);

//when the all open games button is pressed
document.getElementById('btn-game-all-open')
.addEventListener('click', gameGetAllOpen);

//when the show button is pressed
document.getElementById('btn-game-show')
.addEventListener('click', function() {
    gameView = 'show';
    gameRender();
});

//when the get details button inside the show view is pressed
document.getElementById('btn-show-game')
.addEventListener('click', gameGetOne);

//when the GET-Requests button is pressed
document.getElementById('btn-game-request')
.addEventListener('click', function() {
    gameView = 'request';
    gameRender();
});

//when the get request button is pressed in side the GET-REQUEST view
document.getElementById('btn-request-game')
.addEventListener('click', gameRequestFunc);

//when the GET-Goalie request button is pressed
document.getElementById('btn-game-goalie')
.addEventListener('click', function() {
    gameView = 'goalie';
    gameRender();
});

//when the get request button is pressed in side the GET-GOALIE view
document.getElementById('btn-goalie-game')
.addEventListener('click', gameGoalieFunc);

//when create button is pressed to show the CREATE form
document.getElementById('btn-game-create')
.addEventListener('click', function() {
    gameView = 'create';
    gameRender();
});

//when add game button is pressed within the CREATE section
document.getElementById('btn-add-game')
.addEventListener('click', gameCreate);

//when the add goalie button is pressed to show the form
document.getElementById('btn-game-add-goalie')
.addEventListener('click', function() {
    gameView = "add-goalie";
    gameRender();
});

//when the add goalie button is pressed within the ADD GOALIE form
document.getElementById('btn-add-goalie-game')
.addEventListener('click', gameAddGoalieFunc)

//when the confirm goalie button is pressed to show the form
document.getElementById('btn-game-confirm-goalie')
.addEventListener('click', function() {
    gameView = "confirm";
    gameRender();
});

document.getElementById('btn-confirm-game')
.addEventListener('click', gameConfirmFunc)


//when the get review button inside the show view is pressed
// document.getElementById('btn-get-review')
// .addEventListener('click', reviewGetOne);

//when the DELETE button is pressed to show the DELETE form
// document.getElementById('btn-review-delete')
// .addEventListener('click', function() {
//     reviewView = 'delete'
//     reviewRender();
// });

//when the DELETE REVIEW button is pressed inside the DELETE form
// document.getElementById('btn-delete-one-review')
// .addEventListener('click', reviewDelete);

/*-- Functions --*/

gameInit();

//initial view of review section
async function gameInit() {
    gameView = 'hide';
    gameRender();
}

//async function to get a list of all games
async function gameGetAll() {
    gameView = 'view-all';
    gamesAll = await fetch(BASE_URL + 'games/all')
    .then(res => res.json());
    gameRender();
}

//async function to get a list of all open games
async function gameGetAllOpen() {
    gameView = 'view-all-open';
    gamesAllOpen = await fetch(BASE_URL + 'games/open/all')
    .then(res => res.json());
    gameRender();
}

//async function for getting a single game
async function gameGetOne() {
    if(gameShowInputEl[0].value) {
        gameShow = await fetch(BASE_URL + 'games/' + gameShowInputEl[0].value)
        .then(res => res.json());
    }
    let html = JSON.stringify(gameShow);
    gameListContainerShowEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
    gameShowInputEl[0].value = '';
}

//async function for getting requests
async function gameRequestFunc() {
    if(gameRequestInputEl[0].value) {
        gameRequest = await fetch(BASE_URL + 'games/request?currentUserId=' + gameRequestInputEl[0].value + '&status=' + gameRequestInputEl[1].value)
        .then(res => res.json());
    }
    let html = JSON.stringify(gameRequest);
    gameListContainerRequestEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
    gameRequestInputEl[0].value = gameRequestInputEl[1].value = '';
}

//async function for getting goalie history
async function gameGoalieFunc() {
    if(gameGoalieInputEl[0].value) {
        gameGoalie = await fetch(BASE_URL + 'games/goalie?currentUserId=' + gameGoalieInputEl[0].value + '&status=' + gameGoalieInputEl[1].value)
        .then(res => res.json());
    }
    let html = JSON.stringify(gameGoalie);
    gameListContainerGoalieEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
    gameGoalieInputEl[0].value = gameGoalieInputEl[1].value = '';
}

//async function for creating a game request
async function gameCreate() {
    if (gameCreateInputEl[0].value) {
        let newGame = await fetch(BASE_URL + 'games?currentUserId=' + gameCreateInputEl[0].value, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                sport: gameCreateInputEl[1].value,
                skill_level: gameCreateInputEl[2].value,
                city: gameCreateInputEl[3].value,
                arena: gameCreateInputEl[4].value,
                request_time: gameCreateInputEl[5].value,
                request_date: gameCreateInputEl[6].value,
                team_name: gameCreateInputEl[7].value,
                description: gameCreateInputEl[8].value
            })
        }).then(res => res.json())
        let html = JSON.stringify(newGame);
        gameListContainerCreateEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
        gameCreateInputEl[0].value = gameCreateInputEl[1].value = gameCreateInputEl[2].value = gameCreateInputEl[3].value = gameCreateInputEl[4].value
        gameCreateInputEl[5].value = gameCreateInputEl[6].value = gameCreateInputEl[7].value = gameCreateInputEl[8].value = '';
    }
}

//async function to add a goalie to an open game
async function gameAddGoalieFunc() {
    if (gameAddGoalieInputEl[0].value) {
        gameAddGoalie = await fetch(BASE_URL + 'games/' + gameAddGoalieInputEl[0].value + '/add_goalie?currentUserId=' + gameAddGoalieInputEl[1].value, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        let html = JSON.stringify(gameAddGoalie);
        gameListContainerAddGoalieEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
        gameAddGoalieInputEl[0].value = gameAddGoalieInputEl[1].value = '';
    }
}

//async function to confirm a game/goalie
async function gameConfirmFunc() {
    if (gameConfirmInputEl[0].value) {
        gameConfirm = await fetch(BASE_URL + 'games/' + gameConfirmInputEl[0].value + '/confirm?currentUserId=' + gameConfirmInputEl[1].value, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        let html = JSON.stringify(gameConfirm);
        gameListContainerConfirmEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
        gameConfirmInputEl[0].value = gameConfirmInputEl[1].value = '';
    }
}

//async function for getting all reviews for a user
// async function reviewGetOne() {
//     if(reviewShowInputEl[0].value) {
//         reviewShow = await fetch(BASE_URL + 'users/' + reviewShowInputEl[0].value + '/reviews')
//         .then(res => res.json());
//     }
//     let html = JSON.stringify(reviewShow);
//     reviewListContainerShowEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
//     reviewShowInputEl[0].value = '';
// }

//function for deleting an review
// async function reviewDelete() {
//     if(reviewDeleteInputEl[0].value) {
//         reviewD = await fetch(BASE_URL + 'users/reviews/' + reviewDeleteInputEl[0].value, {
//             method: 'DELETE'
//         }).then(res => res.json())
//     }
//     let html = JSON.stringify(reviewD);
//     reviewListContainerDeleteEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`;
//     reviewDeleteInputEl[0].value = '';
// }

//render function for review section
function gameRender() {
    gameAllViewEl.style.display = 
        gameView === 'view-all' ? 'block' : 'none';
    gameAllOpenViewEl.style.display =
        gameView === 'view-all-open' ? 'block' : 'none';
    gameShowViewEl.style.display = 
        gameView === 'show' ? 'block' : 'none';
    gameRequestsViewEl.style.display = 
        gameView === 'request' ? 'block' : 'none';
    gameGoalieViewEl.style.display =
        gameView === 'goalie' ? 'block' : 'none';
    gameCreateViewEl.style.display = 
        gameView === 'create' ? 'block' : 'none';
    gameAddGoalieViewEl.style.display = 
        gameView === 'add-goalie' ? 'block' : 'none';
    gameConfirmViewEl.style.display =
        gameView === 'confirm' ? 'block' : 'none';    
    // gameDeleteViewEl.style.display = 
    //     gameView === 'delete' ? 'block' : 'none';
    if (gameView === 'view-all') {
        let html = JSON.stringify(gamesAll);
        gameListContainerAllGamesEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`
    }
    if (gameView === 'view-all-open') {
        let html = JSON.stringify(gamesAllOpen);
        gameListContainerAllOpenEl.innerHTML = `<div>${html.split(',').join(', <br />')}</div>`
    }
}
