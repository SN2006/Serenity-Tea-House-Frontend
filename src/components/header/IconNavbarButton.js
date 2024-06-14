import styles from "./IconNavbarButton.module.css"

const IconNavbarButton = (props) => {
    const buttonClickHandler = () => {
        props.onClick();
    }

    return <button className={styles.button} onClick={buttonClickHandler}>
        <img src={props.src} alt="cart"/>
    </button>
}

export default IconNavbarButton;