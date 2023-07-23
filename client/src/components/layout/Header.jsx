import {  Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { ReactComponent as MySvg  } from './../../assets/images/HeartLogo.svg'
import { useEffect, useRef, useState } from 'react'
import ModalHeader from '../../UI/headerModal/ModalHeader'
import ModalAppointment from '../../UI/appointmentModal/ModalAppointment'
import MainAppointmentForm from '../appointmentForm/MainAppointmentForm'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


const NavLinks = ({children,route,end=false}) => {

    return(
        <Nav.Link as="span">
            <NavLink className={styles.navLink} to={route} end={end} >
                {children}
            </NavLink>
        </Nav.Link>
    ) 
}

// bg="dark"
const Header = () => {
    const navigate = useNavigate();
    const [showHeaderModal,setShowHeaderModal] = useState(false)
    const [showAppointmentModal,setShowAppointmentModal] = useState(false)
    const {isAuth , userPrivateInfo , logOut} = useContext(AuthContext);
    console.log(userPrivateInfo);
    

    const isMount = useRef(false)
    const [isScrolled,setIsScrolled] = useState(false)
    useEffect(()=>{
        if(!isMount.current){
            window.addEventListener("scroll",()=>{
                if(window.scrollY > 60){
                    setIsScrolled(true)
                }else{
                    setIsScrolled(false)
                }
            })
            isMount.current = true
        }
    },[])



    return (
        <header className={`${styles.header} ${isScrolled ? 'scrolled' : ''}`}>
            <Navbar variant="dark"> 
                <Container>
                    <Navbar.Brand as="span" >
                        <NavLink className={styles.try} route="/">
                            <div className={`${styles.heart_logo} d-flex justify-content-center align-items-center gap-4`} >
                                <MySvg  className={styles.LogoItself} />
                                <div>Heart Care Center</div>
                            </div>
                        </NavLink>
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                    {!showHeaderModal &&(
                        <>
                            <NavLinks route="/" end>HOME</NavLinks>
                            <NavLinks route="/contactUs" end>CONTACT</NavLinks>
                            {!isAuth && (
                                <>
                                    <NavLinks route="/login" >LOG IN</NavLinks>
                                    <NavLinks route="/signUp" >SIGN UP</NavLinks>
                                </>
                            )}  
                            {isAuth && userPrivateInfo&&userPrivateInfo.is_patient && (
                                <Button onClick={()=>setShowAppointmentModal(true)} className={styles.appointmentButton} variant="primary">Request Appointment</Button>
                            ) }
                            {isAuth && userPrivateInfo && userPrivateInfo.is_hospital && ( 
                                <Button onClick={()=> navigate(`/hospitalAppointments/${userPrivateInfo && userPrivateInfo.id}`)} className={styles.appointmentButton} variant="primary">Check all Appointments</Button>
                            )}
                            {isAuth && (
                                <Button onClick={logOut} className={styles.logoutButton} variant="outline-danger">LOG OUT</Button>
                            )}
                        </>
                    )}
                        <div onClick={() => setShowHeaderModal((showModal)=>!showModal)} className={styles.choicesIcon}>
                            <div className={`${styles.bar} ${showHeaderModal?styles.animate:''}`}></div>
                            <div className={`${styles.bar} ${showHeaderModal?styles.animate:''}`}></div>
                            <div className={`${styles.bar} ${showHeaderModal?styles.animate:''}`}></div>
                        </div>
                        
                    </Nav>
                        <div className={`${styles["Modal-overlay"]} ${showHeaderModal ?'appear':''}`}>
                            <ModalHeader closeHeaderModal={()=>setShowHeaderModal(false)} />
                        </div>
                        {showHeaderModal ?(
                            <div className={styles.Big_Overlay} onClick={()=>setShowHeaderModal(false)}>
                            </div>
                        ):null}

                    <ModalAppointment visible={showAppointmentModal} closeModal={()=>setShowAppointmentModal(false)}>
                        <MainAppointmentForm closeModal={()=>setShowAppointmentModal(false)} />
                    </ModalAppointment>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header