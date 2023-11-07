import styles from "./SearchBar.module.scss";
import profile from "../../assets/icons/user.svg";
import { Link } from "react-router-dom";
import Select from "react-select";

const SearchBar = (props) => {
  const date = [
    { label: "Самые новые", value: "newer" },
    { label: "Самые старые", value: "older" },
  ];
  const popularity = [
    { label: "Менее популярные", value: "popular" },
    { label: "Более популярные", value: "not" },
  ];

  // eslint-disable-next-line react/prop-types
  const toggle = props.toggleClassName;
  return (
    <div className={styles.SearchBar}>
      <div>
        <span>
          <input type="text" placeholder="search" />
          <button>search</button>
        </span>
        
      <Select placeholder={"По дате"} options={date} />
      <Select placeholder={"По популярности"} options={popularity} />
        <section>
            
          <Link to={"/reg"}>
            <img src={profile} alt="" />
          </Link>
          <button onClick={toggle}>...</button>
        </section>
      </div>
    </div>
  );
};

export default SearchBar;
