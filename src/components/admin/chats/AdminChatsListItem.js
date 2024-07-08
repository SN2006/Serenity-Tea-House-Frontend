import styles from "./AdminChatsListItem.module.css"
import MiddleAvatar from "../../UI/avatars/MiddleAvatar";
import {forwardRef} from "react";
import {motion} from "framer-motion";

const itemVariants = {
    visible: {
        scale: 1
    },
    hover: {
        scale: 1.05
    },
    tap: {
        scale: 0.95
    }
}

const getOnlineString = (date) => {
    const diff = new Date() - date;
    console.log(diff);
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / 30;
    const years = months / 12;

    if (years >= 1) return `was online ${Math.floor(years)} years ago`;
    if (months >= 1) return `was online ${Math.floor(months)} months ago`;
    if (days >= 1) return `was online ${Math.floor(days)} days ago`;
    if (hours >= 1) return `was online ${Math.floor(hours)} hours ago`;
    if (minutes >= 1) return `was online ${Math.floor(minutes)} minutes ago`;

    return "Online";
}

export const AdminChatsListItem = forwardRef((props, ref) => {
    return <motion.div
        className={styles["chats__list-item__card"]}
        ref={ref}
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        variants={itemVariants}
        onClick={props.onClick}
    >
        <MiddleAvatar letter={props.user.name.at(0)}/>
        <div className={styles["chats__list-item__info"]}>
            <h3 className={styles["chats__list-item__name"]}>{`${props.user.name} ${props.user.surname}`}</h3>
            <p className={styles["chats__list-item__nickname"]}>{props.user.nickname}</p>
        </div>
        <div className={styles["chats__list-item__online-info"]}>
            <p className={styles["chats__list-item__online"]}>{getOnlineString(Date.parse(props.user.lastVisit))}</p>
        </div>
    </motion.div>
})

export const MAdminChatsListItem = motion(AdminChatsListItem);