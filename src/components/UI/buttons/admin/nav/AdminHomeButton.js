import styles from "./AdminHomeButton.module.css"
import logo from "../../../../../images/icons/Logo2.svg"

const AdminHomeButton = (props) => {
    return <button onClick={props.onClick} className={styles.button}>
        <img src={logo} alt="Logo"/>
    </button>
}

export default AdminHomeButton;