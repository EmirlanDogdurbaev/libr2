import Nav from "../../modules/Nav/Nav.jsx";
import SearchBar from "../../modules/SearchBar/SearchBar.jsx";
import styles from "./Layout.module.scss"
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {

    const [navbar, setNavbar] = useState(false)
    const toggle = () => {
        setNavbar(!navbar)
    }

    console.log(navbar)
    return <div className={styles.main}>
        <Nav stateClassName={navbar}/>
        <div className={styles.rightContainer}>
            <SearchBar toggleClassName={toggle}/>
            <section>
                {children}
            </section>
        </div>
    </div>
}

export default Layout;