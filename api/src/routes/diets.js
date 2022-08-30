const {Router} = require('express');
const {Diet} = require('../db.js');
const router = Router();


router.get('',(req,res) => {
    Diet.findAll()
    .then(response => res.status(201).json(response))
    .catch(error => res.status(404).send(`Hubo un error en diet ${error}`))
})





module.exports = router