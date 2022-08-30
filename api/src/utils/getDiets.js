const {Diet} = require('../db.js');

function allDiets(){
    Diet.bulkCreate([
        {name: "Gluten Free"},
        {name: "Vegetarian"}, 
        {name: "Ketogenic"}, 
        {name:"Lacto-Vegetarian"}, 
        {name:"Ovo-Vegetarian"},
        {name: "Vegan"}, 
        {name: "Pescetarian"}, 
        {name: "Paleo"}, 
        {name: "Primal"},
        {name: "Low FODMAP"},
        {name: "Whole30"}])
    .then(() => console.log("Dietas cargadas"))
    .catch(error => (`no se crearon las dietas en la base de datos ${error}`))
}

module.exports = {allDiets}