import styles from "./EditUserDataPage.module.css"
import useInput from "../../hooks/use-input";
import UnderlineButton from "../UI/buttons/UnderlineButton";
import {request} from "../../axios_helper";
import EditInputWhite from "../UI/inputs/EditInputWhite";
import InputPhoneWhite from "../UI/inputs/InputPhoneWhite";
import {useEffect, useState} from "react";

const EditUserCard = (props) => {
    return <div className={styles.card}>
        {props.children}
    </div>
}

const EditUserDataPage = (props) => {
    const [nickNames, setNickNames] = useState([]);

    const checkNickname = (nickname) => {
        if (nickNames.includes(nickname)) return false;
        return /^@[\w_]{4,30}$/.test(nickname);
    }

    const {
        value: name,
        hasError: hasNameError,
        isValueValid: isInputNameValid,
        inputChangeHandler: inputNameChangeHandler,
        inputLostFocusHandler: inputNameLostFocusHandler,
        resetInputValue: resetInputName,
    } = useInput(name => name.trim() !== "", props.user.name);

    const {
        value: surname,
        hasError: hasSurnameError,
        isValueValid: isInputSurnameValid,
        inputChangeHandler: inputSurnameChangeHandler,
        inputLostFocusHandler: inputSurnameLostFocusHandler,
        resetInputValue: resetInputSurname,
    } = useInput(surname => surname.trim() !== "", props.user.surname);

    const {
        value: middleName,
        hasError: hasMiddleNameError,
        isValueValid: isInputMiddleNameValid,
        inputChangeHandler: inputMiddleNameChangeHandler,
        inputLostFocusHandler: inputMiddleNameLostFocusHandler,
        resetInputValue: resetInputMiddleName,
    } = useInput(middleName => middleName.trim() !== "", props.user.middleName);
    const {
        value: nickname,
        hasError: hasNicknameError,
        isValueValid: isInputNicknameValid,
        inputChangeHandler: inputNicknameChangeHandler,
        inputLostFocusHandler: inputNicknameLostFocusHandler,
        resetInputValue: resetInputNickname,
    } = useInput(checkNickname, props.user.nickname);
    const {
        value: country,
        hasError: hasCountryError,
        isValueValid: isInputCountryValid,
        inputChangeHandler: inputCountryChangeHandler,
        inputLostFocusHandler: inputCountryLostFocusHandler,
        resetInputValue: resetInputCountry,
    } = useInput(country => country.trim() !== "", props.user.address.country);
    const {
        value: city,
        hasError: hasCityError,
        isValueValid: isInputCityValid,
        inputChangeHandler: inputCityChangeHandler,
        inputLostFocusHandler: inputCityLostFocusHandler,
        resetInputValue: resetInputCity,
    } = useInput(city => true, props.user.address.city);
    const {
        value: phone,
        hasError: hasPhoneError,
        isValueValid: isInputPhoneValid,
        inputChangeHandler: inputPhoneChangeHandler,
        inputLostFocusHandler: inputPhoneLostFocusHandler,
        resetInputValue: resetInputPhone,
    } = useInput(phone => phone.trim().length >= 11, props.user.phone);

    useEffect(() => {
        request(
            "GET",
            `/api/v1/users/nicknames/without-id/${props.user.id}`,
            {},
            {},
            {}
        ).then(res => {
            setNickNames(res.data);
            // console.log(res.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const saveHandler = () => {
        const body = {
            id: props.user.id,
            name: name,
            surname: surname,
            middleName: middleName,
            phone: phone,
            nickname: nickname,
            address: {
                id: props.user.address.id,
                country: country,
                city: city,
            }
        }
        request(
            "PUT",
            `/api/v1/users/${props.user.id}`,
            body,
            {},
            {}
        ).then(response => {
            // console.log(response);
            props.onSubmit();
        }).catch(error => console.log(error))
    }

    const isFormValid = isInputNameValid && isInputSurnameValid && isInputMiddleNameValid && isInputNicknameValid && isInputCountryValid && isInputCityValid && isInputPhoneValid;

    return <div className={styles.edit}>
        <h1 className={styles["edit__title"]}>My account</h1>
        <EditUserCard>
            <form>
                <EditInputWhite
                    label="Name"
                    type="text"
                    onChange={inputNameChangeHandler}
                    onBlur={inputNameLostFocusHandler}
                    value={name}
                    hasError={hasNameError}
                />
                <EditInputWhite
                    label="Surname"
                    type="text"
                    onChange={inputSurnameChangeHandler}
                    onBlur={inputSurnameLostFocusHandler}
                    value={surname}
                    hasError={hasSurnameError}
                />
                <EditInputWhite
                    label="Middle name"
                    type="text"
                    onChange={inputMiddleNameChangeHandler}
                    onBlur={inputMiddleNameLostFocusHandler}
                    value={middleName}
                    hasError={hasMiddleNameError}
                />
                <EditInputWhite
                    label="Nickname"
                    type="text"
                    onChange={inputNicknameChangeHandler}
                    onBlur={inputNicknameLostFocusHandler}
                    value={nickname}
                    hasError={hasNicknameError}
                    placeholder="@nickname"
                />
                <EditInputWhite
                    label="Country"
                    type="text"
                    onChange={inputCountryChangeHandler}
                    onBlur={inputCountryLostFocusHandler}
                    value={country}
                    hasError={hasCountryError}
                />
                <EditInputWhite
                    label="City"
                    type="text"
                    onChange={inputCityChangeHandler}
                    onBlur={inputCityLostFocusHandler}
                    value={city}
                    hasError={hasCityError}
                />
                <InputPhoneWhite
                    label="Phone"
                    type="tel"
                    onChange={inputPhoneChangeHandler}
                    onBlur={inputPhoneLostFocusHandler}
                    value={phone}
                    hasError={hasPhoneError}
                />
            </form>
        </EditUserCard>
        <div className={styles["edit__actions"]}>
            <UnderlineButton onClick={saveHandler} disabled={!isFormValid}>Save</UnderlineButton>
            <UnderlineButton onClick={props.onSubmit}>Return</UnderlineButton>
        </div>
    </div>
}

export default EditUserDataPage;