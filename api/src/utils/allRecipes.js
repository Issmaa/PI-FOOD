const {Recipe,Diet} = require('../db.js');
const axios = require('axios');

function allRecipes () {
    const {API_KEY} = process.env
    let apiResponse = axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&addRecipeNutrition=true&number=100`)
    .then(response => response.data)
    .then(info => info.results.map(e => {
        let recipieInfo = {
            id: e.id,
            name: e.title,
            image: e.image,
            diets: e.diets.map(e => e),
            healthScore: e.healthScore,
            cuisines: e.cuisines[0],
        }
        return recipieInfo
    }))
    let dbInfo = Recipe.findAll({
        include:{
           model: Diet,
           attributes:["name"],
           through: {attributes:[]}
        }
     })
     .then(info => (info.map(e => {
            let allDiets = e.diets.map(e => e.name);
            let recipeFull = {
                id: e.id,
                name: e.name,
                summary: e.summary,
                healthScore: e.healthScore,
                analyzedInstructions: e.analyzedInstructions,
                diets: allDiets
            }
            return recipeFull
        })))
    .then(response => response)
     .catch(error => console.log(error))
    return Promise.all([apiResponse,dbInfo])
   .then(data => (data[1].concat(data[0])))
   .catch(error => (error))
}

module.exports = {allRecipes}