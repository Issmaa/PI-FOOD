const axios = require ('axios');

export const GET_RECIPES = 'GET_RECIPES';
export const GET_DIETS = 'GET_DIETS';
export const GET_DETAIL_RECIPE = 'GET_DETAIL_RECIPE';
export const GET_RECIPE_NAME = 'GET_RECIPE_NAME';
export const FILTER_ATOZ = 'FILTER_ATOZ';
export const FILTER_ZTOA = 'FILTER_ZTOA';
export const FILTER_TIPOS = 'FILTER_TIPOS';
export const FILTER_HEALTH_ASC = 'FILTER_HEALTH_ASC';
export const FILTER_HEALTH_DESC = 'FILTER_HEALTH_DESC';

export function getRecipes(){
    return (dispatch) => {
        axios('http://localhost:3001/recipes')
        .then(res => dispatch({type: GET_RECIPES, payload: res.data}))
        .catch(error => dispatch({type: 'ERROR_GET_RECIPES', payload: error.toString()}))
    }
}
export function getRecipeName(name){
    return (dispatch) => {
        axios(`http://localhost:3001/recipes?name=${name}`)
        .then(res => dispatch({type: GET_RECIPE_NAME, payload:res.data}))
        .catch(error => dispatch({type: 'ERROR_GET_RECIPE_NAME', payload: error.toString()}))
    }
}
export function getDiets(){
    return (dispatch) => {
        axios('http://localhost:3001/diets')
        .then(res => dispatch({type: GET_DIETS, payload: res.data}))
        .catch(error => dispatch({type: 'ERROR_GET_DIETS',payload:error.toString()}))
    }
}

export function postRecipe(payload){
    return (dispatch) => {
        axios.post('http://localhost:3001/recipes', payload)
        .catch(error => dispatch({type: 'ERROR_POST_RECIPE', payload: error.toString()}))
    }
}

export function detailRecipe(id) {
    return (dispatch) => {
        axios(`http://localhost:3001/recipes/${id}`)
        .then(response => dispatch({type: GET_DETAIL_RECIPE ,payload: response.data}))
        .catch(error => dispatch({type: 'ERROR_GET_DETAIL_RECIPE',payload: error.toString()}))
    }
}

export function tiposDiets(dietType){
    return {type: FILTER_TIPOS, payload:dietType}
}

export function recipeAToZ(){
    return {type: FILTER_ATOZ}
}

export function recipeZToA(){
    return {type: FILTER_ZTOA}
}

export function HealthAsc(){
    return {type: FILTER_HEALTH_ASC}
}

export function HealthDesc(){
    return {type: FILTER_HEALTH_DESC}
}

export function fromApi(){
    return {type: 'FROM_API'}
}

export function fromDataBase(){
    return {type: 'FROM_DATABASE'}
}

export function clean(){
    return {type: 'CLEAN_DETAIL'}
}