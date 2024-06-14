import styles from "./TransparentButton.module.css"
import {motion} from "framer-motion";

const TransparentButton = (props) => {

    return <motion.button
        onClick={props.onClick}
        className={styles.button}
    >
        {props.children}
    </motion.button>
}

export default TransparentButton;