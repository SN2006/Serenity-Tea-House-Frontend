import styles from "./DeleteItemModal.module.css"

const DeleteItemModal = (props) => {

    const yesClickHandler = () => {
        props.onChoose(true);
    }

    const noClickHandler = () => {
        props.onChoose(false);
    }

    return <div className={styles.modal}>
        <h2 className={styles['modal__title']}>Do you want to remove an item from your cart?</h2>
        <div className={styles['modal__buttons']}>
            <button onClick={yesClickHandler}>Yes</button>
            <button onClick={noClickHandler}>No</button>
        </div>
    </div>
}

export default DeleteItemModal