import styles from "./Hero.module.css";
import FirstHimg from "../../../assets/images/FirstHero.jpg";
import { useNavigate } from "react-router-dom";

const FirstHero = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.firstHeroContainer}>
      <div className={styles.padgeContainer}>
        <h1>Treat Your Heart Right</h1>
        <blockquote>
          {" "}
          " When you have heart disease, you start to be tired of everything.
          It’s like getting older. You become more white, and after that, grey.
          You have no feeling for anything " — Gerard Depardieu
        </blockquote>
        <button onClick={() => navigate("/contactUs")}>Contact Us</button>
      </div>
      <div className={styles.first_hero_img}>
        <img src={FirstHimg} alt="First Hero" />
      </div>
    </div>
  );
};

export default FirstHero;
