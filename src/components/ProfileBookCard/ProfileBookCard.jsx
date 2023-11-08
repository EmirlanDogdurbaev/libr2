import React from 'react';
import classes from './ProfileBookCard.module.scss';
import star from '../../assets/icons/star.svg';
import empt from '../../assets/icons/empty.svg';

function ProfileBookCard({ data }) {
  const stars = new Array(Math.min(data.rating, 5)).fill('');
  const empty = new Array(5 - Math.min(data.rating, 5)).fill('');

  // console.log(data);
  const book = {
    date: '21.04.2023',
    time: '8 days',
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
      <div className={classes.second}>
        <div className={classes.desc}>
          <h3>{data.title}</h3>
          <p>{data.author}</p>
          <div className={classes.rating}>
            {stars.map((item, id) => (
              <div key={id}>
                <img src={star} alt="star" className={classes.star} />
              </div>
            ))}
            {empty.map((item, id) => (
              <div key={id}>
                <img src={empt} alt="empty" className={classes.star} />
              </div>
            ))}
          </div>
        </div>
        <img src={data.image} alt="book image" />
      </div>
    </div>
  );
}

export default ProfileBookCard;
