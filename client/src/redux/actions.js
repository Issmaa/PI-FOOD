const axios = require ('axios');

export const GET_RECIPES = 'GET_RECIPES';
export const GET_DIETS = 'GET_DIETS';
export function getRecipes(){
    return (dispatch) => {
        axios('http://localhost:3001/recipes')
        .then(res => dispatch({type: GET_RECIPES, payload: res.data}))
        .catch(error => dispatch({type: 'ERROR_GET_RECIPES', payload: error.toString()}))
    }
}

export function getDiets(){
    return (dispatch) => {
        axios('http://localhost:3001/diets')
        .then(res => dispatch({type: GET_DIETS, payload: res.data}))
        .catch(error => dispatch({type: 'ERROR_GET_DIETS',payload:error.toString()}))
    }
}