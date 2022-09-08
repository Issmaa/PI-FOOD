import React from 'react'
import {Link} from 'react-router-dom';
import s from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={s.global}>
      <div className={s.name}><h1>Nóstimo</h1></div>
    <div className={s.globalContainer}>
      <div className={s.containerTitle}>
        <h2 className={s.title}>Encuentra las mejores recetas y explora nuevas dietas.</h2>
      </div>
      <div className={s.secondTitle}>
        <p>La receta perfecta que estas buscando para algo delicioso!</p>
      </div>
      <div className={s.containerBtn}>
        <Link to='/home'><button className={s.btnLanding}>Entrar</button></Link>
      </div>
    </div>
    </div>
  )
}

export default LandingPage