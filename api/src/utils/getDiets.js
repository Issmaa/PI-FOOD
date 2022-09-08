const {Diet} = require('../db.js');

function allDiets(){
    Diet.bulkCreate([
        {name: "gluten free"},
        {name: "vegetarian"}, 
        {name: "ketogenic"}, 
        {name:"lacto ovo vegetarian"},
        {name: "vegan"}, 
        {name: "pescetarian"}, 
        {name: "paleolithic"}, 
        {name: "primal"},
        {name: "low FODMAP"},
        {name: "dairy free"},
        {name: "whole 30"}])
    .then(() => console.log("Dietas cargadas"))
    .catch(error => (`no se crearon las dietas en la base de datos ${error}`))
}

module.exports = {allDiets}