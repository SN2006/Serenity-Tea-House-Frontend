import styles from "./ClientChats.module.css"
import ChatsCard from "./ChatsCard";

const Chats = (props) => {
    return <div className={styles["chats"]}>
        <h1 className={styles["chats__title"]}>Chats</h1>
        <ChatsCard padding="62px 57px" width="calc(100% - 114px)">
            Hello
        </ChatsCard>
    </div>
}

const ClientChats = (props) => {
    return <Chats/>
}

export default ClientChats;