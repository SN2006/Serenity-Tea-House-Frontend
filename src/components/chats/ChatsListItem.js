import styles from "./ChatsListItem.module.css"
import {forwardRef} from "react";
import MiddleAvatar from "../UI/avatars/MiddleAvatar";
import {motion} from "framer-motion";

export const ChatsListItem = forwardRef(
    (props, ref) => {
    return <div ref={ref} className={styles['chats__list-item']} onClick={props.onClick}>
        <MiddleAvatar letter={props.user.name.at(0)}/>
        <div className={styles.info}>
            <h3 className={styles.name}>{props.user.name}</h3>
            <div>
                <p className={styles.paragraph}>{props.user.nickname}</p>
                <p className={styles.paragraph}>{props.user.position}</p>
            </div>
        </div>
    </div>
    })

export const MChatsListItem = motion(ChatsListItem);