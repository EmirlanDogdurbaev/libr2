import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../store/api";
import BasketCard from "../../components/BasketCard/BasketCard";
import classes from './Basket.module.scss'
import { header } from "../../store/header";
export default function Basket() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    try {
      const response = await axios.get(api + "/list/order", header);
      setOrders(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  async function fetchBook(id) {
    try {
      const res = await axios.get(api + "/change/book/" + id , header);
      return res.data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  useEffect(() => {
    async function fetchData() {
      await fetchOrders();
    }
    fetchData();
  }, []);

  return (
    <div className={classes.Basket}>
      <span>Basket</span>
      {orders.map((item, id) => (
        <div key={id}>
          <BasketCard item={item} fetchBook={fetchBook} />
        </div>
      ))}
    </div>
  );
}


