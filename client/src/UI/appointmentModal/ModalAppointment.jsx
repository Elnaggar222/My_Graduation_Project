import styles from "./ModalAppointment.module.css"
import ReactDOM  from 'react-dom'
const ModalAppointment = ({ children , visible , closeModal }) => {

    if(!visible){
        return null
    }
    return ReactDOM.createPortal(
        <div className={styles["Modal-overlay"]} onClick={closeModal}>
            <div className={styles.modal} onClick={(e)=> e.stopPropagation()}>
                {children}
            </div>
        </div>
    ,document.querySelector("#modal-root"))
}

export default ModalAppointment