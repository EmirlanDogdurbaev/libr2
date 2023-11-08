import React, { useContext, useEffect, useState } from "react";
import Categories from "../../components/Categories/Categories";
import BookCard from "../../components/BookCard/BookCard";
import axios from "axios";
import { api } from "../../store/api";
import Slider from "../../components/Slider/Slider";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import Comment from "../../components/Comment/Comment";

 function Catalog() {
  const [data, setData] = useState([]);
  const { store } = useContext(Context);

  useEffect(() => {
    console.log(store.category);
    axios.get(api + "/list/book/").then((res) => {
      if (store.category !== "") {
        setData(res.data.filter((item) => item.category === store.category));
      }
      else{
        setData(res.data)
      }
    });
  }, [store.category]);
  return (
    <div>
      <Categories />
      <Slider books={data} />
  
    </div>
  );
}
export default observer(Catalog)