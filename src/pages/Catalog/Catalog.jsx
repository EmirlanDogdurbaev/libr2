import React, { useEffect, useState } from "react";
import Categories from "../../components/Categories/Categories";
import BookCard from "../../components/BookCard/BookCard";
import axios from "axios";
import { api } from "../../store/api";
import Slider from "../../components/Slider/Slider";

export default function Catalog() {
  const [data, setData] = useState([]);
  useEffect(()=>{
    
    axios.get(api+'/list/book/').then((res)=>{
      setData(res.data)
    })
    }, [])
  return (
    <div>
      <Categories />
      <Slider books={data}/>
      <Slider books={data}/>
      <Slider books={data}/>
      <Slider books={data}/> <Slider books={data}/>
      <Slider books={data}/>
      <Slider books={data}/> <Slider books={data}/>
    </div>
  );
}
