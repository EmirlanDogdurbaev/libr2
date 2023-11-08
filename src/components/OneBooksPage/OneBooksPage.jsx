import Book from "./Book/Book";
import Comment from "./Comment/Comment";
import cl from "./OneBooksPage.module.scss";
const OneBookPage = () => {
  return (
    <div className={cl.OneBookPage}>
      <section>
        <Book />
        <h3 className={cl.response}>Отзывы</h3>
        <div className={cl.comment_cont}>
          <Comment />
          <Comment />
          <Comment />

          <Comment />
        </div>
      </section>
    </div>
  );
};

export default OneBookPage;
