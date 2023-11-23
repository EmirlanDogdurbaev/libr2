import React, { useEffect, useState } from "react";
import classes from "./ProfileBookCard.module.scss";
import Stars from "../Stars/Stars";

function ProfileBookCard({ data, fetchBook }) {
  const [book, setBook] = useState({});
  const options = { day: "numeric", month: "long"};
  const date = new Date(data.due_time);
  const currentDate = new Date();
  const timeDifference = date - currentDate;
  const formattedDate = date.toLocaleDateString("ru-Ru", options);
  const daysDifference =
    Math.floor(timeDifference / (1000 * 60 * 60 * 24)) <= 0
      ? "Просрочено"
      : Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  useEffect(() => {
    async function fetchData() {
      const bookData = await fetchBook(data.books[0]);
      setBook(bookData || {});
    }
    fetchData();
  }, []);
  return (
    <div className={classes.wrap}>
      <div className={classes.first}>
        <span>
          <p>Вернуть до:</p>
          <h2>{formattedDate}</h2>
        </span>
        <span>
          <p>Осталось:</p>
          <h2>{daysDifference} дней</h2>
        </span>
      </div>
      <div className={classes.second}>
        <div className={classes.desc}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <Stars amount={book.rating} />
        </div>
        <img src={book.image} alt="book image" />
      </div>
    </div>
  );
}

export default ProfileBookCard;
