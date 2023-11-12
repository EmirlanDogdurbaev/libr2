import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../store/api";

export default function Basket() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    try {
      const response = await axios.get(api + "/list/order/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(response.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  async function fetchBook(id) {
    try {
      const res = await axios.get(api + "/change/book/" + id + "/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
    <div>
      {orders.map((item, id) => (
        <div key={id}>
          <OrderDetails item={item} fetchBook={fetchBook} />
        </div>
      ))}
    </div>
  );
}

function OrderDetails({ item, fetchBook }) {
  const [book, setBook] = useState({});

  useEffect(() => {
    async function fetchData() {
      const bookData = await fetchBook(item.books[0]);
      setBook(bookData || {});
    }
    fetchData();
  }, [item.books, fetchBook]);

  return (
    <div>
      <div>{book.title}</div>
      <div>{item.due_time}</div>
    </div>
  );
}
