import styles from "./FriendMessage.module.css"
import MiddleAvatar from "../avatars/MiddleAvatar";
import {motion} from "framer-motion";

const messageVariants = {
    basic: {
        opacity: 1,
        translateY: 0
    },
    animate: {
        opacity: [0, 1],
        translateX: ["10rem", 0],
        transition: {duration: 0.5},
    }
}

const FriendMessage = (props) => {
    return <motion.div
        variants={messageVariants}
        animate={props.animate ? "animate" : "basic"}
        className={styles.message}
        id={props.last ? "last" : `p${Math.random() * 1_000_000_000}`}
    >
        <MiddleAvatar letter={props.user.name.at(0)} size="69" fontSize="35"/>
        <p>{props.message}</p>
    </motion.div>
}

export default FriendMessage;