import React, { useEffect, useState } from "react";
import star from "../../assets/icons/star.svg";
import empt from "../../assets/icons/empty.svg";
import classes from "./Stars.module.scss";
export default function Stars({ amount, book, clickable, setGrade }) {
  const [stars, setStars] = useState([]);
  const [empty, setEmpty] = useState([]);
  const all = [...stars, ...empty];
  function changeStars(id) {
    if (clickable) {
      setStars(new Array(id + 1).fill("s"));
      setEmpty(new Array(5 - (id + 1)).fill("e"));
      setGrade(stars.length)
    }
  }
  useEffect(() => {
    const roundedAmount = Math.round(amount) || 0; // Use 0 as the default value if amount is undefined
    setStars(new Array(roundedAmount).fill("s"));
    setEmpty(new Array(5 - roundedAmount).fill("e"));
  }, [amount, book]);
  return (
    <div className={classes.Stars}>
      {all.map((item, id) => (
        <div key={id}>
          {item === "s" ? (
            <img src={star} alt="star" onClick={()=>changeStars(id)} />
          ) : item === "e" ? (
            <img src={empt} alt="empty" onClick={()=>changeStars(id)} />
          ) : null}
        </div>
      ))}
    </div>
  );
}
