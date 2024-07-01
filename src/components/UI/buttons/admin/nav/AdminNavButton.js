import styles from "./AdminNavButton.module.css"
import {motion} from "framer-motion";
import {forwardRef} from "react";

const variants = {
    visible: {
        transform: "scale(1)",
        background: "rgba(179, 158, 146, 1)",
    },
    hover: {
        transform: "scale(1.05)",
    },
    tap: {
        transform: "scale(0.95)",
    },
    active: {
        transform: "scale(1)",
        background: "rgba(229, 216, 208, 1)",
    }
}

export const AdminNavButton = forwardRef(
    (props, ref) => {
        return (<motion.button
            onClick={props.onClick}
            variants={variants}
            initial="visible"
            animate={props.active ? "active" : "visible"}
            whileHover="hover"
            whileTap="tap"
            transition={{type: "spring", stiffness: 400, damping: 10}}
            className={styles.button}
            ref={ref}
        >
            <img src={props.src} alt="icon"/>
            <span>
                {props.children}
            </span>
        </motion.button>)
    })

export const MAdminNavButton = motion(AdminNavButton);