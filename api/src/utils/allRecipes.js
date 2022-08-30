const {Recipe,Diet} = require('../db.js');
const axios = require('axios');

function allRecipes () {
    const {API_KEY} = process.env
    let apiResponse = axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&addRecipeNutrition=true&number=10`)
    .then(response => response.data)
    .then(info => info.results.map(e => {
        let recipieInfo = {
            id: e.id,
            name: e.title,
            image: e.image,
            diets: e.diets.map(e => e),
            cuisines: e.cuisines[0],
        }
        return recipieInfo
    }))
    let dbInfo = Recipe.findAll({
        includes:{
           model: Diet,
           attributes:["name"],
           through: {attributes:[]}
        }
     })
     .then(response => response)
     .catch(error => console.log(error))
    return Promise.all([apiResponse,dbInfo])
   .then(data => (data[0].concat(data[1])))
   .catch(error => (error))
}

module.exports = {allRecipes}