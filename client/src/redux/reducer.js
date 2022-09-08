const initialState = {
    recipes: [],
    recipesFilter: [],
    diets: [],
    detailRecipeR: {},
}

const {GET_RECIPES, GET_DIETS, GET_DETAIL_RECIPE,
        GET_RECIPE_NAME,FILTER_ATOZ,FILTER_ZTOA,FILTER_TIPOS
        ,FILTER_HEALTH_ASC,FILTER_HEALTH_DESC} = require('./actions.js')

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                recipesFilter: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case GET_DETAIL_RECIPE: 
        return  {
            ...state,
            detailRecipeR: action.payload
        }
        case GET_RECIPE_NAME:
        return {
            ...state,
            recipesFilter: action.payload
        }
        case FILTER_TIPOS:
            return {
                ...state,
                recipesFilter: state.recipes.filter(e => e.diets.includes(action.payload))
            }
        case FILTER_ATOZ:
            const filterRecipesAlfa = state.recipes.sort( function(x, y){
                if(x.name.toLowerCase() > y.name.toLowerCase()){
                    return 1;
                }
                if(y.name.toLowerCase() > x.name.toLowerCase()){
                    return -1
                }
                return 0
            })
            return {
                ...state,
                recipesFilter:filterRecipesAlfa.filter(e => e) 
            }
        case FILTER_ZTOA:
            return {
                ...state,
                recipesFilter: state.recipes.sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return 1;
                    }
                    return 0
                })
            }
        case FILTER_HEALTH_ASC:
            const filterRecipesHealthA = state.recipes.sort((a,b) => {
                if(a.healthScore > b.healthScore){
                    return 1;
                }
                if(b.healthScore > a.healthScore){
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                recipesFilter: filterRecipesHealthA.filter(e => e)
            }
        case FILTER_HEALTH_DESC:
            const filterRecipesHealth = state.recipes.sort((a,b) => { 
                if(a.healthScore > b.healthScore){
                    return -1;
                }
                if(b.healthScore > a.healthScore){
                    return 1;
                }
                return 0
            })
            return {
                ...state,
                recipesFilter: filterRecipesHealth.filter(e => e)
            }   
        case 'FROM_API':
            return {
                ...state,
                recipesFilter: state.recipes.filter(e => e.id.toString().length < 8)
            }
        case 'FROM_DATABASE':
            return {
                ...state,
                recipesFilter: state.recipes.filter(e => e.id.length > 8)
            }
    default: return {...state}
    }
}