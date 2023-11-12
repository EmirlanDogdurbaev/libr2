import styles from './SearchBar.module.scss';
import profile from '../../assets/icons/user.svg';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useContext, useEffect, useState } from 'react';
import {Context} from '../../main'
const SearchBar = (props) => {
  const {store} = useContext(Context)
  const [search, setSearch] = useState('')
  const date = [
    { label: 'Самые новые', value: 'newer' },
    { label: 'Самые старые', value: 'older' },
  ];
  const popularity = [
    { label: 'Менее популярные', value: 'popular' },
    { label: 'Более популярные', value: 'not' },
  ];
  function filter(e){
    store.setFilter(e.value)
    store.setType('filter')
  }
  function submitSearch(){
    store.setSearch(search)
    setSearch('')
    store.setType('search')
  }
 
  const toggle = props.toggleClassName;
  return (
    <div className={styles.SearchBar}>
      <div>
        <form action="#" onSubmit={(e)=>e.preventDefault()}>
          <input type="text" placeholder="search for something... " value={search} onChange={(e)=>setSearch(e.target.value)} />
          <button onClick={submitSearch}>search </button>
        </form>

        <Select placeholder={'По дате'} options={date} onChange={(e)=>filter(e)}/>
        <Select placeholder={'По популярности'} options={popularity}  onChange={(e)=>filter(e)}/>
        <section>
          <Link to={'/reg'}>
            <img src={profile} alt="" />
          </Link>
          <button onClick={toggle}>...</button>
        </section>
      </div>
    </div>
  );
};

export default SearchBar;
