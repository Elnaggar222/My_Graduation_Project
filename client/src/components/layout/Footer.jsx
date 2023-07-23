import styles from './Footer.module.css'
import { ReactComponent as Youtube  } from './../../assets/images/Youtube.svg'
import { ReactComponent as Lindein  } from './../../assets/images/Linkedin.svg'
import { ReactComponent as Watsapp  } from './../../assets/images/whatsapp.svg'
import { ReactComponent as Facebook  } from './../../assets/images/facebook.svg'
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap'
const Footer = () => {
    return (
        <footer className={`${styles.footer} bg-dark`}>
            <Container className={styles.container}>
                <h1 className={styles.foot_header}> Get The <span>Right</span> Diagnosis<br /> And Proper Treatment </h1>
                <div className={styles["social-icons"]}>
                    <Link to="https://www.youtube.com">  <Youtube className={styles.socia} /> </Link>
                    <Link to="https://www.linkedin.com"> <Lindein className={styles.socia} /> </Link>
                    <Link to="https://www.watasapp.com"> <Watsapp className={styles.socia} /> </Link>
                    <Link to="https://www.facebook.com"> <Facebook className={styles.socia}/> </Link>
                </div>
                <p className={styles.foot_copy}> <span>&copy;</span> 2023 Graduation Project Tanta University. All Rights Reserved</p>
                <div className={styles["terms-services"]}>
                    <p>Privacy Policy</p>
                    <p>Terms & Conditions</p>
                </div>
            </Container>
        </footer>
    )
}

export default Footer