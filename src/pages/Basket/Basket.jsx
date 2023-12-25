import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../store/api";
import BasketCard from "../../components/BasketCard/BasketCard";
import classes from "./Basket.module.scss";
import { header } from "../../store/header";

export default function Basket() {
  // Состояния для хранения списка заказов и изначального списка заказов
  const [orders, setOrders] = useState([]);
  const [initialOrders, setInitialOrders] = useState([]);

  // Функция для получения списка заказов с сервера
  async function fetchOrders() {
    try {
      const response = await axios.get(api + "/order/all", header);
      setOrders(response.data);
      setInitialOrders(response.data); // Сохранение изначального списка
    } catch (e) {
      console.log(e.message);
    }
  }

  // Функция для получения информации о книге по её ID
  async function fetchBook(id) {
    try {
      const res = await axios.get(api + "/book/" + id, header);
      return res.data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  // Загрузка списка заказов после загрузки компонента
  useEffect(() => {
    fetchOrders();
  }, []);

  // Функция для сортировки заказов по различным критериям (новизна, статусы)
  const sortOrders = (criteria) => {
    switch (criteria) {
      case "newest":
        setOrders([...orders].sort((a, b) => b.id - a.id));
        break;
      case "oldest":
        setOrders([...orders].sort((a, b) => a.id - b.id));
        break;
      case "awaiting":
        setOrders(
          [...initialOrders].filter(
            (order) => order.status === "Ожидает проверки"
          )
        );
        break;
      case "completed":
        setOrders(
          [...initialOrders].filter((order) => order.status === "Выполнен")
        );
        break;
      case "processing":
        setOrders(
          [...initialOrders].filter((order) => order.status === "В обработке")
        );
        break;

      case "def":
        setOrders(
          [...initialOrders].filter(
            (order) =>
              order.status === "В обработке" ||
              order.status === "Выполнен" ||
              order.status === "Ожидает проверки"
          )
        );
      default:
        setOrders([...initialOrders]);
        break;
    }
  };

  return (
    <div className={classes.Basket}>
      <span>Basket</span>
      {/* Кнопки для сортировки */}
      {JSON.parse(localStorage.getItem("user")).role == "Librarian" ? (
        <>
          <div className={classes.ButtonsContainer}>
            <button
              onClick={() => sortOrders("def")}
              className={classes.SortButton}
            >
              Посмотерть все
            </button>
            <button
              onClick={() => sortOrders("newest")}
              className={classes.SortButton}
            >
              Сортировать по новым
            </button>
            <button
              onClick={() => sortOrders("oldest")}
              className={classes.SortButton}
            >
              Сортировать по старым
            </button>
            <button
              onClick={() => sortOrders("awaiting")}
              className={classes.SortButton}
            >
              Сортировать по Ожиданию
            </button>
            <button
              onClick={() => sortOrders("completed")}
              className={classes.SortButton}
            >
              Сортировать по Выполненным
            </button>
            <button
              onClick={() => sortOrders("processing")}
              className={classes.SortButton}
            >
              Сортировать по В обработке
            </button>
          </div>

          <div className={classes.tableContainer}>
            <div className={classes.bookTable}>
              <section>
                <ul className={classes.th}>
                  <li>Автор</li>
                  <li>Назв-е книги</li>
                  <li>Кол-во книг</li>
                  <li>статус</li>
                  <li>заказчик</li>
                  <li>телефон</li>
                  <li>взял</li>
                  <li>вернет</li>
                  <li>Действия</li>
                </ul>
              </section>
              {orders.map((item, id) => (
                <div key={id}>
                  <BasketCard item={item} fetchBook={fetchBook} />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {orders.map((item, id) => (
            <div key={id}>
              <BasketCard item={item} fetchBook={fetchBook} />
            </div>
          ))}
        </>
      )}

      {/* Отображение заказов */}
    </div>
  );
}
