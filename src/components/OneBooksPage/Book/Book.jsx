import cl from "./Book.module.scss";
// import img from "../../../assets/images/book.png";

const Book = () => {
  return (
    <article className={cl.Book}>
      {/* <img src={img} alt="" /> */}
      <div className={cl.text}>
        <h3>Java spring framework</h3>
        <h4>Amber Smith</h4>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam
          voluptatum laboriosam tempora velit ipsum eaque explicabo quas animi
          corrupti, magni commodi sed dolorum consequatur, accusamus
          consequuntur temporibus ab. Sit, aliquam!
        </p>
      </div>
      <div className={cl.rating}>
        <h3>4,2</h3>
        <div>
          <small>В наличии: 3</small>
          <button>Заказать</button>
        </div>
      </div>
    </article>
  );
};

export default Book;
