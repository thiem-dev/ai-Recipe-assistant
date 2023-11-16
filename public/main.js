

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
    initUnFavCardListeners();
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

function initUnFavCardListeners(){
    const unfavBtnElements = document.querySelectorAll('.unfavBtn')

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

function initFavCardListeners(){
    const favBtnElements = document.querySelectorAll('.favBardBtn')

    favBtnElements.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // const id = String(e.target.parentElement.id).split('cardBard')[1]
            const id = String(e.target.id).split('favBardBtn')[1]
            console.log('clicked favBardBtn id', id)

            //needs recipeData to be an obj before continuing

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
    console.log('obj sent:',JSON.stringify(obj))
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


    for(let [indexR, recipe] of Object.entries(bookRecipesObj)){
        // console.log(`recipe`, recipe.title)
        cardHTML += `
            <div class="recipeCard" id="card${recipe.id}">
                <div class="title">${recipe.title}</div>
                <div class="description">${recipe.description}</div>
                <button class="unfavBtn" id="unfavBtn${recipe.id}">Unfavorite</button>
            </div>`;
    }
    recipesCtn.innerHTML = cardHTML;
    initUnFavCardListeners();
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
