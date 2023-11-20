window.addEventListener('DOMContentLoaded', (event) => {
    init();
    console.log('DOM fully loaded and parsed');
});


let apiURL = `https://recipebook1.onrender.com/api`;
let myAiService_URL = `https://bardtest1.onrender.com/api`;
// let books = [];
let bookRecipesObj = {};
let aiRecipeObj = {}
// let currentPersonId = 1; 
let currentBookId = 1;

//only for persistent buttons
const interactiveElements = {
    searchBtn: `#searchBtn`,
    recipeDisplayCtn: `#recipeDisplayCtn`,
    modalOne: `#modalOne`,
    userIcon: `#userIcon`,
    userModal: `#userModal`,
    personId: `#personId`,
    bookId: `#bookId`,
    loadingGif: `#loadingGif`,
    heartIcon: `heartIcon`,
}

const iElem = interactiveElements;

async function init(){
    initQselectors()
    initEventListeners();


    // loading asideItems
    bookRecipesObj = convertArrToObj(await getRecipesByBookId(currentBookId));
    console.log(bookRecipesObj)
    renderAsideThumbs();

    sideBarEventListeners();
    // userRecipeCardListeners();
    // initFavCardListeners();
}

function initQselectors(){
    for(let [elem, selector] of Object.entries(iElem)){
        iElem[elem] = document.querySelector(selector)
    }
}

function initEventListeners(){

    iElem.searchBtn.addEventListener('click', async () => {
        const userSearch = document.querySelector('#ingredientInput').value
        // console.log(`search clicked`);
        // console.log(`userInput ${userSearch}`)
        const inputObj = {
            "userInput": userSearch
        }

        iElem.loadingGif.classList.remove('hide');
        iElem.recipeDisplayCtn.classList.add('hide');

        aiRecipeObj = await getAiRecipeData(inputObj)
        // console.log('candidates',aiRecipeObj)
        aiRecipeObj = getSucessRecipes(aiRecipeObj)
        console.log('first successful',aiRecipeObj);

        renderMainContent(aiRecipeObj);

        iElem.recipeDisplayCtn.classList.remove('hide');
        iElem.loadingGif.classList.add('hide');
    })

    iElem.userIcon.addEventListener('click', () => {
        iElem.userModal.classList.remove('hide');
    });

    iElem.personId.addEventListener('change', (e) => {
        currentPersonId = e.target.value
        //TODO also re-render thumbs
    })

    iElem.bookId.addEventListener('change', (e) => {
        currentBookId = e.target.value
        //TODO also re-render thumbs
    })

}

function sideBarEventListeners(){
    const thumbCards = document.querySelectorAll('.thumbCard')
    
    thumbCards.forEach(elem => {
        elem.addEventListener('click', async(e) => {
            const id = String(e.target.parentElement.id).split('thumbCard')[1]
            console.log('thumb clicked',id)
            iElem.modalOne.classList.remove('hide');
            renderModalOne(id);
        })
    })

}


//  ------------------------------------------------------- API ROUTE FUNCTIONS

// for route: https://bardtest1.onrender.com/api/ai/recipe

async function getAiRecipeData(obj){
    const url = `${myAiService_URL}/ai/recipe`
    console.log(`getting from recipes from ${url}`)
    try{
        const response = await fetch(url, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj)
        });
  
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

function renderAsideThumbs(){
    const asideCtn = document.querySelector('#asideCtn');

    asideCtn.innerHTML = ``;
    let cardHTML = ``
    for(let [indexR, bkPage] of Object.entries(bookRecipesObj)){
        cardHTML += `
                <div id="thumbCard${indexR}" class="thumbCard">
                    <img class="imgThumb" src="${bkPage.imagelink}" alt="${bkPage.title}">
                    <div class="thumbTitle">${bkPage.title}</div>
                </div>
        `
    }

    console.log(cardHTML)
    asideCtn.innerHTML = cardHTML;

}


function renderMainContent(obj){
    const displayCtn = document.querySelector('#recipeDisplayCtn');
    const recipe = obj.content.recipe;
    let ingredientsHTML = ``
    let instructionsHTML = ``

    const ingredientsArr = recipe.ingredients.split(', ');
    const instructionArr = recipe.instructions.split('Step');

    // Loop through the array and create an li element for each value
    ingredientsArr.forEach(value => {
        // Create an li element
        ingredientsHTML+=`<li>${value}</li>`;
    });

    instructionArr.forEach(value => {
        // Create an li element
        instructionsHTML+=`<li>${value}</li>`;
    });


    // aiRecipeObj
    displayCtn.innerHTML = ``
    let displayHTML = `
                <div class="recipeImgCtn">
                    <span id="heart-icon" class="material-symbols-outlined ">favorite</span>
                    <!-- <div class="heart-icon">&#9829</div> -->
                    <img class="recipeImg" src="../assets/chickenShawarma1.jpg" alt="chickenShawarma1">
                </div>
                <h1 class="recipeTitle">${recipe.title}</h1>
                <div class="recipeDescription">${recipe.description}</div>
                <hr class="divider1">
                <h2>Ingredients</h2>
                <ul class="ingredients">
                    ${ingredientsHTML}
                </ul>
                <br><br>
                <h2>Instructions:</h2>
                <ul class="recipeInstructions">
                    ${instructionsHTML}
                </ul>
    `

    displayCtn.innerHTML = displayHTML;
}

// TODO last left off images
function renderModalOne(id){
    const modalOneCtn = document.querySelector('#modalOneCtn');
    const bkPage = bookRecipesObj[id];
    modalOneCtn.innerHTML = ``;
    let contentHTML = `
                <img class="img-mdl" src="${bkPage.imagelink}" alt="${bkPage.title}">
                <h2 class="title-mdl">${bkPage.title}</h2>
                <h3>Description:</h3>
                <div class="description-mdl">
                    ${bkPage.description}
                </div><br>
                <h3>Ingredients:</h3>
                <div class="ingredients-mdl">
                    ${bkPage.ingredients}
                </div><br>
                <h4>Instructions:</h4>
                <div class="instructions-mdl">
                    ${bkPage.instructions}
                </div>
                <button class="unfavBtn" id="unfavBtn${id}">Unfavorite</button>
                `
    
    modalOneCtn.innerHTML = contentHTML;
}


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
    modalCtn.innerHTML = recipePageHTML;
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

function getSucessRecipes(recipes){
    let firstSuccessfulRecipe;
    for (const key in recipes) {
        if (key.startsWith("success") && recipes[key].content && recipes[key].content.recipe) {
            firstSuccessfulRecipe = recipes[key];
            break; // Stop the loop once the first successful recipe is found
        }
    }
    return firstSuccessfulRecipe;
}


// ------------------------------------------------------------- MODAL FUNCTIONS

// TODO: toggle the class instead

function closeModal() {
    document.getElementById('modalOne').classList.add('hide');
    document.getElementById('userModal').classList.add('hide');
}

const span = document.getElementsByClassName('close')[0];

span.onclick = function() {
  closeModal();
}

window.onclick = function(event) {
  if (event.target.id == 'modalOne') {
    closeModal();
  }
  if (event.target.id == 'userModal') {
    closeModal();
  }
}