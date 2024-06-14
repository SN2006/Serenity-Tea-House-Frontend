import styles from "./ArrowButton.module.css";

const ArrowButton = (props) => {
    const classes = styles.button + (props.color ? " " + styles[props.color] : " ");
    return <button onClick={props.onClick} className={classes}>{props.arrow}</button>
}

export default ArrowButton;