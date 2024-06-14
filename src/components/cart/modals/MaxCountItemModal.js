import styles from "./MaxCountItemModal.module.css"
import ArrowButton from "../../UI/buttons/LeftArrowButton";

const MaxCountItemModal = (props) => {
    return <div className={styles.modal}>
        <div className={styles.arrow}>
            <ArrowButton arrow="<" color={"white"} onClick={props.onChoose}/>
        </div>
        <h2 className={styles['modal__title']}>
            If you want more than 5kg, please contact with us
        </h2>
    </div>
}

export default MaxCountItemModal;