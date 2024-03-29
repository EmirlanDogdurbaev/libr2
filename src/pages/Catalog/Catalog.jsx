import React, { useContext, useEffect, useState } from 'react';
import Categories from '../../components/Categories/Categories';
import BookCard from '../../components/BookCard/BookCard';
import axios from 'axios';
import { api } from '../../store/api';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';

function Catalog() {
  const [data, setData] = useState([]);
  const { store } = useContext(Context);

  useEffect(() => {
    console.log('render');
    axios.get(api + '/book/all').then((res) => {
      if (store.type === 'category') {
        if (store.category !== '') {
          setData(res.data.filter((item) => item.category === store.category));
        } else {
          setData(res.data);
        }
      } else if (store.type === 'filter') {
        if (store.filter !== '') {
          switch (store.filter) {
            case 'newer':
              setData(res.data.sort((a, b) => b.id - a.id));
              break;
            case 'older':
              setData(res.data.sort((a, b) => a.id - b.id));
              break;
            case 'not':
              setData(res.data.sort((a, b) => b.rating - a.rating));
              break;
            case 'popular':
              setData(res.data.sort((a, b) => a.rating - b.rating));
              break;

            default:
              setData(res.data);
              break;
          }
        }
      } else if (store.type === 'search') {
        const searchedData = res.data.filter((obj) =>
          Object.values(obj).some(
            (value) => typeof value === 'string' && value.includes(store.search),
          ),
        );
        setData(searchedData);
      } else {
        setData(res.data);
      }
    });
  }, [store.category, store.filter, store.search]);
  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: '1300px',
      }}>
      <Categories />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
        {data.map((item) => {
          return <BookCard data={item} key={item.id}/>;
        })}
      </div>
    </div>
  );
}
export default observer(Catalog);
