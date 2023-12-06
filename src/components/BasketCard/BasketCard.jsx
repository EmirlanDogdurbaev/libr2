import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import Button from "../Button/Button";
import styles from "./BasketCard.module.scss";
import axios from "axios";
import { api } from "../../store/api";
import { header } from "../../store/header";

export default function BasketCard({ item, fetchBook }) {
  const [book, setBook] = useState({});
  const [isLiber, setIsLiber] = useState(false);

  console.log(book);
  useEffect(() => {
    setIsLiber(JSON.parse(localStorage.getItem("user")).status === "Librarian");
    async function fetchData() {
      const bookData = await fetchBook(item.books[0]);
      setBook(bookData || {});
    }
    fetchData();
  }, [item.books, fetchBook]);
  async function rejectedOrder() {
    const res = await axios.patch(
      api + `/change/order/${item.id}/`,
      { status: "Ошибка" },
      header
    );
    console.log(res.data);
  }

  async function giveOrder() {
    const res = await axios.patch(
      api + `/change/order/${item.id}/`,
      { status: "Выполнен" },
      header
    );
    console.log(res.data);
  }

  async function confirm() {
    try {
      const res = await axios.patch(
        api + "/change/order/" + item.id + "/",
        { status: "В обработке" },
        header
      );
      console.log(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.bookTable}>
        <thead>
          <tr>
            <th>Автор</th>
            <th>Название книги</th>
            <th>Рейтинг книги</th>
            <th>Количество книг</th>
            <th>item.status</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr key={book.id}>
            <td>{book.author}</td>
            <td>{book.title}</td>
            <td>{book.rating}</td>
            <td>{book.quantity}</td>
            <td>{item.status}</td>
            <td>
              {isLiber ? (
                <div className={styles.confirm_block}>
                  {item.status === "Ожидает проверки" ? (
                    <section className={styles.btn_section}>
                      <Button action={confirm}>Подтвердить</Button>
                    </section>
                  ) : null}
                  {item.status === "Ожидает проверки" ? (
                    <section className={styles.btn_section}>
                      <Button action={rejectedOrder}>Удалить</Button>
                    </section>
                  ) : null}
                  {item.status === "В обработке" ? (
                    <section className={styles.btn_section}>
                      <Button action={giveOrder}>Выдать книгу</Button>
                    </section>
                  ) : null}
                </div>
              ) : null}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// <div className={classes.BasketCard}>
//   <div>
//     <div>{item.status}</div>
//     {isLiber ? (
//       <div className={classes.confirm_block}>
//         <div>
//           От : <span>{item.owner}</span>
//         </div>
//         {item.status === "Ожидает проверки" ? (
//           <section className={classes.btn_section}>
//             <Button action={confirm}>Подтвердить</Button>
//           </section>
//         ) : null}
//         {item.status === "Ожидает проверки" ? (
//           <section className={classes.btn_section}>
//             <Button action={rejectedOrder}>Удалить</Button>
//           </section>
//         ) : null}
//         {item.status === "В обработке" ? (
//           <section className={classes.btn_section}>
//             <Button action={giveOrder}>Выдать книгу</Button>
//           </section>
//         ) : null}
//       </div>
//     ) : null}
//   </div>
// <BookCard data={book} />
// </div>
