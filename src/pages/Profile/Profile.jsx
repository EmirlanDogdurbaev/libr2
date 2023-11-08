import { React, useState, useEffect } from 'react';
import classes from './Profile.module.scss';
import axios from 'axios';
import { api } from '../../store/api';
import ProfileBookCard from '../../components/ProfileBookCard/ProfileBookCard';

function Profile() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState([]);
  async function profileBooks() {
    try {
      const res = await axios.get(api + '/list/book/');
      setBooks(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function userData() {
    try {
      const res = await axios.get(api + '/register/');
      setUser(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    profileBooks();
    userData();
  }, []);
  const userr = {
    name: 'Sam Rustam',
    group: 'MIN-1-22',
    email: 'rustam.samsaev@gmail.com',
  };

  return (
    <div className={classes.wrap}>
      <div className={classes.userInfoCard}>
        <img
          src="https://e7.pngegg.com/pngimages/980/304/png-clipart-computer-icons-user-profile-avatar-heroes-silhouette.png"
          alt="user"
          width="60px"
          height="60px"
        />
        <h3>{userr.name}</h3>
        <p className={classes.blue}>{userr.group}</p>
        <p>{userr.email}</p>
        <button className={classes.btn} type="submit">
          LogOut
        </button>
      </div>
      <div className={classes.second}>
        {books.map((data) => {
          return <ProfileBookCard data={data} key={data.id} />;
        })}
      </div>
    </div>
  );
}

export default Profile;
