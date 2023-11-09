import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../store/api";

export default function Book() {
  const params = useParams();
  const [book, setBook] = useState({});
  async function fetchBook() {
    try {
      const res = await axios.get(api + "/change/book/" + params.id);
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
          {/* <img src={img} alt="" /> */}
          <div className={cl.text}>
            <h3>Java spring framework</h3>
            <h4>Amber Smith</h4>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam
              voluptatum laboriosam tempora velit ipsum eaque explicabo quas
              animi corrupti, magni commodi sed dolorum consequatur, accusamus
              consequuntur temporibus ab. Sit, aliquam!
            </p>
          </div>
          <div className={cl.rating}>
            <h3>4,2</h3>
            <div>
              <small>В наличии: 3</small>
              <button>Заказать</button>
            </div>
          </div>
        </article>
        <h3 className={cl.response}>Отзывы</h3>
        <div className={cl.comment_cont}>
          <Comment />
          <Comment />
          <Comment />

          <Comment />
        </div>
      </section>
    </div>
  );
}
