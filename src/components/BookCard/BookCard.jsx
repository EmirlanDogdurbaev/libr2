import React from "react";
import classes from "./BookCard.module.scss";
import star from "../../assets/icons/star.svg";
import empt from "../../assets/icons/empty.svg";
import { Link } from "react-router-dom";
export default function BookCard({ data }) {
  const stars = new Array(Math.min(data.rating, 5)).fill("");
  const empty = new Array(5 - Math.min(data.rating, 5)).fill("");
  return (
    <div className={classes.BookCard}>
      <div className={classes.info}>
        <h3>{data.title}</h3>
        <span>{data.author}</span>
        <div className={classes.rating}>
          {stars.map((item, id) => (
            <div key={id}>
              <img src={star} alt="star" />
            </div>
          ))}
          {empty.map((item, id) => (
            <div key={id}>
              <img src={empt} alt="empty" />
            </div>
          ))}
        </div>
        <small>В наличии: {data.quantity}</small>
        <Link to={`/book/${data.id}`}>Узнать</Link>
      </div>
      <img className={classes.image} src={data.image} />
    </div>
  );
}
