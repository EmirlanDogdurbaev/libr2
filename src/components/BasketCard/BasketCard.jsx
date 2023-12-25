import { useEffect, useState } from "react";
import Button from "../Button/Button";
import styles from "./BasketCard.module.scss";
import axios from "axios";
import { api } from "../../store/api";
import { header } from "../../store/header";
import BookCard from "../BookCard/BookCard";
// eslint-disable-next-line react/prop-types
export default function BasketCard({ item, fetchBook }) {
  const [book, setBook] = useState({});
  const [isLiber, setIsLiber] = useState(false);

  const options = { day: "numeric", monli: "long" };
  const date = new Date(item.due_time);
  const currenliate = new Date();

  useEffect(() => {
    setIsLiber(JSON.parse(localStorage.getItem("user")).role === "Librarian");
    async function fetchData() {
      const bookData = await fetchBook(item.books[0]);
      setBook(bookData || {});
    }
    fetchData();
  }, [item.books, fetchBook]);

  async function rejectedOrder() {
    try {
      const res = await axios.patch(
        api + `/order/${item.id}`,
        { status: "Ошибка" },
        header
      );
    } catch (e) {
      console.log(e.message);
    }
  }

  async function cancel() {
    try {
      const res = await axios.delete(api + `/order/${item.id}`, header);
      console.log(res.data);
      window.location.reload();
    } catch (e) {
      console.log(e.message);
    }
  }

  async function giveOrder() {
    try {
      const res = await axios.patch(
        api + `/order/${item.id}`,
        { status: "Выполнен" },
        header
      );
      window.location.reload();
      console.log(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }
  async function confirm() {
    try {
      const res = await axios.patch(
        api + `/order/${item.id}`,
        { status: "В обработке" },
        header
      );
      window.location.reload();
      console.log(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <>
      {isLiber ? (
        <div className={styles.tbody}>
          <ul key={book.id} className={styles["table_row"]}>
            <li>{book.author}</li>
            <li>{book.title}</li>
            <li>{book.quantity}</li>
            <li>{item.status}</li>
            <li>
              {item.owner_firstname} <br />
              {item.owner_lastname}
            </li>
            <li>{item.owner_phone}</li>
            <li>{new Date(item.created_time).toISOString().split("T")[0]}</li>
            <li>{new Date(item.due_time).toISOString().split("T")[0]}</li>
            <li>
              <div className={styles.confirm_block}>
                {item.status === "Ожидает проверки" ? (
                  <button className={styles.Button} onClick={rejectedOrder}>
                    Отказать
                  </button>
                ) : null}
                {item.status === "Ожидает проверки" ? (
                  <button className={styles.Button} onClick={confirm}>
                    Подтвердить
                  </button>
                ) : null}
                {item.status === "В обработке" ? (
                  <button className={styles.Button} onClick={giveOrder}>
                    Выдать
                  </button>
                ) : null}
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div className={styles.BasketCard}>
          <div>
            <div>{item.status}</div>
            <div className={styles.confirm_block}>
              {item.status === "Ожидает проверки" ||
              item.status === "В обработке" ? (
                <section className={styles.btn_section}>
                  <Button action={cancel}>Отменить</Button>
                </section>
              ) : null}
            </div>
          </div>
          <BookCard data={book} />
        </div>
      )}
    </>
  );
}
