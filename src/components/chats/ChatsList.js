import styles from "./ChatsList.module.css"
import {ChatsListItem, MChatsListItem} from "./ChatsListItem";
import {motion} from "framer-motion";

const chatVariants = delay => ({
    hidden: {
        opacity: 0,
        scale: 0.5,
        transition: {duration: 0.15, delay: delay * 0.1},
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {duration: 0.55, delay: delay * 0.1},
    },
})

const ChatsList = (props) => {
    let content = <p>No chat to message:(</p>;
    if (props.users.length > 0){
        let counter = 1;
        content = props.users.map((user) => <MChatsListItem onClick={() => props.onChoose(user)} user={user} key={user.id} variants={chatVariants(counter++)}/> )
    }

    return <motion.div className={styles['chats__list']} initial="hidden" animate="visible">
        {content}
    </motion.div>
}

export default ChatsList;