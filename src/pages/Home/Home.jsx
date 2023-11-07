import Slider from "../../components/Slider/Slider";
import styles from "./Home.module.scss";

const Home = () => {
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
          <Slider />
        </div>
        <div className={styles.cards_slider_cont}>
          <h1>Books</h1>
          <Slider />
        </div>
        <div className={styles.cards_slider_cont}>
          <h1>Books</h1>
          <Slider />
        </div>
        <div className={styles.cards_slider_cont}>
          <h1>Books</h1>
          <Slider />
        </div>
        <div className={styles.cards_slider_cont}>
          <h1>Books</h1>
          <Slider />
        </div>

    
        
      </section>
    </div>
  );
};

export default Home;
