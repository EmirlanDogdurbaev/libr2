import React from 'react';
import classes from './Profile.module.scss';
import ProfileBookCard from '../../components/ProfileBookCard/ProfileBookCard';

function Profile() {
  const user = {
    ava: 'https://e7.pngegg.com/pngimages/980/304/png-clipart-computer-icons-user-profile-avatar-heroes-silhouette.png',
    name: 'Sam Rustam',
    group: 'MIN-1-22',
    email: 'rustam.samsaev@gmail.com',
  };

  return (
    <div className={classes.wrap}>
      <div className={classes.userInfoCard}>
        <img src={user.ava} alt="user" width="60px" height="60px" />
        <h3>{user.name}</h3>
        <p className={classes.blue}>{user.group}</p>
        <p>{user.email}</p>
        <button className={classes.btn} type="submit">
          LogOut
        </button>
      </div>
      <div className={classes.second}>
        <ProfileBookCard />
        <ProfileBookCard />
        <ProfileBookCard />
      </div>
    </div>
  );
}

export default Profile;
