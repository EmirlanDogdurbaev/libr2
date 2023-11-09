import NavItem from "./NavItem/NavItem.jsx";
import styles from "./Nav.module.scss";
import Logo from "../../components/UI/Logo/Logo.jsx";
import icon1 from "../../assets/icons/home.svg";
import catalog from "../../assets/icons/catalogg.svg";
import user from "../../assets/icons/profile.svg";

const Nav = (props) => {
  // eslint-disable-next-line react/prop-types
  const isActive = props.stateClassName;

  const navClass = isActive ? `${styles.active}` : styles.Nav;

  return (
    <nav className={navClass}>
      <Logo />
      <ul>
        <li>
          <NavItem to={"/"}>
            <img src={icon1} alt="" /> home
          </NavItem>
        </li>
        <li>
          <NavItem to={"/catalog"}>
            <img src={catalog} alt="" /> catalog
          </NavItem>
        </li>
        <li>
          <NavItem to={"/profile"}>
            <img src={user} alt="" /> profile
          </NavItem>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
