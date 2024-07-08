import styles from "./AdminChats.module.css"
import {useState} from "react";
import SearchInput from "./SearchInput";
import AdminChatsList from "./AdminChatsList";
import {motion} from "framer-motion";
import AdminChatRoom from "./AdminChatRoom";

const ALL_CHATS = "all_chats";
const CHAT_BY_ID = "chat_by_id";

const chatsVariants = {
    hidden: {
        opacity: 0,
        scale: 0.5,
        // translateY: "-5rem",
        transition: {duration: 0.7},
    },
    visible: {
        // translateY: "0",
        opacity: 1,
        scale: 1,
        transition: {duration: 0.7},
    }
}

const Chats = (props) => {
    const [filter, setFilter] = useState("");
    const searchChangeHandler = (value) => {
        setFilter(value);
    }
    return <motion.div className={styles.chats} variants={chatsVariants} initial="hidden" animate="visible">
        <h1 className={styles["chats__title"]}>Chats</h1>
        <SearchInput onChange={searchChangeHandler} value={filter}/>
        <AdminChatsList current={props.admin} filter={filter} onSelect={props.showChat}/>
    </motion.div>
}

const AdminChats = (props) => {
    const [currentPage, setCurrentPage] = useState(ALL_CHATS);
    const [friend, setFriend] = useState(-1);

    const onOpenChatHandler = (friend) => {
        setFriend(friend)
        setCurrentPage(CHAT_BY_ID);
    }

    const onExitFromChatHandler = () => {
        setCurrentPage(ALL_CHATS);
    }

    const getContent = () => {
        switch (currentPage) {
            case ALL_CHATS: {
                return <Chats admin={props.admin} showChat={onOpenChatHandler}/>
            }
            case CHAT_BY_ID: {
                return <AdminChatRoom user={props.admin} friend={friend} onExit={onExitFromChatHandler}/>
            }
            default:{
                return <div></div>
            }
        }
    }
    return <div>
        {getContent()}
    </div>
}

export default AdminChats;