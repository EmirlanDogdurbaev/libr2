import React from 'react'
import classes from './BookForm.module.scss'
export default function BookForm() {
  return (
    <form className={classes.BookForm} method='post' encType='multipart/form-data'>
      <label htmlFor='title'>Название</label>
      <input type="text" id='title'/>
      <label htmlFor='description'>Описание</label>
      <textarea id='description'/>
      <label htmlFor='image'>Обложка</label>
      <input type="file" id='image' accept='image/*'/>
      <label htmlFor='quantity'>Количество</label>
      <input type="number" id='quantity'/>
      
    </form>
  )
}
