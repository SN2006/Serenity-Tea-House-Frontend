import styles from "./ClientChat.module.css"
import ChatInput from "../UI/inputs/ChatInput";
import MyMessage from "../UI/message/MyMessage";
import FriendMessage from "../UI/message/FriendMessage";
import Footer from "../footer/Footer";
import {useEffect, useState} from "react";
import {request} from "../../axios_helper";
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

const ClientChat = (props) => {
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stompClient, setStompClient] = useState(null);
    const [messageInputValue, setMessageInputValue] = useState("");

    useEffect(() => {
        setIsLoading(true);
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
        });
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
        <h1 className={styles.name}>{props.friend.name}</h1>
        <h5 className={styles.position}>{props.friend.position}</h5>
        <div className={styles['chat__box']}>
            <div className={styles['chat__messages']}>
                {content}
            </div>
            <div className={styles['chat__input-container']}>
                <ChatInput
                    placeholder="Write..."
                    bgcolor="light-brown"
                    stroke={"#6D6D6DFF"}
                    onChange={(e) => setMessageInputValue(e.target.value)}
                    value={messageInputValue}
                    onSend={sendMessage}
                />
            </div>
        </div>
        <Footer/>
    </motion.div>
}

export default ClientChat;