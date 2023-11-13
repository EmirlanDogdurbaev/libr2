import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard';
import Button from '../Button/Button';
import classes from './BasketCard.module.scss'
import axios from 'axios';
import { api } from '../../store/api';
export default function BasketCard({ item, fetchBook }) {
  const [book, setBook] = useState({});
  useEffect(() => {
    async function fetchData() {
      const bookData = await fetchBook(item.books[0]);
      setBook(bookData || {});
      
    }
    fetchData();
    
  }, [item.books, fetchBook]);
  async function removeOrder(){
    const res = await axios.delete(api + `/change/order/${item.id}/`, {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    console.log(res.data);
  } 
  return (
    <div className={classes.BasketCard}>
      <div>
        <div>{item.status}</div>
        <Button action={removeOrder}>Удалить</Button>
      </div>
      <BookCard data={book} />
    </div>
  );
}