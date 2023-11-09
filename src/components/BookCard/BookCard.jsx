import React from 'react';
import classes from './BookCard.module.scss';
import { Link } from 'react-router-dom';
import Stars from '../Stars/Stars';

export default function BookCard({ data }) {
  
  return (
    <div className={classes.BookCard}>
      <div className={classes.info}>
        <h3>{data.title}</h3>
        <span>{data.author}</span>
        <div className={classes.rating}>
          <Stars amount={data.rating}/>
        </div>
        <small>В наличии: {data.quantity}</small>
        <Link to={`/book/${data.id}`}>Узнать</Link>
      </div>
      <img className={classes.image} src={data.image} />
    </div>
  );
}
