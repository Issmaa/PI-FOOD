import React from 'react'
import s from './Card.module.css';
import {Link} from 'react-router-dom';

function Card({id,name,image,diets}) {
  return (
    <div className={s.cardContainer}>
      <Link key={id} to={`/detail/${id}`} className={s.link}>
      <div key={id} className={s.imageConatainer}>
      <img src={image} alt={name} className={s.image}/>
      </div>
      <div className={s.nameContainer}>
      <h3 className={s.name}>{name}</h3>
      </div>
      <div className={s.textContainer}><strong>Diets: </strong>&nbsp;  
      <h4 className={s.dietsText}> {diets}</h4>
      </div>
      </Link>
   </div>
  )
}

export default Card