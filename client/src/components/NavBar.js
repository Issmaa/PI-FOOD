import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './NavBar.module.css';
import {getDiets} from '../redux/actions.js';

function NavBar({onSearchChange,search, handlerChange, handlerSelectFilter, handlerSelectFrom, aToZ,filtroAttackAsc,menorSetentaFilter}) {
  
    const dispatch = useDispatch();
    const types = useSelector(state => state.diets);
 
    useEffect(() => {
       dispatch(getDiets())
    }, [dispatch])

    return (
        <nav className={s.nav}>
      {/* Nombre de la pagina */}
      <a 
         href='/home' 
         className={s.siteName}>RecipesWorldFood</a>

      {/* Buscador de pokemons */}
      <input 
         className={s.inputNavBar} 
         placeholder='Buscar...'
         value={ search } 
         onChange={ onSearchChange } >
      </input>
      <button onClick={handlerChange} className={s.btnSearch}>Buscar</button>

      {/* Filtro de tipos */}
      <div>
         <select onChange={handlerSelectFilter} className={s.filtroTipos}>
            <option value={''}> Tipos </option>
            {types && types.map(e => {
               return (<option key ={e.id} value={e.name}>{e.name}</option>)
               })
            }
         </select>
      </div>

      <div>
         <select onChange={handlerSelectFrom} className={s.filterFrom}>
            <option value={''}>From </option>
            <option value={'DataBase'}>DataBase</option>
            <option value={'Api'}>Api</option>
         </select>
      </div>

      
      <div>
         <ul className={s.filterAlfa}>
            <li><button onClick={aToZ} value={'aToZ'}> A-Z </button></li>
            <li><button onClick={aToZ} value={'zToA'}> Z-A </button></li>
         </ul>
      </div>
      <div>
         <ul className={s.btnAttack}> Attack
            <li><button onClick={filtroAttackAsc} value={'filtroAttackAsc'}>Ascendant</button></li>
            <li><button onClick={filtroAttackAsc} value={'filtroAttackDesc'}>Descendant</button></li>
         </ul>
      </div>
   </nav>
  )
}

export default NavBar