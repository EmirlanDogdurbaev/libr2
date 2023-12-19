import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../store/api";
import BasketCard from "../../components/BasketCard/BasketCard";
import classes from "./Basket.module.scss";
import { header } from "../../store/header";
import { Context } from "../../main";
export default function Basket() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    try {
      const response = await axios.get(api + "/order/all", header);
      setOrders(response.data);
      console.log(response.data); 
    } catch (e) {
      console.log(e.message);
    }
  }

  async function fetchBook(id) {
    try {
      const res = await axios.get(api + "/book/" + id , header);
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

  const [data, setData] = useState([]);
  const { store } = useContext(Context);

  useEffect(() => {
    console.log("render");
    axios.get(api + "/book/all").then((res) => {
      if (store.type === "category") {
        if (store.category !== "") {
          setData(res.data.filter((item) => item.category === store.category));
        } else {
          setData(res.data);
        }
      } else if (store.type === "filter") {
        if (store.filter !== "") {
          switch (store.filter) {
            case "newer":
              setData(res.data.sort((a, b) => b.id - a.id));
              break;
            case "older":
              setData(res.data.sort((a, b) => a.id - b.id));
              break;
            case "not":
              setData(res.data.sort((a, b) => b.rating - a.rating));
              break;
            case "popular":
              setData(res.data.sort((a, b) => a.rating - b.rating));
              break;

            default:
              setData(res.data);
              break;
          }
        }
      } else if (store.type === "search") {
        const searchedData = res.data.filter((obj) =>
          Object.values(obj).some(
            (value) => typeof value === "string" && value.includes(store.search)
          )
        );
        setData(searchedData);
      } else {
        setData(res.data);
      }
    });
  }, [store.category, store.filter, store.search]);

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
