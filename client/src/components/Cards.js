import React,{useState} from 'react'
import Card from './Card.js';
import s from './Cards.module.css';
import Loading from '../pages/Loading.js';
import notFound from '../images/notFound.png';
function Cards({currentRecipes,recipesFilter}) {

  if(!currentRecipes.length) return (<Loading/>)

  if(recipesFilter.length) return (
    <div className={s.containerCards}>
      {recipesFilter && recipesFilter?.map(e => 
          <Card 
            key={e.id} 
            id={e.id} 
            name={e.name} 
            image={e.image ? e.image : notFound} 
            diets={e.diets + " "}
            healthScore={e.healthScore}
          />
      )}
    </div>)
    return (
      <div className={s.containerCards}>
        {currentRecipes && currentRecipes?.map(e => 
            <Card 
              key={e.id} 
              id={e.id} 
              name={e.name} 
              image={e.image ? e.image : notFound}  
              diets={e.diets + " "}
              healthScore={e.healthScore}

            />
        )}
      </div>
    )
}

export default Cards