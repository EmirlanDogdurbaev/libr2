import React from 'react';
import classes from './ProfileBookCard.module.scss';

function ProfileBookCard() {
  const book = {
    date: '31.11.2023',
    time: '8 days',
    name: 'Java Srping Boot',
    author: 'Amber Smith',
  };

  return (
    <div className={classes.wrap}>
      <div className={classes.first}>
        <span>
          <p>Вернуть до:</p>
          <h2>{book.date}</h2>
        </span>
        <span>
          <p>Осталось:</p>
          <h2>{book.time}</h2>
        </span>
      </div>
      <div></div>
    </div>
  );
}

export default ProfileBookCard;
