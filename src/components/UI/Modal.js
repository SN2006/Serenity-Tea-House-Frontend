import {Fragment} from "react";
import styles from "./Modal.module.css"
import ReactDOM from "react-dom";

const BackDrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onHideCart}></div>
}

const ModalWindow = (props) => {
    return <div className={styles.modal}>
        {props.children}
    </div>
}

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
    return <Fragment>
        {ReactDOM.createPortal(<BackDrop/>, portalElement)}
        {ReactDOM.createPortal(<ModalWindow>{props.children}</ModalWindow>, portalElement)}
    </Fragment>
}

export default Modal;