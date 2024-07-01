import styles from "./ChatsCard.module.css"

const ChatsCard = (props) => {
    return <div className={styles.card} style={{padding: props.padding, width: props.width}}>
        {props.children}
    </div>
}

export default ChatsCard;