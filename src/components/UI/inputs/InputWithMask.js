import styles from "./InputWithMask.module.css"
import InputMask from 'react-input-mask';

const InputWithMask = (props) => {
    const inputClasses = `${styles.input} ${props.hasError ? styles.error : ""}`;



    return <div className={styles["edit-input"]}>
        <label htmlFor={props.label}>{props.label}: </label>
        <InputMask
            mask={props.mask}
            placeholder={props.placeholder}
            maskChar="-"
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
        >
            {(inputProps) => <input {...inputProps} type="text" className={inputClasses} />}
        </InputMask>
    </div>
}

export default InputWithMask;