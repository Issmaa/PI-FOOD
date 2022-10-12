import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './NavBar.module.css';
import {getDiets, recipeAToZ,recipeZToA,tiposDiets,HealthAsc,HealthDesc,fromDataBase,fromApi} from '../redux/actions.js';

function NavBar({ search, setSearch,handleSearch,setCurrentPage}) {
  
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets);
 

    useEffect(() => {
       dispatch(getDiets())
    }, [dispatch])

    function handlerTipos(e){
      dispatch(tiposDiets(e.target.value))
      setCurrentPage(1)
    }
    return (
        <nav className={s.nav}>
      <a 
         href='/home' 
         className={s.siteName}>Nóstimo</a>

      {/* Buscador */}
      <div className={s.inputNavBar}>
      <form onSubmit={(e) => handleSearch(e)}>
      <input 
         className={s.inputBar}
         placeholder='Encuentra tu receta...'
         value={ search} 
         name= 'search'
         onChange={e => setSearch(e.target.value.toLowerCase())}
          />
         <button type={'submit'} className={s.btnSearch}>Buscar</button>
      </form>    
      </div>

      {/* Filtro de tipos */}
      <div>
         <select onChange={handlerTipos} className={s.filtroTipos}>
            <option value={''}> Tipos </option>
            {diets && diets.map(e => {
               return (<option key ={e.id} value={e.name}>{e.name}</option>)
               })
            }
         </select>
      </div>
      {/* Fitro orden alfabetico */}
      <div>
         <ul className={s.filterAlfa}>
            <li><button onClick={() => {dispatch(recipeAToZ()); setCurrentPage(1)}} > A-Z </button></li>
            <li><button onClick={() => {dispatch(recipeZToA()); setCurrentPage(1)}} > Z-A </button></li>
         </ul>
      </div>
      {/* Filtro HealthScore*/}
      <div className={s.divHealth}>
         <ul className={s.btnHealthScore}> 
            <li><button onClick={() => {dispatch(HealthAsc()); setCurrentPage(1)}} > Less Healthy</button></li>
            <li><button onClick={() => {dispatch(HealthDesc()); setCurrentPage(1)}} >More Healthy</button></li>
         </ul>
      </div>
      <div className={s.divHealth}>
         <ul className={s.btnHealthScore}>
            <li><button onClick={() => {dispatch(fromApi()); setCurrentPage(1)}}>APi</button></li>
            <li><button onClick={() => {dispatch(fromDataBase()); setCurrentPage(1)}}>DataBase</button></li>
         </ul>
      </div>
   </nav>
  )
}

export default NavBar


