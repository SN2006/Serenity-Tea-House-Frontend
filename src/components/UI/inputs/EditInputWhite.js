import styles from "./EditInputWhite.module.css"

const EditInputWhite = (props) => {

    const inputClasses = `${styles.input} ${props.hasError ? styles.error : ""}`;

    return <div className={styles["edit-input"]}>
        <label htmlFor={props.label}>{props.label}: </label>
        <input className={inputClasses}
               name={props.label}
               type={props.type}
               value={props.value}
               onBlur={props.onBlur}
               onChange={props.onChange}
               placeholder={props.placeholder ? props.placeholder : ''}
        />
    </div>
}

export default EditInputWhite;