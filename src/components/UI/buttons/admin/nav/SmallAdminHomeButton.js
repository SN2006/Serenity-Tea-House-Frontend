import styles from "./SmallAdminHomeButton.module.css"
import logo from "../../../../../images/icons/SmallLogo.svg"

const SmallAdminHomeButton = (props) => {
    return <button className={styles.button} onClick={props.onClick}>
        <img src={logo} alt="Logo"/>
    </button>
}

export default SmallAdminHomeButton;