import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard';
import Button from '../Button/Button';
import classes from './BasketCard.module.scss'
export default function BasketCard({ item, fetchBook }) {
  const [book, setBook] = useState({});
  useEffect(() => {
    async function fetchData() {
      const bookData = await fetchBook(item.books[0]);
      setBook(bookData || {});
      
    }
    fetchData();
    
  }, [item.books, fetchBook]);

  return (
    <div className={classes.BasketCard}>
      <div>
        <div>{item.status}</div>
        <Button>Удалить</Button>
      </div>
      <BookCard data={book} />
    </div>
  );
}