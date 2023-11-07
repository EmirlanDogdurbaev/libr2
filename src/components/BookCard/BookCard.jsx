import React from 'react'
import classes from './BookCard.module.scss'
export default function BookCard({data}) {
  // console.log(data.rating);
  const stars = new Array(data.rating).fill('')
  const empty = new Array(5 - data.rating).fill('') 
  return (
    <div className={classes.BookCard}>
      <div>
        <h3>{data.title}</h3>
        <span>{data.author}</span>
        <div className={classes.rating}>
          {stars.map((item, id)=><div key={id}>*</div>)}
          {empty.map((item, id)=><div key={id}>-</div>)}
        </div>
        <div>В наличии: {data.quantity}</div>
        <button>Узнать</button>
      </div>
      <img className={classes.image} src={data.image}/>
    </div>
  )
}
