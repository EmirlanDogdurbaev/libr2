import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../store/api";
import classes from "./Categories.module.scss";
import { Context } from "../../main";
import { header } from "../../store/header";
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("");
  const { store } = useContext(Context);
  useEffect(() => {
    axios
      .get(api + "/list/category", header)
      .then((res) => {
        setCategories(res.data);
      });
  }, []);
  return (
    <div className={classes.Categories}>
      {categories.map((item, id) => {
        return (
          <div
            key={id}
            onClick={() => {
              item.id === store.category
                ? setActive("")
                : setActive(item.title);

              item.id === store.category
                ? store.setCategory("")
                : store.setCategory(item.id);
              store.setType('category')
            }}
            className={active === item.title ? classes.active : null}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
}
