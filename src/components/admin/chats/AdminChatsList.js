import styles from "./AdminChatsList.module.css"
import {Fragment, useEffect, useState} from "react";
import {request} from "../../../axios_helper";
import {AdminChatsListItem, MAdminChatsListItem} from "./AdminChatsListItem";

const AdminChatsList = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        request(
            "GET",
            "/api/v1/users",
            {},
            {},
            {}
        ).then(res => {
            setUsers(res.data.filter(user => user.id !== props.current.id));
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            setHasError(true);
            setErrorMessage(err.message);
        })
    }, []);

    let content = <h2>There are no chats:(</h2>;

    if (users.length > 0){
        content = <div className={styles['admin-chat__list']}>
            {users
                .filter(user => `${user.name} ${user.surname}`.toLowerCase().includes(props.filter.toLowerCase())
                    || user.nickname.toLowerCase().includes(props.filter.toLowerCase())
                )
                .map(user => <MAdminChatsListItem onClick={() => props.onSelect(user)} user={user} key={user.id}/>)}
        </div>
    }

    const showData = !isLoading && !hasError;

    return <Fragment>
        {isLoading && <h2>Loading...</h2>}
        {hasError && <h2>{errorMessage}</h2>}
        {showData && content}
    </Fragment>
}

export default AdminChatsList;