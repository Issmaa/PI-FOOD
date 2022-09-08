import React,{useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import c from './CreateRecipe.module.css';
import {getDiets, postRecipe} from '../redux/actions.js';
import { validate } from './../utils/validate';
function CreateRecipe() {
  const dispatch = useDispatch();

    const [input,setInput] = useState({
        name: '',
        summary: '',
        healthScore: '',
        analyzedInstructions: '',
        diets: []
      })
    
      const [errors, setErrors] = useState({})
    
      const diets = useSelector(state => state.diets);
    
      useEffect(() => {
        dispatch(getDiets())
      }, [dispatch])
    
      validate(input);
    
      const handleChange = (e) => {
        e.preventDefault();
        setInput({
          ...input,
          [e.target.name]: e.target.value
        })
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
        }))
      }
    

      //Checar esta parte de cuando se selecciona uno igual
      const handlerSelect = (e) => {
        e.preventDefault();
    
        let myDiets = input.diets;
        let exists = myDiets.includes(e.target.value);
        if(exists){
          myDiets = [...myDiets]
        } else if (e.target.value.length === 0){
          myDiets = [...myDiets]
        }
        else {
          myDiets.push(e.target.value);
        }
    
        setInput({
          ...input,
          diets: myDiets
        })
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
        }))
      }

      const handlerSubmit = (e) => {
        e.preventDefault();
        if(Object.values(errors).length > 0){
          alert('Porfavor complete todos los campos correctamente')
        } else if(input.name.length === 0){
          alert('El campo name no puede estar vacio')
        } else {
          dispatch(postRecipe(input))
          alert('Receta creada correctamente')
          setInput({
            name: '',
            summary: '',
            healthScore: '',
            analyzedInstructions: '',
            diets: []
          })
        }
      }


  return (
    <div className={c.global}>
      <Link to={'/home'}>
      <button className={c.btnBack}>Back</button>
      </Link>      
      <h2 className={c.title}>Crea tu propia receta</h2>
      <div className={c.cardCreate}>
      <form onSubmit={handlerSubmit}>
        <div className={c.input}>
          <label>Nombre:</label>
          <input type={'text'} id={'name'} name={'name'} value={input.name} onChange={handleChange} placeholder={'Ingresa un nombre'}></input>
          {errors.name && (<span>{errors.name}</span>)}
         </div><br/>

         <div className={c.input}>
          <label>Summary:</label>
          <input type={'text'} name={'summary'} value={input.summary} onChange={handleChange} placeholder={'Resumen de la receta'}></input>
          {errors.summary && (<span>{errors.summary}</span>)}
         </div>

         <div className={c.input}>
          <label>healthScore:</label>
          <input type={'text'} name={'healthScore'} value={input.healthScore} onChange={handleChange} placeholder={'Puntaje de salud'}></input>
          {errors.healthScore && (<span>{errors.healthScore}</span>)}
         </div>

         <div className={c.input}>
          <label>analyzedInstructions:</label>
          <input type={'text'} name={'analyzedInstructions'} value={input.analyzedInstructions} onChange={handleChange} placeholder={'Paso a paso de la receta'}></input>
          {errors.defense && (<span>{errors.defense}</span>)}
         </div>

        <div className={c.selectType}>
          <select onChange={handlerSelect}>
            <option value={''}> --Selecciona un tipo-- </option>
            {diets && diets.map(e => {
              return (<option key={e.id} value={e.id}>{e.name}</option>)
              })
            }
          </select>
          {errors.diets && (<span>{errors.diets}</span>)}
        </div><br/>

        <div className={c.listType}>
          <ul>
            <label>Tipos seleccionados:</label>
            <li>
              {input.diets + ', '}
            </li>
          </ul>
        </div><br/>

         <input type={'submit'} className={c.submit}></input>
      </form>
      </div>
    </div>
  )
}

export default CreateRecipe