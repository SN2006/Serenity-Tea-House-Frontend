import styles from "./UnderlineButton.module.css"

const UnderlineButton = (props) => {
    return <button onClick={props.onClick} disabled={props.disabled} className={styles.button}>
        {props.children}
    </button>
}

export default UnderlineButton;