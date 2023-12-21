import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../store/api";
import BasketCard from "../../components/BasketCard/BasketCard";
import classes from "./Basket.module.scss";
import { header } from "../../store/header";

export default function Basket() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    try {
      const response = await axios.get(api + "/order/all", header);
      setOrders(response.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  async function fetchBook(id) {
    try {
      const res = await axios.get(api + "/book/" + id, header);
      return res.data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  // Функция для сортировки заказов
  const sortOrders = (criteria) => {
    switch (criteria) {
      case "newest":
        setOrders([...orders].sort((a, b) => b.id - a.id));
        break;
      case "oldest":
        setOrders([...orders].sort((a, b) => a.id - b.id));
        break;
      default:
        setOrders([...orders]);
        break;
    }
  };

  return (
    <div className={classes.Basket}>
      <span>Basket</span>
      <button onClick={() => sortOrders("newest")}>Сортировать по новым</button>
      <button onClick={() => sortOrders("oldest")}>
        Сортировать по старым
      </button>

      {orders.map((item, id) => (
        <div key={id}>
          <BasketCard item={item} fetchBook={fetchBook} />
        </div>
      ))}
    </div>
  );
}
