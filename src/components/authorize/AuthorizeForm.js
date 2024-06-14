import styles from "./AuthorizeForm.module.css"
import {useState} from "react";
import LogInForm from "./LogInForm";
import RegisterForm from "./RegisterForm";

export const AuthorizeCard = (props) => {
    return <div
        className={styles.card}
    >
        {props.children}
    </div>
}

const AuthorizeForm = (props) => {
    const [isRegister, setIsRegister] = useState(false);

    const onChangeForm = () => {
        setIsRegister(prevState => !prevState);
    }

    return <div className="container">
        <section className={styles["authorize-form"]}>
            {!isRegister && <LogInForm onSubmit={props.onAuthorization} onChangeForm={onChangeForm}/>}
            {isRegister && <RegisterForm onSubmit={props.onAuthorization} onChangeForm={onChangeForm}/>}
        </section>
    </div>
}

export default AuthorizeForm;