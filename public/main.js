

window.addEventListener('DOMContentLoaded', (event) => {
    init();
    console.log('DOM fully loaded and parsed');
});


let apiURL = `https://recipebook1.onrender.com/api`;
let books = [];
let bookRecipesObj = {};
let personId = document.querySelector('#personId').value;
let bookId = document.querySelector('#bookId').value;

//only for persistent buttons
const interactiveElements = {
    searchBtn: `#searchBtn`,
    getBookRecipes: `#getBookRecipes`,
    addCustomRecBtn: `#addCustomRecBtn`
}

const iElem = interactiveElements;


//-------------------------------------------------------- INIT ON LOAD
async function init(){
    initQselectors()
    initEventListeners();
    userRecipeCardListeners();
    initFavCardListeners();
}

function initQselectors(){
    for(let [elem, selector] of Object.entries(iElem)){
        iElem[elem] = document.querySelector(selector)
    }
}

function initEventListeners(){
    iElem.getBookRecipes.addEventListener('click', async () => {
        bookId = document.querySelector('#bookId').value
        console.log(`getBookRecipes clicked bookId: ${bookId}`)

        bookRecipesObj = convertArrToObj(await getRecipesByBookId(bookId));
        console.log(bookRecipesObj)
        renderRecipeData();
    })

    iElem.searchBtn.addEventListener('click', async () => {
        const userInput = document.querySelector('#userInput').value
        console.log(`search clicked`);
        console.log(`userInput ${userInput}`)
    })

    iElem.addCustomRecBtn.addEventListener('click', async () => {
        const customRecipeObj = {
            personId: document.querySelector('#personId').value,
            bookId: document.querySelector('#bookId').value,
            title: document.querySelector('#customRecTitle').value,
            description: document.querySelector('#customDescript').value,
            recipe: document.querySelector('#customRecipe').value,
        }

        console.log('addCustomRecBtn clicked:')
        const insertResponse = await insertRecipePage(customRecipeObj)

        console.log('insert server response: ', insertResponse)

    })
}

function userRecipeCardListeners(){
    const seeRecipeElements = document.querySelectorAll('.seeRecipeBtn')
    console.log(seeRecipeElements)
    const unfavBtnElements = document.querySelectorAll('.unfavBtn')
    
    seeRecipeElements.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = String(e.target.id).split('seeRecipeBtn')[1]
            console.log('clicked seeRecipe id', id)
            renderModalData(id);
            openModal();
        })
    });

    unfavBtnElements.forEach(btn => {
        btn.addEventListener('click',  async (e) => {
            const id = String(e.target.id).split('unfavBtn')[1]
            console.log('clicked unfavBtn id', id)

            const prompt = `Are you sure you want to delete ${bookRecipesObj[id].title} page`
            if(confirm(prompt) === true){
                deleteRecipePage(id)
                e.target.parentElement.classList.add('hideCard') //hides it from user without querying server
                console.log('deleted',id)
            } else{
                return; //do nothing
            }
        })
    })
}


// const customRecipeObj = {
//     personId: document.querySelector('#personId').value,
//     bookId: document.querySelector('#bookId').value,
//     title: document.querySelector('#customRecTitle').value,
//     description: document.querySelector('#customDescript').value,
//     recipe: document.querySelector('#customRecipe').value,
// }

// console.log('addCustomRecBtn clicked:')


function initFavCardListeners(){
    const favBtnElements = document.querySelectorAll('.favBardBtn')

    favBtnElements.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            // const id = String(e.target.parentElement.id).split('cardBard')[1]
            const recipeId = String(e.target.id).split('favBardBtn')[1];
            const bookId = document.querySelector('#bookId').value;
            console.log('disabled until bard done, clicked favBardBtn recipe id, bookid', recipeId, bookId);

            //needs recipeData to be an obj before continuing
            
            // const insertResponse = await insertRecipePage(bookRecipesObj[recipeId])
            bookRecipesObj = await getRecipesByBookId(recipeId);
            await renderRecipeData();
        })
    })
}

//  ------------------------------------------------------- API ROUTE FUNCTIONS

// for route: /api/book/:bookId/pages
async function getRecipesByBookId(id){
    let url = `${apiURL}/book/${id}/pages`
    console.log(`getting from recipes from ${url}`)
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('GET success', data)
        return data;
    } catch(error) {
        console.error('Error during POST request:', error);
    }
}

// for route: '/api/person/:personId/book/:bookId/page'
async function insertRecipePage(obj){
    let url = `${apiURL}/page`;
    console.log(`inserting page to ${url}`);
    console.log(obj)
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`INSERT success`, data)
        return data;
    } catch(error) {
        console.error('Error during INSERT request:', error);
    }
}

// for route: '/api/page/:pageId',
async function deleteRecipePage(id){
    let url = `${apiURL}/page/${id}`;
    console.log(`deleting recipe page id:${id} from ${url}`)

    try{
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`DELETE success`, data)
        return data;
    } catch(error) {
        console.error('Error during DELETE request:', error);
    }
}

//  ------------------------------------------------------- RENDER FUNCTIONS

function renderRecipeData(){
    const recipesCtn = document.querySelector('.recipes-ctn')
    // const recipe = bookRecipesObj;

    recipesCtn.innerHTML = ``
    let cardHTML = ``


    for(let [indexR, bkPage] of Object.entries(bookRecipesObj)){
        // console.log(`recipe`, recipe.title)
        cardHTML += `
            <div class="recipeCard" id="card${bkPage.id}">
                <div class="title">${bkPage.title}</div>
                <div class="description">${bkPage.description}</div>
                <button class="seeRecipeBtn" id="seeRecipeBtn${bkPage.id}">See Recipe</button>
                <button class="unfavBtn" id="unfavBtn${bkPage.id}">Unfavorite</button>
            </div>`;
    }
    recipesCtn.innerHTML = cardHTML;
    userRecipeCardListeners();
}

function renderModalData(id){
    // bookRecipesObj
    const modalCtn = document.querySelector('.modal-content')
    const bkPage = bookRecipesObj[id]
    modalCtn.innerHTML = ``;
    let recipePageHTML = `
                <h2 class="title-mdl">${bkPage.title}</h2>
                <h3>Description:</h3>
                <div class="description-mdl">
                    ${bkPage.description}
                </div><br>
                <h4>Recipe:</h4>
                <div class="recipe-mdl">
                    ${bkPage.recipe}
                </div>
            `;
    modalCtn.innerHTML=recipePageHTML;
}

//  ------------------------------------------------------- UTIL FUNCTIONS


//converts arr into obj, so delete/inserts don't move the reference
//also just don't reference things by arr index unless it's a card
function convertArrToObj(arr){
    const objectById = {};

    arr.forEach(item => {
        objectById[item.id] = item;
    });

    return objectById
}


// ------------------------------------------------------------- MODAL FUNCTIONS

// TODO: toggle the class instead
function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}


const modal = document.getElementById('myModal');
const span = document.getElementsByClassName('close')[0];

span.onclick = function() {
  closeModal();
}

window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}