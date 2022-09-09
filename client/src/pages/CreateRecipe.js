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
      const [myInputDiets,setMyInputDiets] = useState([])
    
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
        let valueInput = e.target.value.split(',')
        let exists = myDiets.includes(valueInput[0]);
        if(exists){
          myDiets = [...myDiets]
          return 
        } else if (valueInput[0].toString().length === 0){
          myDiets = [...myDiets]
          return
        }
        else {
          myDiets.push(valueInput[0]);
        }
        setMyInputDiets([...myInputDiets,valueInput[1]])
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
        }else if (input.summary.length === 0){
          alert('El campo summary no puede estar vacio')
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
        <div className={c.inputName}>
          <label className={c.labelStyle}>Name</label>
          <input type={'text'} id={'name'} name={'name'} value={input.name.toLowerCase()} onChange={handleChange} placeholder={'Ingresa un nombre'}></input>
          {errors.name && (<span>{errors.name}</span>)}
         </div><br/>

         <div className={c.inputSummary}>
          <label className={c.labelStyle}>Summary</label>
          {/* <input type={'text'} name={'summary'} value={input.summary} onChange={handleChange} placeholder={'Resumen de la receta'}></input>
          {errors.summary && (<span>{errors.summary}</span>)} */}
          <textarea type={'text'} name={'summary'} value={input.summary} onChange={handleChange} placeholder={'Resumen de la receta...'}></textarea>
          {errors.summary && (<span>{errors.summary}</span>)}
         </div>

         <div className={c.inputName}>
          <label className={c.labelStyle}>healthScore</label>
          <input type={'text'} name={'healthScore'} value={input.healthScore} onChange={handleChange} placeholder={'Puntaje de salud'}></input>
          {errors.healthScore && (<span>{errors.healthScore}</span>)}
         </div>

         <div className={c.inputInstructions}>
          <label className={c.labelStyle}>Instructions</label>
          {/* <input type={'text'} name={'analyzedInstructions'} value={input.analyzedInstructions} onChange={handleChange} placeholder={'Paso a paso de la receta'}></input>
          {errors.defense && (<span>{errors.defense}</span>)} */}
          <textarea type={'text'} name={'analyzedInstructions'} value={input.analyzedInstructions} onChange={handleChange} placeholder={'Paso a paso...'}></textarea>
          {errors.defense && (<span>{errors.defense}</span>)}
         </div>
         

        <div className={c.selectType}>
          <select onChange={handlerSelect}>
            <option value={''}> --Selecciona un tipo-- </option>
            {diets && diets.map(e => {
              return (<option key={e.id} value={e.id + ',' + e.name}>{e.name}</option>)
              })
            }
          </select>
          {errors.diets && (<span>{errors.diets}</span>)}
        </div><br/>

        <div className={c.listType}>
          <ul>
            <label>Tipos seleccionados:</label>
            <li>
              {myInputDiets.map(e => e + ',')}
            </li>
          </ul>
        </div><br/>
        <div className={c.sumbitBtn}>
         <input type='submit' className={c.submit}></input>
        </div>
      </form>
      </div>
    </div>
  )
}

// "analyzedInstructions": [
//   {
//   "name": "",
//   "steps": [
//   {
//   "number": 1,
//   "step": "Remove the cauliflower's tough stem and reserve for another use. Using a food processor, pulse cauliflower florets until they resemble rice or couscous. You should end up with around four cups of \"cauliflower rice.\"",
//   "ingredients": [
//   {
//   "id": 10011135,
//   "name": "cauliflower florets",
//   "localizedName": "cauliflower florets",
//   "image": "cauliflower.jpg"
//   },
//   {
//   "id": 10111135,
//   "name": "cauliflower rice",
//   "localizedName": "cauliflower rice",
//   "image": "cauliflower.jpg"
//   },
export default CreateRecipe