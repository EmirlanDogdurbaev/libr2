import React from "react";
import styles from "./AuthForm.module.scss";
import Logo from "../Logo/Logo";
export default function AuthForm({ children }) {
  return (
    <div className={styles.AuthForm}>
      <div>
        <Logo/>
        {children}
      </div>
    </div>
  );
}
