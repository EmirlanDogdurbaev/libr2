import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Auth.module.scss";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedGroup, setSelectedGroup] = useState("");

  const [group, setGroup] = useState([]);

  const { store } = useContext(Context);

  function register() {
    store
      .register(email, password, firstName, lastName, phone, selectedGroup)
      .then(() => window.location.reload());
  }
  useEffect(() => {
    axios
      .get("https://orenvadi.pythonanywhere.com/api/v1/list/group/")
      .then((resp) => {
        setGroup(resp.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className={styles.Auth}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={(e) => setPasssword(e.target.value)}
        value={password}
      />

      <label htmlFor="firstname">First Name</label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />

      <label htmlFor="lastname">Last Name</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />

      <label htmlFor="phone">Phone</label>
      <input
        type="text"
        id="phone"
        name="phone"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
      />
      <select
        name="group"
        id="group"
        onChange={(e) => setSelectedGroup(e.target.value)}
        value={selectedGroup}
      >
        {group.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <Button action={register}>Ресистрация</Button>
      <Link to={"/login"}>Уже есть аккаунт</Link>
    </div>
  );
}
export default observer(Register);
