import styles from "./ClientChats.module.css"
import ChatsCard from "./ChatsCard";
import {useEffect, useState} from "react";
import {request} from "../../axios_helper";
import ChatsList from "./ChatsList";
import {motion} from "framer-motion";
import Footer from "../footer/Footer";
import ClientChat from "./ClientChat";

const ALL_CHATS = "all_chats";
const CHAT_BY_ID = "chat_by_id";

const chats_variants = {
    hidden: {
        opacity: 0,
        translateY: "3rem",
    },
    visible: {
        opacity: 1,
        translateY: 0,
        transition: {duration: 0.5},
    }
}

const Chats = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [admins, setAdmins] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setIsLoading(true);
        request(
            "GET",
            "/api/v1/users/admins-without-me",
            {},
            {},
            {}
        ).then(res => {
            setAdmins(res.data);
            setIsLoading(false);
        }).catch(err => {
            if (err.response.status === 401) {
                props.onUnauthorize();
            }else{
                console.log(err);
                setHasError(true);
                setErrorMessage("Server Error");
            }
            setIsLoading(false);
        })
    }, []);

    const showContent = !isLoading && !hasError;

    return <motion.div
        className={styles["chats"]}
        initial="hidden"
        animate="visible"
        variants={chats_variants}
    >
        <h1 className={styles["chats__title"]}>Chats</h1>
        <ChatsCard padding="62px 57px" width="calc(100% - 114px)">
            {isLoading && <h2>Loading...</h2>}
            {hasError && <h2>{errorMessage}</h2>}
            {showContent && <ChatsList onChoose={props.showChat} users={admins}/>}
        </ChatsCard>
        <Footer/>
    </motion.div>
}

const ClientChats = (props) => {
    const [currentPage, setCurrentPage] = useState(ALL_CHATS);
    const [user, setUser] = useState({});
    const [friend, setFriend] = useState({});

    const onOpenChatHandler = (friend) => {
        setFriend(friend);
        setCurrentPage(CHAT_BY_ID);
    }

    useEffect(() => {
        request(
            "GET",
            "/api/v1/users/current",
            {},
            {},
            {}
        ).then(response => {
            setUser(response.data);
        }).catch(error => {
            if (error.response.status === 401) {
                props.onUnauthorize();
            }else{
                console.log(error);
            }
        })
    }, []);

    const getContent = () => {
        switch (currentPage) {
            case ALL_CHATS: {
                return <Chats onUnauthorize={props.onUnauthorize} showChat={onOpenChatHandler}/>
            }
            case CHAT_BY_ID:{
                return <ClientChat user={user} friend={friend}/>
            }
            default:{
                return <div></div>
            }
        }
    }
    return <div className="container">
        {getContent()}
    </div>
}

export default ClientChats;