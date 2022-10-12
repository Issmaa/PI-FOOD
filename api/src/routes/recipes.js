const {Router} = require('express');
const {allRecipes} = require('../utils/allRecipes.js')
const {recipeName} = require('../utils/recipeName.js');
const {Recipe,Diet} = require('../db.js');
const axios = require('axios');

const router = Router();


router.get('',(req, res) => {
    const {name} = req.query;
    
    if(name) {
        recipeName(name)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(404).send({error: error.message}))
        return 
    }

    allRecipes()
    .then(allRes => res.status(200).json(allRes))
    .catch(error => res.status(404).send({error: error.message}))
})


router.get('/:id',(req,res) => {
    const {id} = req.params;
    if(id.length > 8){
        Recipe.findOne({where :{ id: id}, include: Diet})
        .then(el => ({name: el.name,
                summary: el.summary,
                healthScore: el.healthScore,
                analyzedInstructions: el.analyzedInstructions,
                diets: el.diets.map(e => e.name + ', ')
            }))
        .then(response => res.status(201).json(response))
        .catch(error => res.status(401).send(`Ocurrio un error en recipes/:id ${error}`))
    } else {
        const {API_KEY} = process.env
        axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true&addRecipeNutrition=true`)
    .then(response => response.data)
    .then((info) => ({name: info.title, 
                    image: info.image,
                    dishTypes: info.dishTypes[0],
                    diets: info.diets.map(e => e),
                    summary: info.summary,
                    healthScore: info.healthScore,
                    analyzedInstructions: info.analyzedInstructions
                    // analyzedInstructions: info.analyzedInstructions[0].steps.map(e => e.step)
        }))
    .then(myRecipe => res.status(200).json(myRecipe))
    .catch(error => res.status(404).send(`Ocurrio un error en recipes/:id ${error}`))
    }
})

router.post('',(req,res) => {
    const {name,summary,healthScore,analyzedInstructions,diets} = req.body;
    Recipe.create({name,summary,healthScore,analyzedInstructions})
    .then(response => response.addDiets(diets))
    .then(() => res.status(201).send({msn: 'Recipe created succesfully'}))
    .catch(error => res.status(404).send(`No se pudo crear la receta ${error}`))
})

router.delete('/:id',(req,res) => {
    const {id} = req.params;
    Recipe.destroy({where: id})
    .then(response => res.status(200).send('Se ha eliminado correctamente'))
    .catch(error => res.send(error))
})





module.exports = router