import styles from "./SearchBar.module.scss"
import profile from "../../assets/icons/user.svg"
import {Link} from "react-router-dom";

const SearchBar = (props) => {
    // eslint-disable-next-line react/prop-types
    const toggle  = props.toggleClassName;
    return <div className={styles.SearchBar}>
        <div>
          <span>
                <input type="text" placeholder="search"/>
            <button>
                search
            </button>
          </span>
            <section>
                <Link to={"/reg"}>
                    <img src={profile} alt=""/>
                </Link>
            <button  onClick={toggle}   >
                ...
            </button>
            </section>
        </div>
    </div>
}

export default SearchBar;