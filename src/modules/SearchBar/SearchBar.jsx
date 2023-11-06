import styles from "./SearchBar.module.scss"
import profile from "../../assets/icons/user.svg"
import {Link} from "react-router-dom";
import Select from "react-select";

const SearchBar = (props) => {
    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ];
      
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
        <div>
            
        <Select options={options} />    
        </div>
    </div>
}

export default SearchBar;