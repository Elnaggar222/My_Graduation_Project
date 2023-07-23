import {NavLink ,Link, useNavigate } from 'react-router-dom';
import styles from './ModalHeader.module.css';
import { useContext, useState } from 'react';
import ModalAppointment from '../../UI/appointmentModal/ModalAppointment'
import MainAppointmentForm from '../../components/appointmentForm/MainAppointmentForm'
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';



const ModalHeader = ({closeHeaderModal}) => {
  const navigate = useNavigate();
  const [showAppointmentModal,setShowAppointmentModal] = useState(false)
  const {isAuth , userPrivateInfo , logOut} = useContext(AuthContext);

  const handleRequestAppountment = () => {
    setShowAppointmentModal(true)
    closeHeaderModal()
  }
  return (
    <>
    <nav>
      <ul className={styles.links}>
      {!isAuth && (         
        <>
          <li className={styles.firstChild}> <NavLink className={styles["nav-link"]} to="/login" > LOG IN       </NavLink>   </li>
          <li className={styles.secondChild}> <NavLink className={styles["nav-link"]} to="/signUp"> SIGN UP     </NavLink>   </li>
        </>
        )}  
        {isAuth && (
          <li className={styles.logoutLi}><Button onClick={logOut} className={styles.logoutButton} variant="outline-danger">LOG OUT</Button></li>  
        )}
        <li> <NavLink className={styles["nav-link"]} to="/" end  > HOME           </NavLink>   </li>
        <li> <NavLink className={styles["nav-link"]} to="/contact" > CONTACT </NavLink>   </li>
        {isAuth && userPrivateInfo&&userPrivateInfo.is_patient && ( 
          <li><button className={styles["requestButton"]} onClick={handleRequestAppountment}><Link className={styles["nav-link"]}> Request Appointment</Link></button></li>
        )}
        {isAuth && userPrivateInfo && userPrivateInfo.is_hospital && ( 
          <li><button className={styles["requestButton"]} onClick={()=> navigate(`/hospitalAppointments/${userPrivateInfo && userPrivateInfo.id}`)}><Link className={styles["nav-link"]}>Check all Appointments</Link></button></li>
        )}
      </ul>
    </nav>
    <ModalAppointment visible={showAppointmentModal} closeModal={()=>setShowAppointmentModal(false)}>
        <MainAppointmentForm closeModal={()=>setShowAppointmentModal(false)} />
    </ModalAppointment>
    </>
  );
};

export default ModalHeader;
