import styles from "./MyMessage.module.css"
import {motion} from "framer-motion";

const messageVariants = {
    basic: {
        opacity: 1,
        translateY: 0
    },
    animate: {
        opacity: [0, 1],
        translateX: ["-10rem", "0%"],
        transition: {duration: 0.5},
    }
}

const MyMessage = (props) => {
    return <motion.div
        className={styles.message}
        id={props.last ? "last" : `p${Math.random() * 1_000_000_000}`}
        variants={messageVariants}
        animate={props.animate ? "animate" : "basic"}
    >
        <p>{props.message}</p>
    </motion.div>
}

export default MyMessage;