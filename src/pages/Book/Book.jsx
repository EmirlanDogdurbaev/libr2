import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../store/api'

export default function Book() {
  const params = useParams()
  const [ book, setBook] = useState({})
  async function fetchBook(){
    try{
      const res = await axios.get(api + '/change/book/'+ params.id)
      setBook(res.data)
    }
    catch(e){
      console.log(e.message);
    }
  }
  useEffect(()=>{
    fetchBook()
  },[])
  return (
    <div>{book.title}</div>
  )
}
