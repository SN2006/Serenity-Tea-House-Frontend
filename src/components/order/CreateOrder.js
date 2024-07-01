import {useContext, useEffect, useState} from "react";
import styles from "./CreateOrder.module.css"
import CartContext from "../../store/cart-context";
import {request} from "../../axios_helper";
import EditInputWhite from "../UI/inputs/EditInputWhite";
import useInput from "../../hooks/use-input";
import UnderlineButton from "../UI/buttons/UnderlineButton";
import InputPhoneWhite from "../UI/inputs/InputPhoneWhite";
import InputWithMask from "../UI/inputs/InputWithMask";
import CartItem from "../cart/CartItem";
import {CART_PAGE, CREATE_ORDER_PAGE} from "../../utils/Constants";


const CreateOrderCard = (props) => {
    return <div className={styles.card}>
        {props.children}
    </div>
}

const ContactDataForm = (props) => {
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
        value: phone,
        hasError: hasPhoneError,
        isValueValid: isInputPhoneValid,
        inputChangeHandler: inputPhoneChangeHandler,
        inputLostFocusHandler: inputPhoneLostFocusHandler,
        resetInputValue: resetInputPhone,
    } = useInput(phone => phone.trim().length >= 11, props.phone);

    const {
        value: country,
        hasError: hasCountryError,
        isValueValid: isInputCountryValid,
        inputChangeHandler: inputCountryChangeHandler,
        inputLostFocusHandler: inputCountryLostFocusHandler,
        resetInputValue: resetInputCountry,
    } = useInput(country => country.trim() !== "", props.country);
    const {
        value: city,
        hasError: hasCityError,
        isValueValid: isInputCityValid,
        inputChangeHandler: inputCityChangeHandler,
        inputLostFocusHandler: inputCityLostFocusHandler,
        resetInputValue: resetInputCity,
    } = useInput(city => city.trim() !== "", props.city);
    const {
        value: address,
        hasError: hasAddressError,
        isValueValid: isInputAddressValid,
        inputChangeHandler: inputAddressChangeHandler,
        inputLostFocusHandler: inputAddressLostFocusHandler,
        resetInputValue: resetInputAddress,
    } = useInput(address => address.trim() !== "", props.address);

    const onSubmit = () => {
        props.onSubmit({
            name: name,
            surname: surname,
            phone: phone,
            country: country,
            city: city,
            address: address,
        })
    }

    const isFormValid = isInputNameValid && isInputSurnameValid && isInputPhoneValid
        && isInputCountryValid &&isInputCityValid && isInputAddressValid;

    return <div className={styles["create-order"]}>
        <h1 className={styles["create-order__title"]}>Contacts</h1>
        <CreateOrderCard>
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
            <InputPhoneWhite
                label="Phone"
                type="tel"
                onChange={inputPhoneChangeHandler}
                onBlur={inputPhoneLostFocusHandler}
                value={phone}
                hasError={hasPhoneError}
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
                onBlue={inputCityLostFocusHandler}
                value={city}
                hasError={hasCityError}
            />
            <EditInputWhite
                label="Address"
                type="text"
                onChange={inputAddressChangeHandler}
                onBlur={inputAddressLostFocusHandler}
                value={address}
                hasError={hasAddressError}
            />
        </CreateOrderCard>
        <p className={styles.total}>{`Total: ${props.total}$`}</p>
        <UnderlineButton onClick={onSubmit} disabled={!isFormValid}>continue</UnderlineButton>
    </div>
}

const PaymentForm = (props) => {
    const {
        value: cardNumber,
        hasError: hasCardNumberError,
        isValueValid: isInputCardNumberValid,
        inputChangeHandler: inputCardNumberChangeHandler,
        inputLostFocusHandler: inputCardNumberLostFocusHandler,
        resetInputValue: resetInputCardNumber,
    } = useInput(cardNumber => /[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}/.test(cardNumber), "");

    const {
        value: nameOnTheCard,
        hasError: hasNameOnTheCardError,
        isValueValid: isInputNameOnTheCardValid,
        inputChangeHandler: inputNameOnTheCardChangeHandler,
        inputLostFocusHandler: inputNameOnTheCardLostFocusHandler,
        resetInputValue: resetInputNameOnTheCard,
    } = useInput(nameOnTheCard => nameOnTheCard.trim() !== "", "");

    const {
        value: validityPeriod,
        hasError: hasValidityPeriodError,
        isValueValid: isInputValidityPeriodValid,
        inputChangeHandler: inputValidityPeriodChangeHandler,
        inputLostFocusHandler: inputValidityPeriodLostFocusHandler,
        resetInputValue: resetInputValidityPeriod,
    } = useInput(validityPeriod => {
        const re = /[0-9]{2}\/[0-9]{2}/;
        if (!re.test(validityPeriod)) return false;
        const split = validityPeriod.split("/");
        if (+split[0] > 12) return false;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        if (currentYear === 2000 + +split[1]){
            return currentMonth <= +split[0];
        }
        return 2000 + +split[1] >= currentYear;
    }, "");

    const {
        value: cvv,
        hasError: hasCvvError,
        isValueValid: isInputCvvValid,
        inputChangeHandler: inputCvvChangeHandler,
        inputLostFocusHandler: inputCvvLostFocusHandler,
        resetInputValue: resetInputCvv,
    } = useInput(cvv => /[0-9]{3}/.test(cvv), "");

    const onSubmit = () => {
        props.onSubmit({
            cardNumber: cardNumber,
            nameOnTheCard: nameOnTheCard,
            validityPeriod: validityPeriod,
            cvv: cvv
        })
    }

    const isFormValid = isInputCardNumberValid && isInputValidityPeriodValid &&
        isInputNameOnTheCardValid && isInputCvvValid;

    return <div className={styles["create-order"]}>
        <h1 className={styles["create-order__title"]}>Payment</h1>
        <CreateOrderCard>
            <InputWithMask
                label="Card number"
                type="text"
                mask="9999 9999 9999 9999"
                placeholder="1234 5678 9123 4567"
                value={cardNumber}
                hasError={hasCardNumberError}
                onChange={inputCardNumberChangeHandler}
                onBlur={inputCardNumberLostFocusHandler}
            />
            <EditInputWhite
                label="Name on the card"
                type="text"
                onChange={inputNameOnTheCardChangeHandler}
                onBlur={inputNameOnTheCardLostFocusHandler}
                value={nameOnTheCard}
                hasError={hasNameOnTheCardError}
            />
            <InputWithMask
                label="MM/YY"
                type="text"
                mask="99/99"
                placeholder="01/27"
                value={validityPeriod}
                hasError={hasValidityPeriodError}
                onChange={inputValidityPeriodChangeHandler}
                onBlur={inputValidityPeriodLostFocusHandler}
            />
            <InputWithMask
                label="CVC"
                type="text"
                mask="999"
                placeholder="176"
                value={cvv}
                hasError={hasCvvError}
                onChange={inputCvvChangeHandler}
                onBlur={inputCvvLostFocusHandler}
            />
        </CreateOrderCard>
        <p className={styles.total}>{`Total: ${props.total}$`}</p>
        <UnderlineButton onClick={onSubmit} disabled={!isFormValid}>continue</UnderlineButton>
    </div>
}

const CheckForm = (props) => {
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
        value: phone,
        hasError: hasPhoneError,
        isValueValid: isInputPhoneValid,
        inputChangeHandler: inputPhoneChangeHandler,
        inputLostFocusHandler: inputPhoneLostFocusHandler,
        resetInputValue: resetInputPhone,
    } = useInput(phone => phone.trim().length >= 11, props.phone);

    const {
        value: country,
        hasError: hasCountryError,
        isValueValid: isInputCountryValid,
        inputChangeHandler: inputCountryChangeHandler,
        inputLostFocusHandler: inputCountryLostFocusHandler,
        resetInputValue: resetInputCountry,
    } = useInput(country => country.trim() !== "", props.country);

    const {
        value: city,
        hasError: hasCityError,
        isValueValid: isInputCityValid,
        inputChangeHandler: inputCityChangeHandler,
        inputLostFocusHandler: inputCityLostFocusHandler,
        resetInputValue: resetInputCity,
    } = useInput(city => city.trim() !== "", props.city);

    const {
        value: address,
        hasError: hasAddressError,
        isValueValid: isInputAddressValid,
        inputChangeHandler: inputAddressChangeHandler,
        inputLostFocusHandler: inputAddressLostFocusHandler,
        resetInputValue: resetInputAddress,
    } = useInput(address => address.trim() !== "", props.address);

    const {
        value: cardNumber,
        hasError: hasCardNumberError,
        isValueValid: isInputCardNumberValid,
        inputChangeHandler: inputCardNumberChangeHandler,
        inputLostFocusHandler: inputCardNumberLostFocusHandler,
        resetInputValue: resetInputCardNumber,
    } = useInput(cardNumber => /[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}/.test(cardNumber), props.cardNumber);

    const {
        value: nameOnTheCard,
        hasError: hasNameOnTheCardError,
        isValueValid: isInputNameOnTheCardValid,
        inputChangeHandler: inputNameOnTheCardChangeHandler,
        inputLostFocusHandler: inputNameOnTheCardLostFocusHandler,
        resetInputValue: resetInputNameOnTheCard,
    } = useInput(nameOnTheCard => nameOnTheCard.trim() !== "", props.nameOnTheCard);

    const {
        value: validityPeriod,
        hasError: hasValidityPeriodError,
        isValueValid: isInputValidityPeriodValid,
        inputChangeHandler: inputValidityPeriodChangeHandler,
        inputLostFocusHandler: inputValidityPeriodLostFocusHandler,
        resetInputValue: resetInputValidityPeriod,
    } = useInput(validityPeriod => {
        const re = /[0-9]{2}\/[0-9]{2}/;
        if (!re.test(validityPeriod)) return false;
        const split = validityPeriod.split("/");
        if (+split[0] > 12) return false;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        if (currentYear === 2000 + +split[1]){
            return currentMonth <= +split[0];
        }
        return 2000 + +split[1] >= currentYear;
    }, props.validityPeriod);

    const {
        value: cvv,
        hasError: hasCvvError,
        isValueValid: isInputCvvValid,
        inputChangeHandler: inputCvvChangeHandler,
        inputLostFocusHandler: inputCvvLostFocusHandler,
        resetInputValue: resetInputCvv,
    } = useInput(cvv => /[0-9]{3}/.test(cvv), props.cvv);

    const onSubmit = () => {
        let body = {
            userId: props.userId,
            address: {
                country: country,
                city: city,
                address: address
            },
            cardInfo: {
                cardNumber: cardNumber,
                nameOnTheCard: nameOnTheCard,
                validityPeriod: validityPeriod,
                cvv: cvv
            },
            buyerInfo: {
                name: name,
                surname: surname,
                phone: phone
            },
            products: []
        }
        props.ctx.items.forEach((item) => {
            body.products.push({id: item.product.id, amount: item.amount});
        })
        request(
            "POST",
            "/api/v1/orders",
            body,
            {},
            {}
        ).then((response) => {
            console.log(response);
            props.onSubmit();
        }).catch(error => {
            console.log(error)
        })
    }

    const isFormValid = isInputNameValid && isInputSurnameValid && isInputPhoneValid && isInputCountryValid &&
        isInputCityValid && isInputAddressValid && isInputCardNumberValid && isInputNameOnTheCardValid &&
        isInputValidityPeriodValid && isInputCvvValid && props.ctx.items.length > 0;

    let content = <p className={styles["cart__empty-msg"]}>the shopping cart is empty, it means  that it's time to buy something</p>
    console.log(props.ctx.items);
    if (props.ctx.items.length > 0) {
        content = <div className={styles["cart__items"]}>
            {props.ctx.items.map((item) =>
                <CartItem
                    key={item.product.id}
                    prevPage={CREATE_ORDER_PAGE}
                    onSelectProduct={props.onSelectProduct}
                    item={item}
                    onAdd={props.ctx.addItem}
                    onRemove={props.ctx.removeItem}
                    maxAmount={props.maxAmountPerProduct}/>)}
        </div>
    }

    return <div className={styles["create-order"]}>
        <h1 className={styles["create-order__title"]}>Check and confirm</h1>
        <CreateOrderCard>
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
            <InputPhoneWhite
                label="Phone"
                type="tel"
                onChange={inputPhoneChangeHandler}
                onBlur={inputPhoneLostFocusHandler}
                value={phone}
                hasError={hasPhoneError}
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
                onBlue={inputCityLostFocusHandler}
                value={city}
                hasError={hasCityError}
            />
            <EditInputWhite
                label="Address"
                type="text"
                onChange={inputAddressChangeHandler}
                onBlur={inputAddressLostFocusHandler}
                value={address}
                hasError={hasAddressError}
            />
            <InputWithMask
                label="Card number"
                type="text"
                mask="9999 9999 9999 9999"
                placeholder="1234 5678 9123 4567"
                value={cardNumber}
                hasError={hasCardNumberError}
                onChange={inputCardNumberChangeHandler}
                onBlur={inputCardNumberLostFocusHandler}
            />
            <EditInputWhite
                label="Name on the card"
                type="text"
                onChange={inputNameOnTheCardChangeHandler}
                onBlur={inputNameOnTheCardLostFocusHandler}
                value={nameOnTheCard}
                hasError={hasNameOnTheCardError}
            />
            <InputWithMask
                label="MM/YY"
                type="text"
                mask="99/99"
                placeholder="01/27"
                value={validityPeriod}
                hasError={hasValidityPeriodError}
                onChange={inputValidityPeriodChangeHandler}
                onBlur={inputValidityPeriodLostFocusHandler}
            />
            <InputWithMask
                label="CVC"
                type="text"
                mask="999"
                placeholder="176"
                value={cvv}
                hasError={hasCvvError}
                onChange={inputCvvChangeHandler}
                onBlur={inputCvvLostFocusHandler}
            />
        </CreateOrderCard>
        <h3 className={styles["in-order"]}>In order:</h3>
        {content}
        <p className={styles.total}>{`Total: ${props.ctx.totalAmount}$`}</p>
        <UnderlineButton onClick={onSubmit} disabled={!isFormValid}>confirm</UnderlineButton>
    </div>
}

const ThankMessage = (props) => {
    return <div className={styles.thanks}>
        <h1 className={styles["thanks__msg"]}>
            <p>Thank you for your order!</p>
            <p>Let the wonderful taste inspire you to do something incredible and wonderful!</p>
            <p>Best wishes Serenity Tea House!</p>
        </h1>
    </div>
}

const CreateOrder = (props) => {
    const [userId, setUserId] = useState(null);
    const [stadia, setStadia] = useState(0);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [nameOnTheCard, setNameOnTheCard] = useState('');
    const [validityPeriod, setValidityPeriod] = useState('');
    const [cvv, setCvv] = useState('');
    const ctx = useContext(CartContext);

    const onContactSubmit = (data) => {
        setName(data.name);
        setSurname(data.surname);
        setPhone(data.phone);
        setCountry(data.country);
        setCity(data.city);
        setAddress(data.address);
        setStadia(1);
    }

    const onPayloadSubmit = (data) => {
        setCardNumber(data.cardNumber);
        setNameOnTheCard(data.nameOnTheCard);
        setValidityPeriod(data.validityPeriod);
        setCvv(data.cvv);
        setStadia(2);
    }

    const onCheckSubmit = () => {
        setStadia(3);
        ctx.clearCart();
    }

    useEffect(() => {
        request(
            "GET",
            "/api/v1/users/current",
            {},
            {},
            {}
        ).then(response => {
            const user = response.data;
            setUserId(user.id);
            setName(user.name);
            setSurname(user.surname);
            setPhone(user.phone);
            setCountry(user.address.country);
            setCity(user.address.city);
        }).catch(e => {
            setUserId(-1)
        })
    }, []);

    if (userId === null) {
        return <h1 className={styles['create-order__title']}>Loading...</h1>
    }

    return <div className="container">
        {
            stadia === 0 &&
            <ContactDataForm
                name={name}
                surname={surname}
                phone={phone}
                country={country}
                city={city}
                address={address}
                total={ctx.totalAmount}
                onSubmit={onContactSubmit}
            />
        }
        {
            stadia === 1 &&
            <PaymentForm
                total={ctx.totalAmount}
                onSubmit={onPayloadSubmit}
            />
        }
        {
            stadia === 2 &&
            <CheckForm
                ctx={ctx}
                name={name}
                surname={surname}
                phone={phone}
                country={country}
                city={city}
                address={address}
                cardNumber={cardNumber}
                nameOnTheCard={nameOnTheCard}
                validityPeriod={validityPeriod}
                cvv={cvv}
                userId={userId}
                maxAmountPerProduct={props.maxAmountPerProduct}
                onSelectProduct={props.onSelectProduct}
                onSubmit={onCheckSubmit}
            />
        }
        {
            stadia === 3 && <ThankMessage/>
        }
    </div>
}

export default CreateOrder;