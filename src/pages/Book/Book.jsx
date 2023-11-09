import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../store/api";
import cl from "./Book.module.scss";
import Stars from "../../components/Stars/Stars";

export default function Book() {
  const params = useParams();
  const [book, setBook] = useState({});


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
              {book.description}
            </p>
          </div>
          <div className={cl.rating}>
            <h3>{book.rating}</h3>
            <div>
              <Stars amount={book.rating} book={book} />
            </div>
            <div>
              <small>В наличии: 3</small>
              <button>Заказать</button>
            </div>
          </div>
        </article>
        <div className={cl.CommentBtn}>
          <form action="" >
            <label htmlFor="">
              На сколько это книга вам понравилось?
              <input type="text" placeholder="my comment" />
            </label>
            <label htmlFor="">
              <textarea type="text" placeholder="my comment" className={cl.body}/>
            </label>
            <button type="submit">Отправить</button>
          </form>
        </div>
        <h3 className={cl.response}>Отзывы</h3>
        <div className={cl.comment_cont}></div>
      </section>
    </div>
  );
}
