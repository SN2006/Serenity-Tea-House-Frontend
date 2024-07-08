import styles from "./MiddleAvatar.module.css"

const MiddleAvatar = (props) => {
    if (props.src) {
        return <div className={styles.avatar} style={props.size ? {
            width: props.size + "px",
            height: props.size + "px",
        } : {}}>

        </div>
    }
    return <div className={styles.avatar + " " + styles['without-img']} style={props.size ? {
        width: props.size + "px",
        height: props.size + "px",
    } : {}}>
        <span style={props.fontSize ? {
            fontSize: props.fontSize + "px"
        } : {}}>
            {props.letter}
        </span>
    </div>
}

export default MiddleAvatar;