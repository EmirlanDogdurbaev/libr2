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

  const options = { day: "numeric", month: "long" };
  const date = new Date(item.due_time);
  const currentDate = new Date();
  const timeDifference = date - currentDate;
  const formattedDate = date.toLocaleDateString("ru-Ru", options);
  const daysDifference =
    Math.floor(timeDifference / (1000 * 60 * 60 * 24)) <= 0
      ? "Просрочено"
      : Math.floor(timeDifference / (1000 * 60 * 60 * 24));

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
      console.log(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }


  console.log(item)
  return (
    <>
      {isLiber ? (
        <div className={styles.tableContainer}>
          <table className={styles.bookTable}>
            <a href=""></a>
            <thead>
              <tr>
                <th>Автор</th>
                <th>Название книги</th>
                <th>Количество книг</th>
                <th>статус</th>
                <th>заказчик</th>
                <th>tel</th>
                <th>взял с</th>
                <th>вернуть до</th>

                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr key={book.id}>
                <td>{book.author}</td>
                <td>{book.title}</td>
                <td>{book.quantity}</td>
                <td>{item.status}</td>
                <td>{item.owner_firstname}  <br/>{item.owner_lastname}</td>
                <td>{item.owner_phone}</td>
                <td>{new Date(item.due_time).toISOString().split("T")[0]}</td>
                <td>{daysDifference}</td>
                <td>
                  <div className={styles.confirm_block}>
                    {item.status === "Ожидает проверки" ? (
                      <section className={styles.btn_section}>
                        <Button action={rejectedOrder}>Удалить</Button>
                      </section>
                    ) : null}
                    {item.status === "Ожидает проверки" ? (
                      <section className={styles.btn_section}>
                        <Button action={confirm}>Подтвердить</Button>
                      </section>
                    ) : null}
                    {item.status === "В обработке" ? (
                      <section className={styles.btn_section}>
                        <Button action={giveOrder}>Выдать</Button>
                      </section>
                    ) : null}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
