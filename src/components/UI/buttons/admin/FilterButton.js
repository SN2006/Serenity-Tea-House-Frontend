import styles from "./FilterButton.module.css"
import {forwardRef} from "react";
import {motion} from "framer-motion";

const variants = {
    visible: {
        transform: "scale(1)",
        background: "rgba(179, 158, 146, 0.85)",
        cursor: "pointer"
    },
    hover: {
        transform: "scale(1.05)",
    },
    tap: {
        transform: "scale(0.95)",
    },
    active: {
        transform: "scale(1)",
        background: "rgba(179, 158, 146, 1)",
        cursor: "auto"
    }
}

export const FilterButton = forwardRef(
    (props, ref) => {
        return <motion.button
            className={styles.button}
            variants={variants}
            whileHover={props.active ? "active" : "hover"}
            whileTap={props.active ? "active" : "tap"}
            animate={props.active ? "active" : "visible"}
            onClick={props.onClick}
        >
            <span>{props.children}</span>
        </motion.button>
    }
)