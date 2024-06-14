import styles from "./AuthFormInput.module.css"
import PhoneInput from "react-phone-input-2";


export const AuthFormInputPhone = (props) => {

    const inputClasses = `${styles.input} ${props.hasError ? styles.error : ""}`;

    const onChange = (value) => {
        props.onChange({target: {value: value}});
    }

    return <div className={styles["auth-input"]}>
        <label htmlFor={props.name}>{props.text}:</label>
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

const AuthFormInput = (props) => {

    const inputClasses = `${styles.input} ${props.hasError ? styles.error : ''}`

    return <div className={styles["auth-input"]}>
        <label htmlFor={props.name}>{props.text}:</label>
        <input
            value={props.value}
            onBlur={props.onBlur}
            className={inputClasses}
            onChange={props.onChange}
            type={props.type}
            name={props.name}
            placeholder={props.placeholder ? props.placeholder : ''}
        />
    </div>
}

export default AuthFormInput;