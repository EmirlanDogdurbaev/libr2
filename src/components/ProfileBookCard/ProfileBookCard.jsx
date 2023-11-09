import React from "react";
import classes from "./ProfileBookCard.module.scss";
import Stars from "../Stars/Stars";

function ProfileBookCard({ data }) {
  // console.log(data);
  const book = {
    date: "21.04.2023",
    time: "8 days",
  };

  return (
    <div className={classes.wrap}>
      <div className={classes.first}>
        <span>
          <p>Вернуть до:</p>
          <h2>{book.date}</h2>
        </span>
        <span>
          <p>Осталось:</p>
          <h2>{book.time}</h2>
        </span>
      </div>
      <div className={classes.second}>
        <div className={classes.desc}>
          <h3>{data.title}</h3>
          <p>{data.author}</p>
            <Stars amount={data.rating} />
        </div>
        <img src={data.image} alt="book image" />
      </div>
    </div>
  );
}

export default ProfileBookCard;
