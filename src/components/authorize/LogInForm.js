import AuthFormInput from "./AuthFormInput";
import {AuthorizeCard} from "./AuthorizeForm";
import {Fragment, useState} from "react";
import styles from "./LogInForm.module.css"
import {request, setAuthToken} from "../../axios_helper";
import UnderlineButton from "../UI/buttons/UnderlineButton";

const validateEmail = (email) => {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
}

const LogInForm = (props) => {
    const [email, setEmail] = useState("");
    const [hasEmailError, setHasEmailError] = useState(true);
    const [wasEmailFocused, setWasEmailFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [hasPasswordError, setHasPasswordError] = useState(true);
    const [wasPasswordFocused, setWasPasswordFocused] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onChangeEmailHandler = (e) => {
        setEmail(e.target.value);
        setHasEmailError(!validateEmail(e.target.value));
    }

    const onEmailBlurHandler = () => {
        setWasEmailFocused(true);
    }

    const onChangePasswordHandler = (e) => {
        setPassword(e.target.value);
        setHasPasswordError(e.target.value.trim().length === 0);
    }

    const onPasswordBlurHandler = () => {
        setWasPasswordFocused(true);
    }

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
            setHasError(true);
            setErrorMessage(error.response.data.message);
        })
    }

    return <div className={styles.form}>
        <h1 className={styles["authorize-form__title"]}>Log in</h1>
        <AuthorizeCard>
            <form onSubmit={submitHandler}>
                <AuthFormInput
                    hasError={hasEmailError&&wasEmailFocused}
                    onChange={onChangeEmailHandler}
                    value={email}
                    text="Email"
                    type="email"
                    onBlur={onEmailBlurHandler}
                />
                <AuthFormInput
                    hasError={hasPasswordError&&wasPasswordFocused}
                    onChange={onChangePasswordHandler}
                    value={password}
                    text="Password"
                    type="password"
                    onBlur={onPasswordBlurHandler}
                />
            </form>
            {hasError && <p className={styles["error-msg"]}>{errorMessage}</p>}
        </AuthorizeCard>
        <div className={styles["login__action"]}>
            <UnderlineButton onClick={submitHandler} disabled={hasEmailError||hasPasswordError}>Enter</UnderlineButton>
            <UnderlineButton onClick={props.onChangeForm}>Register</UnderlineButton>
        </div>
    </div>
}

export default LogInForm;