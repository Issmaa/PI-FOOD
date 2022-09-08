const {Recipe,Diet} = require('../db.js');
const { Op } = require("sequelize");
const axios = require('axios');


function recipeName(name){
    const {API_KEY} = process.env
    let recipeApi = axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&addRecipeNutrition=true&titleMatch=${name}`)
        .then(info => info.data)
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
        let recipeDb = Recipe.findAll({where:{name:{[Op.substring]: name}},
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
        return Promise.all([recipeDb,recipeApi])
        .then(data => {
            if(data[0] && data[1]) return ([...data[0],...data[1]])
            if(data[0]) return (data[0])
            if(data[1]) return (data[1])
            return ('No se encontro ninguna receta')
         })
        .catch(error => (`Hubo un error en ruta recipes ${error}`))

}

module.exports={recipeName} 