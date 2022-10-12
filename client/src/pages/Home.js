import React from 'react'
import { useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getRecipeName} from '../redux/actions.js';
import NavBar from '../components/NavBar.js';
import Cards from '../components/Cards.js'
import Pagination from '../components/Pagination.js';
import c from './Home.module.css';

function Home() {

    
    const dispatch = useDispatch();
   

  const recipes = useSelector(state => state.recipes)
  //PAGINADO
  const [currentPage,setCurrentPage] = useState(1);
  const [recipePorPagina] = useState(9);
  
  const indiceUltimo = currentPage * recipePorPagina;
  const indicePrimero = indiceUltimo - recipePorPagina;
  let currentRecipes = recipes.slice(indicePrimero, indiceUltimo);
  
  
  
  
  //Cambio de pagina
function pagina(pageNumber){
  return setCurrentPage(pageNumber)
}

//SEARCH
const [search,setSearch] = useState('');

const recipesFilter = useSelector(state => state.recipesFilter)
const recipesFilterPage = recipesFilter.slice(indicePrimero, indiceUltimo);


function handleSearch(event){
  event.preventDefault();
  const onlyAlfa = /^[A-Za-z ]+$/
  if(!search) return alert('Debe ingresar un nombre')
  if(!onlyAlfa.test(search)) return alert('Debe ingresar un valor valido')
  dispatch(getRecipeName(search))
  setSearch('')
}

  return (

    <div className={c.globalHome}>
      <NavBar 
      search={search}
      setSearch={setSearch}
      handleSearch={handleSearch}
      setCurrentPage={setCurrentPage}
      />

      <div className={c.divBtnCreate}>
         <Link to='/create'>
            <button className={c.btnCreate}>Create a new Recipe</button>
         </Link>
      </div>

      <Pagination 
      recipePorPagina={recipePorPagina} 
      totalRecipes={recipes.length} 
      recipesFilter={recipesFilter.length}
      pagina={pagina}
      />

      <Cards currentRecipes={currentRecipes} recipesFilter={recipesFilterPage} /> 
    </div>
  )
}

export default Home