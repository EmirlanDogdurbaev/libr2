import NavItem from "./NavItem/NavItem.jsx";
import {Link} from "react-router-dom";
import styles from "./Nav.module.scss"
import Logo from "../../components/UI/Logo/Logo.jsx";
import icon1 from "../../assets/icons/home.svg"

const Nav = (props) => {

    // eslint-disable-next-line react/prop-types
    const isActive = props.stateClassName;
    // const navClasses = [styles.Nav];
    //
    // if (isActive) {
    //     navClasses.push("active");
    // }
    //
    // const navClass = navClasses.join(" ");
    const navClass = isActive ? `${styles.Nav} active` : styles.Nav;
    const navStyle = isActive ? {
        display: "block",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 10
    } : {display: "none"};
    return <nav className={navClass} style={navStyle}>
        <aside>
            <Logo/>
            <ul>
                <li><NavItem to={"/home"}> <img src={icon1} alt=""/> home</NavItem></li>
                <li><NavItem to={"/profile"}> <img src={icon1} alt=""/> profile</NavItem></li>
                <li><NavItem to={"/catalog"}> <img src={icon1} alt=""/> catalog</NavItem></li>
                <li><NavItem to={"/basket"}> <img src={icon1} alt=""/>basket</NavItem></li>
            </ul>
        </aside>
        <div className={styles.btn_cont}>
            <Link to={"reg"}>
                Register
            </Link>
            <Link to={"reg"}>
                Log in
            </Link>
        </div>
    </nav>
}

export default Nav;