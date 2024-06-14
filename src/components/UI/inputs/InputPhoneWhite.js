import styles from "./InputPhoneWhite.module.css"
import PhoneInput from "react-phone-input-2";

const InputPhoneWhite = (props) => {
    const inputClasses = `${styles.input} ${props.hasError ? styles.error : ""}`;

    const onChange = (value) => {
        props.onChange({target: {value: value}});
    }

    return <div className={styles["edit-input"]}>
        <label htmlFor={props.label}>{props.label}:</label>
        <PhoneInput country="ua"
                    specialLabel=""
                    containerClass={styles['phone__container']}
                    inputClass={inputClasses}
                    buttonClass={styles['phone__btn']}
                    searchClass={styles['phone__btn']}
                    placeholder={"380 (95) 380-5554"}
                    value={props.value}
                    onChange={onChange}
                    onBlur={props.onBlur}
        />
    </div>
}

export default InputPhoneWhite;