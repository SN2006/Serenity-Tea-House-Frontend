import styles from "./SearchInput.module.css"
import {motion} from "framer-motion";
import {useState} from "react";

const inputVariants = {
    visible: {
        boxShadow: `0 0 0 2px rgba(159, 149, 143, 0.7), 0 0 0 1px rgba(159, 149, 143, 1)`,
        transition: {
            boxShadow: {
                duration: 0.3,
                from: `0 0 0 5px rgba(159, 149, 143, 0.7), 0 0 0 4px rgba(159, 149, 143, 1)`
            }
        }
    },
    focus:{
        boxShadow: `0 0 0 10px rgba(159, 149, 143, 1), 0 0 0 50px rgba(159, 149, 143, 0)`,
        transition: {
            boxShadow: {
                duration: 0.5,
                from: `0 0 0 5px rgba(159, 149, 143, 0.7), 0 0 0 4px rgba(159, 149, 143, 1)`
            }
        }
    }
}

const SearchInput = (props) => {
    return <motion.div className={styles.inner}>
        <motion.input
            variants={inputVariants}
            className={styles.input}
            initial={false}
            animate="visible"
            whileFocus="focus"
            placeholder="Enter user name or surname to find a chat"
            onChange={(e) => props.onChange(e.target.value)}
            value={props.value}
        />
    </motion.div>
}

export default SearchInput;