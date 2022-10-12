import React,{useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import c from './CreateRecipe.module.css';
import {getDiets, postRecipe} from '../redux/actions.js';
import { validate } from './../utils/validate';
function CreateRecipe({setRefresh}) {
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
     

      const handlerSelect = (e) => {
        e.preventDefault();
        let myDiets = input.diets;
        let valueInput = e.target.value.split('.')
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
        setMyInputDiets([...myInputDiets, e.target.value])
        setInput({
          ...input,
          diets: myDiets
        })
        setErrors(validate({
          ...input,
          diets: myDiets
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

      // const [dietsSelect, setDietsSelect] = useState([])
      // function onClose(id) {
      //   setDietsSelect(d => d.filter(c => c.id !== id));
      // }

      const handleRemoveDiet = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        console.log(myInputDiets)
        console.log(input.diets)
        setInput({
            ...input,
            diets: input.diets.filter(diet=> diet !== e.target.value.split('.')[0])
        })
        setMyInputDiets(myInputDiets.filter(name => name !== e.target.value))
        setErrors(validate({
            ...input,
            diets: input.diets.filter(diet=> diet !== e.target.value)
        }))
    }
  return (
    <div className={c.global}>
      <Link to={'/home'}>
      <button className={c.btnBack} onClick={() => setRefresh(true)}>Back</button>
      </Link>      
      <h2 className={c.title}>Crea tu propia receta</h2>
      <div className={c.cardCreate}>
      <form onSubmit={handlerSubmit}>
        <div className={c.inputName}>
          <label className={c.labelStyle}>Name</label>
          <input type={'text'} id={'name'} name={'name'} value={input.name.toLowerCase()} onChange={handleChange} placeholder={'Ingresa un nombre'}></input>
          {errors.name && (<span className={c.error}>{errors.name}</span>)}
         </div><br/>

         <div className={c.inputSummary}>
          <label className={c.labelStyle}>Summary</label>
          {/* <input type={'text'} name={'summary'} value={input.summary} onChange={handleChange} placeholder={'Resumen de la receta'}></input>
          {errors.summary && (<span>{errors.summary}</span>)} */}
          <textarea type={'text'} name={'summary'} value={input.summary} onChange={handleChange} placeholder={'Resumen de la receta...'}></textarea>
          {errors.summary && (<span className={c.error}>{errors.summary}</span>)}
         </div>

         <div className={c.inputName}>
          <label className={c.labelStyle}>healthScore</label>
          <input type={'text'} name={'healthScore'} value={input.healthScore} onChange={handleChange} placeholder={'Puntaje de salud'}></input>
          {errors.healthScore && (<span className={c.error}>{errors.healthScore}</span>)}
         </div>

         <div className={c.inputInstructions}>
          <label className={c.labelStyle}>Instructions</label>
          {/* <input type={'text'} name={'analyzedInstructions'} value={input.analyzedInstructions} onChange={handleChange} placeholder={'Paso a paso de la receta'}></input>
          {errors.defense && (<span>{errors.defense}</span>)} */}
          <textarea type={'text'} name={'analyzedInstructions'} value={input.analyzedInstructions} onChange={handleChange} placeholder={'Paso a paso...'}></textarea>
          {errors.defense && (<span className={c.error}>{errors.defense}</span>)}
         </div>
         

        <div className={c.selectType}>
          <select onChange={handlerSelect}>
            <option value={''}> --Selecciona un tipo-- </option>
            {diets && diets.map(e => {
              return (<option key={e.id} value={e.id + '.' + e.name}>{e.name}</option>)
              })
            }
          </select>
          {errors.diets && (<span className={c.error}>{errors.diets}</span>)}
        </div><br/>

        <div className={c.listType}>
          <ul>
            <label>Tipos seleccionados:</label>
            {
            myInputDiets?.map( e=>{ 
              return(
              <ul >
                <li className={c.dietSelected}>
                <button className={c.closeButton} value={e} onClick={(e)=>handleRemoveDiet(e)}>x</button>
                {e.split('.')[1]} 
                </li>
              </ul>
            )
            })
            }
          </ul>
        </div><br/>
        <div>
        <div className={c.sumbitBtn}>
         <input type='submit' className={c.submit} value='Crear'></input>
        </div>
        </div>
      </form>
      </div>
    </div>
  )
}

export default CreateRecipe