import React from "react";
import { useState } from "react";
import styles from "./Auth.module.scss";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");

  const { store } = useContext(Context);
  function login() {
    store
      .login(email, password)
      .then(() => location.reload());
  }
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

      <Button action={login}>Войти</Button>
      <Link to={"/register"}>Создать аккаунт</Link>
    </div>
  );
}

export default observer(Login);
