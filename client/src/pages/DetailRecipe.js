import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useParams,Link} from 'react-router-dom'
import c from './DetailRecipe.module.css';
import {detailRecipe} from '../redux/actions.js';
import notFound from '../images/notFound.png';
import Loading from './Loading';
function DetailRecipe() {

  const dispatch = useDispatch();

   const detailRecipeR = useSelector(state => state.detailRecipeR)

   const {id} = useParams();

   useEffect(() => {
      dispatch(detailRecipe(id))
   },[dispatch,id])


   if(Object.keys(detailRecipeR).length){
    return (
      <div className={c.globalContainer}>
        <div className={c.btnback}>
        <Link to={'/home'}>
          <button>Back</button>
        </Link>
        </div>
        {
        <div className={c.containerBack}>
        <div className={c.containerCard}>
          <div className={c.imageContainer}>
              <img className={c.image} src={detailRecipeR.image ? detailRecipeR.image : notFound} alt={detailRecipeR.name}/>
          </div>
          <div className={c.name}>
              <h2>{detailRecipeR.name}</h2>
          </div>
              <div className={c.littleInfo}>
              <div className={c.divInfo}>
                  <h3 className={c.titleInfo}>DishTypes</h3>
                  <p className={c.nameInfo}>{detailRecipeR.dishTypes + " "}</p>
                </div>
                <div className={c.divInfo}>
                  <h3 className={c.titleInfo}>HealthScore</h3>
                  <p className={c.nameInfoHealth}>{detailRecipeR.healthScore}</p>
                </div>  
                <div className={c.divInfo}>
                  <h3 className={c.titleInfo}>Diets</h3>
                  <p className={c.nameInfoDiets}>{detailRecipeR.diets + "  "}</p>
                </div>
              </div>
              <>
              <h4>Summary:</h4>
              <p className={c.summary}>{detailRecipeR.summary}</p>
              </>
              <h4>Ingredients:</h4>
              <div className={c.divIngredients}>
                
              {detailRecipeR.analyzedInstructions[0] && detailRecipeR.analyzedInstructions[0].steps?.map(e => {
                return (
                <div className={c.divIngredients}>
                  {e.ingredients?.map(e => (
                    <ul className={c.listIngredients}>
                      <li key={e.id}>{e.name + ' '}</li>
                    </ul>
                    ))}
                </div>
                )
              }) 
              }
              </div>
              <h4>Instructions:</h4>
              <div>
              {Array.isArray(detailRecipeR.analyzedInstructions) ? detailRecipeR.analyzedInstructions[0] && detailRecipeR.analyzedInstructions[0].steps?.map(e => {
                return (
                <div key={e.number}>
                  <h4>Step {e.number}</h4>
                  <p key={e.number} className={c.nameInfoSteps}>{e.step}</p>
                </div>
                )
              }) : <div><p className={c.instructions}>{detailRecipeR.analyzedInstructions}</p></div>
              }
              </div>
              
           </div>
           </div>
        }
        
      </div>
    )
    } else {
      return (<Loading/>)
    }
}

export default DetailRecipe