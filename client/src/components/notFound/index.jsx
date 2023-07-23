import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import NotFoundImg from '../../assets/images/not-found.png'
import styles from './NotFound.module.css'
const MainNotFound = () => {
    const Navigate = useNavigate()
    return (
        <section className={styles.not_found}>
            <Container>
                <div className={styles.not_found_items}>
                    <img src={NotFoundImg} alt="not Found Img" />
                    <h1>Page not Found</h1>
                    <Button 
                        variant="outline-secondary"
                        size="lg"
                        className="px-5"
                        onClick={()=> Navigate("/") }
                    >Go Home</Button>
                </div>
            </Container>
        </section>
    )
}

export default MainNotFound