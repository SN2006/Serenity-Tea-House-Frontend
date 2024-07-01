import styles from "./AdminLogin.module.css"
import {AuthorizeCard} from "../../authorize/AuthorizeForm";
import AuthFormInput from "../../authorize/AuthFormInput";
import UnderlineButton from "../../UI/buttons/UnderlineButton";
import useInput from "../../../hooks/use-input";
import {useState} from "react";
import {request, setAuthToken} from "../../../axios_helper";

const validateEmail = (email) => {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
}

const AdminLogin = (props) => {
    const {
        value: email,
        hasError: hasEmailError,
        isValueValid: isInputEmailValid,
        inputChangeHandler: inputEmailChangeHandler,
        inputLostFocusHandler: inputEmailLostFocusHandler,
        resetInputValue: resetInputEmail,
    } = useInput(validateEmail, "");
    const {
        value: password,
        hasError: hasPasswordError,
        isValueValid: isInputPasswordValid,
        inputChangeHandler: inputPasswordChangeHandler,
        inputLostFocusHandler: inputPasswordLostFocusHandler,
        resetInputValue: resetInputPassword,
    } = useInput(password => password.trim() !== "", "");
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        setHasError(false);
        setErrorMessage("");
        request(
            "POST",
            "/api/v1/auth/login",
            {
                email: email,
                password: password,
            },
            {},
            {}
        ).then(response => {
            setAuthToken(response.data.token);
            props.onSubmit();
        }).catch(error => {
            if (error.response.status === 400 || error.response.status === 404) {
                setHasError(true);
                setErrorMessage(error.response.data.message);
            }
            // console.log(error);
        })
    }

    return <div className={styles.form}>
        <h1 className={styles["authorize-form__title"]}>Log in</h1>
        <AuthorizeCard>
            <form>
                <AuthFormInput
                    hasError={hasEmailError}
                    onChange={inputEmailChangeHandler}
                    value={email}
                    text="Email"
                    type="email"
                    onBlur={inputEmailLostFocusHandler}
                />
                <AuthFormInput
                    hasError={hasPasswordError}
                    onChange={inputPasswordChangeHandler}
                    value={password}
                    text="Password"
                    type="password"
                    onBlur={inputPasswordLostFocusHandler}
                />
            </form>
            {hasError && <p className={styles["error-msg"]}>{errorMessage}</p>}
        </AuthorizeCard>
        <div className={styles["login__action"]}>
            <UnderlineButton onClick={submitHandler} >Enter</UnderlineButton>
        </div>
    </div>
}

export default AdminLogin;