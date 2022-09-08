import React from 'react'
import s from '../components/Pagination.module.css';


function Pagination({ recipePorPagina, totalRecipes, recipesFilter, pagina }) {
    let totalRecipesPage = 0;
    if(totalRecipes) totalRecipesPage = totalRecipes
    if(recipesFilter) totalRecipesPage = recipesFilter

    const numeroDePaginas = [];
    for(let i = 1; i <= Math.ceil(totalRecipesPage / recipePorPagina); i++){
        numeroDePaginas.push(i)
    }
    return (
    <nav>
        <ul className={s.paginationContainer}>
        {numeroDePaginas?.map(num => (
            <li key={num} className='page-item'>
                <button onClick={() => pagina(num)} className={s.btnPagination}>{num}</button>
            </li>
        ))}
        </ul>
    </nav>
  )
}

export default Pagination