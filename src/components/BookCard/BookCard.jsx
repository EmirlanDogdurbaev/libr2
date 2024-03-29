import React from 'react';
import classes from './BookCard.module.scss';
import { Link, useLocation } from 'react-router-dom';
import Stars from '../Stars/Stars';

export default function BookCard({ data }) {
  const location = useLocation();

  return (
    <div className={classes.BookCard}>
      <div className={classes.info}>
        <h3>{data.title}</h3>
        <span>{data.author}</span>
        {location.pathname !== '/basket' ? (
          <>
            <small>В наличии: {data.quantity}</small>
            <Link to={`/book/${data.id}`}>Узнать</Link>
          </>
        ) : null}
      </div>
      <img className={classes.image} src={data.image} />
    </div>
  );
}
