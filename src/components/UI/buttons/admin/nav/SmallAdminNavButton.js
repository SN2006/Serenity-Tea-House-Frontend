import styles from "./SmallAdminNavButton.module.css"
import {forwardRef} from "react";
import {motion} from "framer-motion";

const variants = {
    visible: {
        transform: "scale(1)",
    },
    hover: {
        transform: "scale(1.15)",
    },
    active: {
        transform: "scale(0.90)",
    }
}

export const SmallAdminNavButton = forwardRef((props, ref) => {
    return <motion.button
        className={styles.button}
        ref={ref}
        variants={variants}
        initial="visible"
        whileHover="hover"
        whileTap="active"
        onClick={props.onClick}
    >
        {/*<img src={props.src} alt="icon" style={{transform: `translateX(${props.offsetX ? props.offsetX : 0}px)`}}/>*/}
        {props.svg}
    </motion.button>
})

export const MSmallAdminNavButton = motion(SmallAdminNavButton);