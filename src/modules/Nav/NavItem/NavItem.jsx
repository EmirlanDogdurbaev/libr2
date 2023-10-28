import {NavLink, useLocation} from "react-router-dom";
import styles from "./NavItem.module.scss"
// eslint-disable-next-line react/prop-types
const NavItem = ({to, children}) => {

    const location = useLocation();

    return <NavLink to={to}
                    className={`${styles.navItem} ${location.pathname === to ? styles.active : ''}`}>{children}</NavLink>

}

export default NavItem;