import styles from './SearchBar.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useContext, useState } from 'react';
import { Context } from '../../main';
const SearchBar = (props) => {
  const { store } = useContext(Context);
  const [search, setSearch] = useState('');
  const date = [
    { label: 'Самые новые', value: 'newer' },
    { label: 'Самые старые', value: 'older' },
  ];
  const popularity = [
    { label: 'Менее популярные', value: 'popular' },
    { label: 'Более популярные', value: 'not' },
  ];
  function filter(e) {
    store.setFilter(e.value);
    store.setType('filter');
  }
  function submitSearch() {
    store.setSearch(search);
    setSearch('');
    store.setType('search');
  }

  const toggle = props.toggleClassName;
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className={styles.SearchBar}>
      <div>
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="искать что-то... "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => navigate('/catalog')}
          />
          <button onClick={submitSearch}>Поиск </button>
        </form>

        {location.pathname === '/catalog' ? (
          <>
            <Select
              placeholder={'По дате'}
              options={date}
              onChange={(e) => filter(e)}
              className={styles.test}
            />
            <Select
              className={styles.test}
              placeholder={'По популярности'}
              options={popularity}
              onChange={(e) => filter(e)}
            />
          </>
        ) : null}
        <section>
          <button onClick={toggle}>...</button>
        </section>
      </div>
    </div>
  );
};

export default SearchBar;
