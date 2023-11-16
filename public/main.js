

window.addEventListener('DOMContentLoaded', (event) => {
    init();
    console.log('DOM fully loaded and parsed');
});


let apiURL = `https://recipebook1.onrender.com/api/`;
let books = [];
let bookRecipesObj = {};
let personId = 1; //testing
let bookId = 1;

//only for persistent buttons
const interactiveElements = {
    searchBtn: `#searchBtn`,
    getBookRecipes: `#getBookRecipes`
}

const iElem = interactiveElements;


//-------------------------------------------------------- INIT
async function init(){
    initQselectors()
    initEventListeners();
    // bookData = await getData(apiURL)
}

function initQselectors(){
    for(let [elem, selector] of Object.entries(iElem)){
        iElem[elem] = document.querySelector(selector)
    }
}

function initEventListeners(){
    iElem.searchBtn.addEventListener('click', async () => {
        const userInput = document.querySelector('#userInput').value

        console.log(`search clicked`);
        console.log(`userInput ${userInput}`)
    })

    iElem.getBookRecipes.addEventListener('click', async () => {
        const bookId = document.querySelector('#bookId').value
        console.log(`getBookRecipes clicked bookId: ${bookId}`)

        const bookRecipesArr = []
        bookRecipesArr = await getRecipesByBookId(bookId)
        console.log(bookRecipesArr)
        // bookRecipesObj = convertArrToObj(bookRecipesArr);
        // console.log(bookRecipesObj)
    })

}

//init listeners favBtn for cards
function initCardListeners(){
    const favBtnElements = document.getquerySelectorAll('.addFavBtn')


    
    favBtnElements.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = String(e.target.parentElement.id).split('card')[1]
            console.log('card id', id)

            //needs recipeData to be an obj before continuing

        })
    })
}

//  ------------------------------------------------------- API ROUTE FUNCTIONS

// for route: /api/book/:bookId/pages
async function getRecipesByBookId(id){
    let url = `${apiURL}/book/${bookId}/pages`
    console.log(`getting from recipes from ${url}`)

    try{
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const bookRecipes = await response.json();
        console.log('GET success', bookRecipes)
        return bookRecipes;
    } catch(error) {
        console.error('Error during POST request:', error);
    }
}
//  ------------------------------------------------------- RENDER FUNCTIONS

function renderData(obj){

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
