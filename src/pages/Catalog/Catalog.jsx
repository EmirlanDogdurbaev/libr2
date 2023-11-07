import React, { useEffect, useState } from "react";
import Categories from "../../components/Categories/Categories";
import BookCard from "../../components/BookCard/BookCard";
import axios from "axios";
import { api } from "../../store/api";

export default function Catalog() {
  const [data, setData] = useState({
    id: 1,
    title: "Spring",
    author: "Sam Smith",
    rating: 3,
    quantity: 16,
    image:'https://m.media-amazon.com/images/I/61vF8FZqacL._AC_UF1000,1000_QL80_.jpg'
  });
  useEffect(()=>{
    
    axios.get(api+'/change/book/1/').then((res)=>{
      setData(res.data)
    })
    }, [])
  return (
    <div>
      <Categories />
      <BookCard data={data} />
    </div>
  );
}
