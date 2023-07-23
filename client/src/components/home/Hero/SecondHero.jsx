import secondHero from "../../../assets/images/SecondHero.png";
import styles from "./Hero.module.css";
import circleHero from "../../../assets/images/circle_hero.jpg";
import { Container } from "react-bootstrap";

const SecondHero = () => {
  return (
    <div className={styles.second_section}>
      <Container
        className={` ${styles.second_hero_container} h-100 d-flex justify-content-evenly align-items-center`}
      >
        <p>
          Your <br />
          <span className="heart_message">heart</span>
          <br />
          <span className="ident-big">
            In Our
            <br />
            <span className="hands_message">hands</span>
          </span>
        </p>
        <div className={styles.circle_hero}>
          <img src={circleHero} alt="circleHero" />
        </div>
        <div className={styles.heart_container}>
          <div className={styles.heart}></div>
        </div>
        <svg
          className={styles.Beating}
          width="1000"
          height="800"
          xmins="http:..www.w3.org/2000/svg"
        >
          <g className={styles.pathdraw} id="Layer_1">
            <path
              id="svg_1"
              d="m162.5,299.2l142.5,-0.2l8,-23l11,23l34,0l14,-109l14,226l12,-118l30,0l5,-15l10,0l7,-16l10,31l155,0"
            />
          </g>
        </svg>
      </Container>
      {/* ######## */}
      <div className={styles.background}>
        <img src={secondHero} alt="second Hero" />
      </div>
    </div>
  );
};

export default SecondHero;
