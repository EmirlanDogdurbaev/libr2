import React, { useEffect, useState } from "react";
import star from "../../assets/icons/star.svg";
import empt from "../../assets/icons/empty.svg";
import classes from './Stars.module.scss'
export default function Stars({ amount, book }) {
  const [stars, setStars] = useState([]);
  const [empty, setEmpty] = useState([]);
  useEffect(() => {
    const roundedAmount = Math.round(amount) || 0; // Use 0 as the default value if amount is undefined
    setStars(new Array(roundedAmount).fill(""));
    setEmpty(new Array(5 - roundedAmount).fill(""));
  }, [amount, book]);
  return (
    <div className={classes.Stars}>
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
  );
}
