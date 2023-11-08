import React from "react";
import cl from "./Comment.module.scss";

const Comment = () => {
  return (
    <div className={cl.Comment}>
      <span>
        <svg
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.4873 23.4141V21.4141C22.4873 20.3532 22.0659 19.3358 21.3157 18.5856C20.5656 17.8355 19.5482 17.4141 18.4873 17.4141H10.4873C9.42644 17.4141 8.40902 17.8355 7.65888 18.5856C6.90873 19.3358 6.4873 20.3532 6.4873 21.4141V23.4141M18.4873 9.41406C18.4873 11.6232 16.6964 13.4141 14.4873 13.4141C12.2782 13.4141 10.4873 11.6232 10.4873 9.41406C10.4873 7.20492 12.2782 5.41406 14.4873 5.41406C16.6964 5.41406 18.4873 7.20492 18.4873 9.41406Z"
            stroke="#999999"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h4>AMIT</h4>
      </span>
      <h4>oeasdasd</h4>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam
        voluptatum laboriosam tempora velit ipsum eaque explicabo quas animi
        corrupti, magni commodi temporibus ab. Sit, aliquam!
      </p>
    </div>
  );
};

export default Comment;
