import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { api } from '../../store/api';
import classes from './Categories.module.scss';
import { Context } from '../../main';
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState('');
  const { store } = useContext(Context);
  useEffect(() => {
    axios
      .get(api + '/list/category/', {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      })
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
              setActive(item.title);
              store.setCategory(item.id);
            }}
            className={active === item.title ? classes.active : null}>
            {item.title}
          </div>
        );
      })}
    </div>
  );
}
