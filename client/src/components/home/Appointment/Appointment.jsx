import slider1 from "../../../assets/images/slider1.jpg";
import slider2 from "../../../assets/images/slider2.jpg";
import slider3 from "../../../assets/images/slider3.jpg";
import slider4 from "../../../assets/images/slider4.jpg";
import slider5 from "../../../assets/images/slider5.jpg";
import styles from "./Appointment.module.css";
import { ReactComponent as AppIcon } from "../../../assets/images/RequestApp.svg";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Carousel from "react-bootstrap/Carousel";
import ModalAppointment from '../../../UI/appointmentModal/ModalAppointment'
import MainAppointmentForm from '../../appointmentForm/MainAppointmentForm'

const Appointment = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const { isAuth, userPrivateInfo } = useContext(AuthContext);
  return (
    <>
      <Carousel>
        <Carousel.Item interval={1000}>
          <div className={styles.imageSliderContainer}>
            <img className="d-block w-100" src={slider1} alt="First slide" />
          </div>
          <Carousel.Caption>
            <h1 className={styles.main_header}>
              Your Way to obtaining the best medical treatment
            </h1>
            <h3 className={styles.secondary_header}>
              Book your appointment now
            </h3>
            <div className={styles.reqLinkContainer}>
              {isAuth && userPrivateInfo && userPrivateInfo.is_patient && (
                <button onClick={() => setShowAppointmentModal(true)}>
                  <Link
                    className={`d-flex align-items-center justify-content-center gap-1 text-decoration-none ${styles.Icon_And_Link_container}`}
                  >
                    <AppIcon className={styles.reqIcon} />
                    <div className={`d-inline-block  ${styles.reqLink}`}>
                      Request an appointment
                    </div>
                  </Link>
                </button>
              )}
              {isAuth && userPrivateInfo && userPrivateInfo.is_patient && (
                <Link
                  className={`d-flex align-items-center justify-content-center gap-1 text-decoration-none ${styles.Icon_And_Link_container}`}
                  to={`/patientAppointments/${
                    userPrivateInfo && userPrivateInfo.id
                  }`}
                >
                  <AppIcon className={styles.reqIcon} />
                  <div className={`d-inline-block  ${styles.reqLink}`}>
                    Check Appointments
                  </div>
                </Link>
              )}
              {isAuth && userPrivateInfo && userPrivateInfo.is_hospital && (
                <Link
                  to={`/hospitalAppointments/${
                    userPrivateInfo && userPrivateInfo.id
                  }`}
                  className={`d-flex align-items-center gap-1 text-decoration-none ${styles.Icon_And_Link_container}`}
                >
                  <AppIcon className={styles.reqIcon} />
                  <div className={`d-inline-block ${styles.reqLink}`}>
                    Check all Appointments
                  </div>
                </Link>
              )}
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <div className={styles.imageSliderContainer}>
            <img className="d-block w-100" src={slider2} alt="Second slide" />
          </div>
          <Carousel.Caption>
            <h1 className={styles.main_header}>
              Prevention is better than cure
            </h1>
            <h3 className={styles.secondary_header}>
              Book your appointment now
            </h3>
            <div className={styles.reqLinkContainer}>
              {isAuth && userPrivateInfo && userPrivateInfo.is_patient && (
                <button onClick={() => setShowAppointmentModal(true)}>
                  <Link
                    className={`d-flex align-items-center justify-content-center gap-1 text-decoration-none ${styles.Icon_And_Link_container}`}
                  >
                    <AppIcon className={styles.reqIcon} />
                    <div className={`d-inline-block  ${styles.reqLink}`}>
                      Request an appointment
                    </div>
                  </Link>
                </button>
              )}
              {isAuth && userPrivateInfo && userPrivateInfo.is_patient && (
                <Link
                  className={`d-flex align-items-center justify-content-center gap-1 text-decoration-none ${styles.Icon_And_Link_container}`}
                  to={`/patientAppointments/${
                    userPrivateInfo && userPrivateInfo.id
                  }`}
                >
                  <AppIcon className={styles.reqIcon} />
                  <div className={`d-inline-block  ${styles.reqLink}`}>
                    Check Appointments
                  </div>
                </Link>
              )}
              {isAuth && userPrivateInfo && userPrivateInfo.is_hospital && (
                <Link
                  to={`/hospitalAppointments/${
                    userPrivateInfo && userPrivateInfo.id
                  }`}
                  className={`d-flex align-items-center gap-1 text-decoration-none ${styles.Icon_And_Link_container}`}
                >
                  <AppIcon className={styles.reqIcon} />
                  <div className={`d-inline-block ${styles.reqLink}`}>
                    Check all Appointments
                  </div>
                </Link>
              )}
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.imageSliderContainer}>
            <img className="d-block w-100" src={slider3} alt="Third slide" />
          </div>
          <Carousel.Caption>
            <h1 className={styles.main_header}>
              Good health and good sense are two of life’s greatest blessings
            </h1>
            <h3 className={styles.secondary_header}>
              Book your appointment now
            </h3>
            <div className={styles.reqLinkContainer}>
              {isAuth && userPrivateInfo && userPrivateInfo.is_patient && (
                <button onClick={() => setShowAppointmentModal(true)}>
                  <Link
                    className={`d-flex align-items-center justify-content-center gap-1 text-decoration-none ${styles.Icon_And_Link_container}`}
                  >
                    <AppIcon className={styles.reqIcon} />
                    <div className={`d-inline-block  ${styles.reqLink}`}>
                      Request an appointment
                    </div>
                  </Link>
                </button>
              )}
              {isAuth && userPrivateInfo && userPrivateInfo.is_patient && (
                <Link
                  className={`d-flex align-items-center justify-content-center gap-1 text-decoration-none ${styles.Icon_And_Link_container}`}
                  to={`/patientAppointments/${
                    userPrivateInfo && userPrivateInfo.id
                  }`}
                >
                  <AppIcon className={styles.reqIcon} />
                  <div className={`d-inline-block  ${styles.reqLink}`}>
                    Check Appointments
                  </div>
                </Link>
              )}
              {isAuth && userPrivateInfo && userPrivateInfo.is_hospital && (
                <Link
                  to={`/hospitalAppointments/${
                    userPrivateInfo && userPrivateInfo.id
                  }`}
                  className={`d-flex align-items-center gap-1 text-decoration-none ${styles.Icon_And_Link_container}`}
                >
                  <AppIcon className={styles.reqIcon} />
                  <div className={`d-inline-block ${styles.reqLink}`}>
                    Check all Appointments
                  </div>
                </Link>
              )}
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.imageSliderContainer}>
            <img className="d-block w-100" src={slider4} alt="Third slide" />
          </div>
          <Carousel.Caption>
            <h1 className={styles.main_header}>
              Heart disease is a food-borne illness
            </h1>
            <h3 className={styles.secondary_header}>
              Book your appointment now
            </h3>
            <div className={styles.reqLinkContainer}>
              {isAuth && userPrivateInfo && userPrivateInfo.is_patient && (
                <button onClick={() => setShowAppointmentModal(true)}>
                  <Link
                    className={`d-flex align-items-center justify-content-center gap-1 text-decoration-none ${styles.Icon_And_Link_container}`}
                  >
                    <AppIcon className={styles.reqIcon} />
                    <div className={`d-inline-block  ${styles.reqLink}`}>
                      Request an appointment
                    </div>
                  </Link>
                </button>
              )}
              {isAuth && userPrivateInfo && userPrivateInfo.is_patient && (
                <Link
                  className={`d-flex align-items-center justify-content-center gap-1 text-decoration-none ${styles.Icon_And_Link_container}`}
                  to={`/patientAppointments/${
                    userPrivateInfo && userPrivateInfo.id
                  }`}
                >
                  <AppIcon className={styles.reqIcon} />
                  <div className={`d-inline-block  ${styles.reqLink}`}>
                    Check Appointments
                  </div>
                </Link>
              )}
              {isAuth && userPrivateInfo && userPrivateInfo.is_hospital && (
                <Link
                  to={`/hospitalAppointments/${
                    userPrivateInfo && userPrivateInfo.id
                  }`}
                  className={`d-flex align-items-center gap-1 text-decoration-none ${styles.Icon_And_Link_container}`}
                >
                  <AppIcon className={styles.reqIcon} />
                  <div className={`d-inline-block ${styles.reqLink}`}>
                    Check all Appointments
                  </div>
                </Link>
              )}
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.imageSliderContainer}>
            <img className="d-block w-100" src={slider5} alt="Third slide" />
          </div>
          <Carousel.Caption>
            <h1 className={styles.main_header}>
              Health is not valued till sickness comes
            </h1>
            <h3 className={styles.secondary_header}>
              Book your appointment now
            </h3>
            <div className={styles.reqLinkContainer}>
              {isAuth && userPrivateInfo && userPrivateInfo.is_patient && (
                <button onClick={() => setShowAppointmentModal(true)}>
                  <Link
                    className={`d-flex align-items-center justify-content-center gap-1 text-decoration-none ${styles.Icon_And_Link_container}`}
                  >
                    <AppIcon className={styles.reqIcon} />
                    <div className={`d-inline-block  ${styles.reqLink}`}>
                      Request an appointment
                    </div>
                  </Link>
                </button>
              )}
              {isAuth && userPrivateInfo && userPrivateInfo.is_patient && (
                <Link
                  className={`d-flex align-items-center justify-content-center gap-1 text-decoration-none ${styles.Icon_And_Link_container}`}
                  to={`/patientAppointments/${
                    userPrivateInfo && userPrivateInfo.id
                  }`}
                >
                  <AppIcon className={styles.reqIcon} />
                  <div className={`d-inline-block  ${styles.reqLink}`}>
                    Check Appointments
                  </div>
                </Link>
              )}
              {isAuth && userPrivateInfo && userPrivateInfo.is_hospital && (
                <Link
                  to={`/hospitalAppointments/${
                    userPrivateInfo && userPrivateInfo.id
                  }`}
                  className={`d-flex align-items-center gap-1 text-decoration-none ${styles.Icon_And_Link_container}`}
                >
                  <AppIcon className={styles.reqIcon} />
                  <div className={`d-inline-block ${styles.reqLink}`}>
                    Check all Appointments
                  </div>
                </Link>
              )}
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <ModalAppointment
        visible={showAppointmentModal}
        closeModal={() => setShowAppointmentModal(false)}
      >
        <MainAppointmentForm
          closeModal={() => setShowAppointmentModal(false)}
        />
      </ModalAppointment>
    </>
  );
};

export default Appointment;
