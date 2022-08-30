import React from 'react'
import { getRecipes } from '../redux/actions.js';
import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import NavBar from '../components/NavBar.js';

function Home() {

    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes())
  },[dispatch])

  const recipes = useSelector(state => state.recipes)
  console.log(recipes)
  return (
    <div>
      <NavBar/>
        {recipes?.map(e => <div><h2>{e.name}</h2><img src={e.image} alt={e.name}/></div>)}
    </div>
  )
}

export default Home