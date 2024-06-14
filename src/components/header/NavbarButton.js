import styles from "./NavbarButton.module.css";

const NavbarButton = (props) => {
    return <button onClick={props.onClick} className={styles.button} disabled={props.disabled}>
        {props.text}
    </button>
}

export default NavbarButton;