import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { api } from '../../store/api'
import classes from './Categories.module.scss'
export default function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(()=>{
    axios.get(api+'/list/category').then((res)=>{
      setCategories(res.data)
    })
  },[])
  return (
    <div className={classes.Categories}>
      {categories.map((item)=>{
        return<div>
          {item.title}
        </div>
      })}
    </div>
  )
}
