import styles from "./RegisterForm.module.css"
import {Fragment, useState} from "react";
import {AuthorizeCard} from "./AuthorizeForm";
import AuthFormInput, {AuthFormInputPhone} from "./AuthFormInput";
import useInput from "../../hooks/use-input";
import {request, setAuthToken} from "../../axios_helper";
import UnderlineButton from "../UI/buttons/UnderlineButton";

const validateEmail = (email) => {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
}

const validatePassword = (password) => {
    let smallLetter = false;
    let bigLetter = false;
    let number = false;
    for (let i = 0; i < password.length; i++) {
        if (/[a-z]/.test(password.charAt(i))) {
            smallLetter = true;
        }
        if (/[A-Z]/.test(password.charAt(i))) {
            bigLetter = true;
        }
        if (/[0-9]/.test(password.charAt(i))) {
            number = true;
        }
    }
    return smallLetter && bigLetter && number && password.length >= 8;
}

const DataForm = (props) => {
    const {
        value: name,
        hasError: hasNameError,
        isValueValid: isInputNameValid,
        inputChangeHandler: inputNameChangeHandler,
        inputLostFocusHandler: inputNameLostFocusHandler,
        resetInputValue: resetInputName,
    } = useInput(name => name.trim() !== "", props.name);

    const {
        value: surname,
        hasError: hasSurnameError,
        isValueValid: isInputSurnameValid,
        inputChangeHandler: inputSurnameChangeHandler,
        inputLostFocusHandler: inputSurnameLostFocusHandler,
        resetInputValue: resetInputSurname,
    } = useInput(surname => surname.trim() !== "", props.surname);

    const {
        value: middleName,
        hasError: hasMiddleNameError,
        isValueValid: isInputMiddleNameValid,
        inputChangeHandler: inputMiddleNameChangeHandler,
        inputLostFocusHandler: inputMiddleNameLostFocusHandler,
        resetInputValue: resetInputMiddleName,
    } = useInput(middleName => middleName.trim() !== "", props.middleName);

    const submitHandler = () => {
        props.onChangeStadia(name, surname, middleName);
    }

    return <div className={styles.form}>
        <h1 className={styles['authorize-form__title']}>Your data</h1>
        <AuthorizeCard>
            <form>
                <AuthFormInput
                    text="Name"
                    type="text"
                    value={name}
                    onChange={inputNameChangeHandler}
                    onBlur={inputNameLostFocusHandler}
                    hasError={hasNameError}
                />
                <AuthFormInput
                    text="Surname"
                    type="text"
                    value={surname}
                    onChange={inputSurnameChangeHandler}
                    onBlur={inputSurnameLostFocusHandler}
                    hasError={hasSurnameError}
                />
                <AuthFormInput
                    text="Middle name"
                    type="text"
                    value={middleName}
                    onChange={inputMiddleNameChangeHandler}
                    onBlur={inputMiddleNameLostFocusHandler}
                    hasError={hasMiddleNameError}
                />
            </form>
            {props.hasError && <p className={styles["error-msg"]}>{props.errorMessage}</p>}
        </AuthorizeCard>
        <div className={styles["register__action"]}>
            <UnderlineButton onClick={submitHandler} disabled={!isInputNameValid || !isInputSurnameValid || !isInputMiddleNameValid}>Next</UnderlineButton>
            <UnderlineButton onClick={props.onChangeForm}>Login</UnderlineButton>
        </div>
    </div>
}

const CredentialForm = (props) => {
    const {
        value: phone,
        hasError: hasPhoneError,
        isValueValid: isInputPhoneValid,
        inputChangeHandler: inputPhoneChangeHandler,
        inputLostFocusHandler: inputPhoneLostFocusHandler,
        resetInputValue: resetInputPhone,
    } = useInput(phone => phone.trim().length >= 11, props.phone);
    const {
        value: email,
        hasError: hasEmailError,
        isValueValid: isInputEmailValid,
        inputChangeHandler: inputEmailChangeHandler,
        inputLostFocusHandler: inputEmailLostFocusHandler,
        resetInputValue: resetInputEmail,
    } = useInput(validateEmail, props.email);
    const {
        value: password,
        hasError: hasPasswordError,
        isValueValid: isInputPasswordValid,
        inputChangeHandler: inputPasswordChangeHandler,
        inputLostFocusHandler: inputPasswordLostFocusHandler,
        resetInputValue: resetInputPassword,
    } = useInput(validatePassword, props.password);

    const onPrevHandle = () => {
        props.onChangeStadia(phone, email, password);
    }

    const submitHandler = () => {
        props.onSubmit(phone, email, password);
    }

    return <div className={styles.form}>
        <h1 className={styles['authorize-form__title']}>Register</h1>
        <AuthorizeCard>
            <form>
                <AuthFormInputPhone
                    text={"Telephone"}
                    value={phone}
                    onChange={inputPhoneChangeHandler}
                    onBlur={inputPhoneLostFocusHandler}
                    hasError={hasPhoneError}
                />
                <AuthFormInput
                    text="Email"
                    type="email"
                    value={email}
                    onChange={inputEmailChangeHandler}
                    onBlur={inputEmailLostFocusHandler}
                    hasError={hasEmailError}
                    placeholder="Enter your email"
                />
                <AuthFormInput
                    text="Password"
                    type="password"
                    value={password}
                    onChange={inputPasswordChangeHandler}
                    onBlur={inputPasswordLostFocusHandler}
                    hasError={hasPasswordError}
                    placeholder="Minimum length 8, contains (a-z, A-Z, 0-9)"
                />
            </form>
            {props.hasError && <p className={styles["error-msg"]}>{props.errorMessage}</p>}
        </AuthorizeCard>
        <div className={styles["register__action"]}>
            <UnderlineButton onClick={submitHandler} disabled={!isInputPhoneValid ||  !isInputEmailValid || !isInputPasswordValid}>Register</UnderlineButton>
            <UnderlineButton onClick={onPrevHandle}>Prev</UnderlineButton>
        </div>
    </div>
}

const RegisterForm = (props) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowData, setIsShowData] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const submitHandler = (newPhone, newEmail, newPassword) => {
        setPhone(newPhone);
        setEmail(newEmail);
        setPassword(newPassword);
        console.log(name, surname, middleName, newPhone, newEmail, newPassword);
        request(
            "POST",
            "/api/v1/auth/register",
            {
                name: name,
                surname: surname,
                middleName: middleName,
                phone: newPhone,
                email: newEmail,
                password: newPassword,
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

    const onSecondStadia = (newName, newSurname, newMiddleName) => {
        setName(newName);
        setSurname(newSurname);
        setMiddleName(newMiddleName);
        setIsShowData(false);
    }

    const onFirstStadia = (newPhone, newEmail, newPassword) => {
        setPhone(newPhone);
        setEmail(newEmail);
        setPassword(newPassword);
        setIsShowData(true);
    }

    return <Fragment>
        {isShowData && <DataForm
            onChangeForm={props.onChangeForm}
            onChangeStadia={onSecondStadia}
            name={name}
            surname={surname}
            middleName={middleName}
            errorMessage={errorMessage}
            hasError={hasError}
        />}
        {!isShowData && <CredentialForm
            onChangeStadia={onFirstStadia}
            onSubmit={submitHandler}
            phone={phone}
            email={email}
            password={password}
            errorMessage={errorMessage}
            hasError={hasError}
        />}
    </Fragment>
}

export default RegisterForm;