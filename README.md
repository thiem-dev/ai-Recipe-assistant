Placeholder for image`<img src="https://raw.githubusercontent.com/business-thiem/NextJS13-scott-tut/main/assets/NextJS13-todo-ss1.png" width="1200" height="500">`

# Overview
- An ai powered recipe finder made on PERN stack + Google's Palm2 Ai 
- Link to App: https://recipebook1.onrender.com/ 
  - If site is down (90 day life cycle on render.com) - let the code monkey know to redeploy. Latest Deploy (17 Nov, 2023)


## App Info / Features
- User inputs ingredients and receives a recipe from their input
- User can favorite a recipe (using heart icon) and it's added to the sidebar of favorite items
- Sidebar of favorite items
- User can view old saved receipes in popup modal
- User can delete old saved recipes


- Basic CRUD functionality of recipe items. 
  - get all recipes on sidebar, get one recipe from ai search, save one recipe, update user book, delete recipe item

### Example of different app states: 

#### Add to favorites
Placeholder for image`<img src="https://raw.githubusercontent.com/business-thiem/NextJS13-scott-tut/main/assets/NextJS13-todo-ss1.png" width="1200" height="500">`

#### Modal
Placeholder for image`<img src="https://raw.githubusercontent.com/business-thiem/NextJS13-scott-tut/main/assets/NextJS13-todo-ss1.png" width="1200" height="500">`

## Tech used:
- PALM2 ai API:
  - Where to get API key: https://makersuite.google.com/app/apikey 
  - Is it free? Yes, sorta: https://ngyibin.medium.com/how-to-get-access-to-googles-palm-2-large-language-model-21379f27c078#:~:text=At this stage%2C you may,use%2C unlike GPT-4. 
  - Google Cloud Console: for managing/view compute/usage stats https://console.cloud.google.com/ 
  - Basic Hello World: https://developers.generativeai.google/tutorials/text_node_quickstart 
  - Why not use Bard?
    - It doesn't consistently work with its cookie system: 
    - Resources if you want to work with Bard anyways: 
        - APIkey: As of 17 Nov, 2023 it is no longer available.
        - Getting Cookie: https://www.automatebard.com/2023/04/17/how-to-get-cookie-value-for-bard/ 
        - Basic Hello world: https://bard-ai.js.org/basics/ask/ 
- NeonDB: Free Postgres DB. See: https://neon.tech/
- Express js: Backend web framework for api server. See: https://expressjs.com/
- CORS library: middleware for removing COR restrictions.
- json5: Makes json format more relaxed. Ai JSON responses differ sometimes.  See: https://json5.org/
- Pexel Image Api: Free image api. Restrictions: the API is rate-limited to 200 requests per hour and 20,000 requests per month. See: https://www.pexels.com/api/documentation/#photos-search
  - Also see Unsplash Dev as another image resource: https://unsplash.com/documentation#registering-your-application
- Vanilla JS, HTML, CSS, NodeJS.

Link to course notes and future references:

## Personal Notes

### Workflows guide for myself in future
- ... ?

### Future TODO:

- Known Bugs:
  - Sometimes the ai response is not proper JSON so my parse breaks (tried to clean it up and have proper error handling, but the ai response varies a lot)

- addtional features (for later):
  - show multiple images for the food in a nice slide show like: https://youtu.be/PkADl0HubMY?si=LQ176HmrO-dLX5ws 
  - error handling for when ai responses fail
  - add calorie count and serving size?
  - add a health grade/sentiment for the food
