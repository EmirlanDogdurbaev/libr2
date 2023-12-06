import { useEffect, useState } from "react";
import Slider from "../../components/Slider/Slider";
import styles from "./Home.module.scss";
import axios from "axios";
import { api } from "../../store/api";

const Home = () => {
  const [books, setBooks] = useState([]);
  async function fetchBooks(){
    try {
      const res = await axios.get(api + "/list/book");
      setBooks(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchBooks()
  }, []);
  return (
    <div className={styles.Home}>
      <section className={styles.scroll_cont}>
        <main>
          <section>
            <h1>Welcome to library INAI</h1>
          </section>
        </main>

        <div className={styles.cards_slider_cont}>
          <h1>Books</h1>
          <Slider books={books} />
        </div>
      </section>
    </div>
  );
};

export default Home;
