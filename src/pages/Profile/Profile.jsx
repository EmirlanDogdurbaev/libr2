import { React, useState, useEffect } from "react";
import classes from "./Profile.module.scss";
import axios from "axios";
import { api } from "../../store/api";
import ProfileBookCard from "../../components/ProfileBookCard/ProfileBookCard";
import { header } from "../../store/header";

function Profile() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState([]);
  async function profileOrders() {
    try {
      const res = await axios.get(api + "/list/order/", header);
      const confirmedOrders = res.data.filter((item)=>item.status === "Выполнен")
      setOrders(confirmedOrders);
    } catch (e) {
      console.log(e);
    }
  }
  async function fetchBook(id) {
    try {
      const res = await axios.get(api + "/change/book/"+id, header);
      return res.data
    } catch (e) {
      console.log(e);
      return null
    }
  }

  useEffect(() => {
    profileOrders();
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className={classes.wrap}>
      <div className={classes.userInfoCard}>
        <img
          src="https://e7.pngegg.com/pngimages/980/304/png-clipart-computer-icons-user-profile-avatar-heroes-silhouette.png"
          alt="user"
          width="60px"
          height="60px"
        />
        <h3>
          {user.first_name} {user.last_name}
        </h3>
        
        <p className={classes.blue}>{user.group !== 'Liber' ? user.group : null}</p>
        <p>{user.email}</p>
        <h4>
          {user.phone}
        </h4>
        <button
          className={classes.btn}
          onClick={() => {
            localStorage.clear();
            location.reload();
          }}>
          LogOut
        </button>
      </div>
      {user.status !== 'Librarian' ? (
        <div className={classes.second}>
          {orders.map((data) => {
            return <ProfileBookCard data={data} fetchBook={fetchBook} key={data.id} />;
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
