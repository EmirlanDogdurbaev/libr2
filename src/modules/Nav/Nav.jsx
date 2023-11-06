import NavItem from "./NavItem/NavItem.jsx";
import styles from "./Nav.module.scss"
import Logo from "../../components/UI/Logo/Logo.jsx";
import icon1 from "../../assets/icons/home.svg"
const Nav = (props) => {

    
    // eslint-disable-next-line react/prop-types
    const isActive = props.stateClassName;

    const navClass = isActive ? `${styles.active}` : styles.Nav;

    return <nav className={navClass}>
        <Logo/>
        <ul>
<<<<<<< HEAD
            <li><NavItem to={"/jhg"}> <img src={icon1} alt=""/> home</NavItem></li>
=======
            <li><NavItem to={"/"}> <img src={icon1} alt=""/> home</NavItem></li>
>>>>>>> 2455475235f95a6626f3137f2fcc6bf00b40b296
            <li><NavItem to={"/profile"}> <img src={icon1} alt=""/> profile</NavItem></li>
            <li><NavItem to={"/catalog"}> <img src={icon1} alt=""/> catalog</NavItem></li>
            <li><NavItem to={"/basket"}> <img src={icon1} alt=""/>basket</NavItem></li>
        </ul>
    </nav>
}

export default Nav;