import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../store/api";
import cl from "./Book.module.scss";
import Stars from "../../components/Stars/Stars";
import { header } from "../../store/header";

export default function Book() {
  const params = useParams();
  const [book, setBook] = useState({});
  const [dueDate, setDueDate] = useState("");
  const [text, setText] = useState("");
  const [grade, setGrade] = useState(0);
  const [comments, setComments] = useState([])
  async function fetchBook() {
    try {
      const res = await axios.get(
        api + "/change/book/" + params.id,
        header
      );
      setBook(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }
  async function fetchReviews() {
    try {
      const res = await axios.get(
        api + "/list/review/" + params.id,
        header
      );
      setComments(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }
  async function orderBook() {
    try {
      const res = await axios.post(
        api + "/create/order",
        {
          books: [book.id],
          due_time: dueDate,
        },
        header
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function sendReview(e) {
    e.preventDefault();
    console.log(book.id);
    try {
      const res = await axios.post(
        api + "/create/review",
        {
          text,
          grade,
          book: book.id,
        },
        header
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, []);

  return (
    <div className={cl.Book}>
      <section>
        <article className={cl.BookInfo}>
          <img src={book.image} alt="" />
          <div className={cl.text}>
            <h3>{book.title}</h3>
            <h4>{book.author}</h4>
            <p id="content">{book.description}</p>
          </div>
          <div className={cl.rating}>
            <h3>{book.rating}</h3>
            <div>
              <Stars amount={book.rating} book={book} />
            </div>
            <div>
              <label>Верну до</label>
              <input type="date" onChange={(e) => setDueDate(e.target.value)} />
              <small>В наличии: 3</small>
              <button onClick={orderBook}>Заказать</button>
            </div>
          </div>
        </article>
        <div className={cl.CommentBtn}>
          <form onSubmit={(e) => sendReview(e)}>
            <label htmlFor="comment">
              На сколько это книга вам понравилось?
            </label>
            <Stars
              amount={0}
              book={book}
              clickable={true}
              setGrade={setGrade}
            />
            <textarea
              type="text"
              id="comment"
              placeholder="comment"
              className={cl.body}
              onChange={(e) => setText(e.target.value)}
            />
            <button>Отправить</button>
          </form>
        </div>
        <h3 className={cl.response}>Отзывы</h3>
        <div className={cl.comment_cont}>
          {comments.map((i, id)=>{
            return <div key={id}>
            <h2>{i.author}</h2>

            <Stars amount={i.grade} book={book} />
            <p>{i.text}
            </p>
          </div>
          })}
        </div>
      </section>
    </div>
  );
}
