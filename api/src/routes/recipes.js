const {Router} = require('express');
const {allRecipes} = require('../utils/allRecipes.js')
const {Recipe,Diet} = require('../db.js');
const axios = require('axios');

const router = Router();


router.get('',(req, res) => {
    const {name} = req.query;
    const {API_KEY} = process.env
    if(name) {
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
        let recipeDb = Recipe.findAll({includes:{
            model: Diet,
            attributes:["name"],
            through: {attributes:[]}
         }})
         .then(response => response)
         .catch(error => console.log(error))
        return Promise.all([recipeDb,recipeApi])
        .then(data => {
            if(data[0] && data[1]) return res.status(201).json([...data[0],...data[1]])
            if(data[0]) return res.status(201).json(data[0])
            if(data[1]) return res.status(201).json(data[1])
            return res.status(201).send('No se encontro ninguna receta')
         })
        .catch(error => res.status(404).send(`Hubo un error en ruta recipes ${error}`))
    }

    allRecipes()
    .then(allRes => res.status(201).json(allRes))
    .catch(error => res.status(404).send(error))
})


router.get('/:id',(req,res) => {
    const {id} = req.params;
    const {API_KEY} = process.env
    axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
    .then(response => response.data)
    .then((info) => ({name: info.name, 
                    image: info.image,
                    dishTypes: info.dishTypes[0],
                    diets: info.diets.map(e => e),
                    summary: info.summary,
                    healthScore: info.healthScore,
                    analyzedInstructions: info.analyzedInstructions[0].steps.map(e => e.step)
        }))
    .then(myRecipe => res.status(201).json(myRecipe))
    .catch(error => res.status(404).send(`Ocurrio un error en recipes/:id ${error}`))
    
})

router.post('',(req,res) => {
    const {name,summary,healthScore,analyzedInstructions,diets} = req.body;
    Recipe.create({name,summary,healthScore,analyzedInstructions})
    .then(response => response.addDiets(diets))
    .then(() => res.status(201).send('Recipe created succesfully'))
    .catch(error => res.status(404).send(`No se pudo crear la receta ${error}`))
})







module.exports = router