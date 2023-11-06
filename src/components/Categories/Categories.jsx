import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../store/api";
import classes from "./Categories.module.scss"

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    axios.get(api + "/list/category").then((res) => {
      setCategories(res.data);
    });
  }, []);
  return (
    <div className={classes.Categories}>
      {categories.map((item, id) => {
        return (
          <div
            key={id}
            onClick={() => setActive(item.title)}
            className={active === item.title ? classes.active : null}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
}
