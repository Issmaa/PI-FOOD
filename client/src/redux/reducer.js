const initialState = {
    recipes: [],
    diets: []
}

const {GET_RECIPES, GET_DIETS} = require('./actions.js')

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
    default: return {...state}
    }
}