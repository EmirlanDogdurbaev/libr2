import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../store/api";
import cl from "./Book.module.scss";
import Stars from "../../components/Stars/Stars";

export default function Book() {
  const params = useParams();
  const [book, setBook] = useState({});
  const maxChars = 1000;
  const [dueDate, setDueDate] = useState("");

  async function fetchBook() {
    try {
      const res = await axios.get(api + "/change/book/" + params.id + "/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBook(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }
  async function orderBook() {
    try {
      const res = await axios.post(api + "/create/order/", {
        book: book.id,
        due_time: dueDate,
      });
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <div className={cl.Book}>
      <section>
        <article className={cl.BookInfo}>
          <img src={book.image} alt="" />
          <div className={cl.text}>
            <h3>{book.title}</h3>
            <h4>{book.author}</h4>
            <p id="content">
              {/* {book.description && book.description.length > 450
                ? `${rezka}...`
                : rezka} */}

              {book.description}
            </p>
          </div>
          <div className={cl.rating}>
            <h3>{book.rating}</h3>
            <div>
              <Stars amount={book.rating} book={book} />
            </div>
            <div>
              <input type="date" onChange={(e) => setDueDate(e.target.value)} />
              <small>В наличии: 3</small>
              <button onClick={orderBook}>Заказать</button>
            </div>
          </div>
        </article>
        <h3 className={cl.response}>Отзывы</h3>
        <div className={cl.comment_cont}>
          {/* <Comment />
          <Comment />
          <Comment />

          <Comment /> */}
        </div>
      </section>
    </div>
  );
}
