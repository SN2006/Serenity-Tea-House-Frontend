import styles from "./AdminChatRoom.module.css"
import MiddleAvatar from "../../UI/avatars/MiddleAvatar";
import LeftArrowButton from "../../UI/buttons/LeftArrowButton";
import ChatInput from "../../UI/inputs/ChatInput";
import MyMessage from "../../UI/message/MyMessage";
import FriendMessage from "../../UI/message/FriendMessage";
import {useEffect, useRef, useState} from "react";
import {request} from "../../../axios_helper";
import SockJs from "sockjs-client"
import Stomp from "stompjs";
import {motion} from "framer-motion";

const chatVariants = {
    hidden: {
        opacity: 0,
        scale: 0.7,
        transition: {duration: 0.7},
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {duration: 0.7},
    }
}

const AdminChatRoom = (props) => {
    const [currentChat, setCurrentChat] = useState({});
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [messageInputValue, setMessageInputValue] = useState("");
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        setIsLoading(false);
        request(
            "GET",
            `/api/v1/chats/${props.user.id}/${props.friend.id}`,
            {},
            {},
            {}
        ).then(response => {
            // console.log(response.data);
            setCurrentChat(response.data);
            setMessages(response.data.messages);
            setIsLoading(false);
        }).catch(error => {
            console.log(error);
            setIsLoading(false);
        })

    }, []);

    useEffect(() => {
        if (currentChat === null) return;
        const socket = new SockJs('http://localhost:8080/ws');
        const client = Stomp.over(socket);
        client.debug = null;

        client.connect({}, () => {
            client.subscribe(`/queue/messages/${currentChat.id}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                receivedMessage['animate'] = true;
                setMessages((prevMessage) => [...prevMessage, receivedMessage]);
            });
        });

        setStompClient(client);

    }, [currentChat])

    useEffect(() => {
        if (messages.length > 0){
            setTimeout(() => {
                const last = document.getElementById("last");
                last.scrollIntoView({behavior: "smooth", block: "nearest", inline: "start"});
            }, 100);
        }
    }, [messages]);

    const sendMessage = () => {
        const message = {
            content: messageInputValue,
            chatRoom: {id: currentChat.id},
            from: {id: props.user.id}
        };
        stompClient.send('/app/room', {}, JSON.stringify(message));
        setMessageInputValue("");
    }

    let content = [];
    if (!isLoading){
        content = messages.map((message, index) => {
            if (message.from.id === props.user.id){
                return <MyMessage
                    animate={message.animate}
                    message={message.content}
                    last={index === messages.length - 1}
                />
            }
            return <FriendMessage
                animate={message.animate}
                last={index === messages.length - 1}
                user={props.friend}
                message={message.content}
            />
        })
    }

    return <motion.div
        className={styles.chat}
        initial="hidden"
        animate="visible"
        variants={chatVariants}
    >
        <div className={styles['chat__info']}>
            <MiddleAvatar letter={props.friend.name.at(0)}/>
            <div className={styles['chat__usernames']}>
                <p className={styles['name']}>{`${props.friend.name} ${props.friend.surname}`}</p>
                <p className={styles['nickname']}>{props.friend.nickname}</p>
            </div>
            <div className={styles['chat__arrow']}>
                <LeftArrowButton arrow=">" onClick={props.onExit} size="64px" color="light-grey"/>
            </div>
        </div>
        <div className={styles['chat__messages']}>
            {content}
        </div>
        <div className={styles['chat__input-container']}>
            <ChatInput
                placeholder="Write..."
                bgcolor="light-grey"
                stroke={"#6D6D6D"}
                onChange={(e) => setMessageInputValue(e.target.value)}
                value={messageInputValue}
                onSend={sendMessage}
            />
        </div>
    </motion.div>
}

export default AdminChatRoom;