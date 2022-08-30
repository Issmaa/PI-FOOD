const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require('./recipes.js');
const diets = require('./diets.js');

const router = Router();

router.use('/recipes',recipes)
router.use('/diets',diets)




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
