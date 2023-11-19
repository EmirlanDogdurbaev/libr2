import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import Button from "../Button/Button";
import classes from "./BasketCard.module.scss";
import axios from "axios";
import { api } from "../../store/api";
import { header } from "../../store/header";
export default function BasketCard({ item, fetchBook }) {
  const [book, setBook] = useState({});
  const [isLiber, setIsLiber] = useState(false);
  useEffect(() => {
    setIsLiber(JSON.parse(localStorage.getItem("user")).status === "Librarian");
    async function fetchData() {
      const bookData = await fetchBook(item.books[0]);
      setBook(bookData || {});
    }
    fetchData();
  }, [item.books, fetchBook]);
  async function removeOrder() {
    const res = await axios.delete(api + `/change/order/${item.id}/`, header);
    console.log(res.data);
  }
  return (
    <div className={classes.BasketCard}>
      <div>
        <div>{item.status}</div>

        {isLiber ? (
          <div>
            <Button>Подтвердить</Button>
          </div>
        ) : null}
        <Button action={removeOrder}>Удалить</Button>
      </div>
      <BookCard data={book} />
    </div>
  );
}
