import {useState} from "react";

const useInput = (validateFunction, defaultValue) => {
    const [value, setValue] = useState(defaultValue);
    const [wasInputTouched, setWasInputTouched] = useState(false);

    const isInputValid = validateFunction(value);
    const isInputInvalid = !isInputValid && wasInputTouched;

    const inputChangeHandler = (e) => {
        setValue(e.target.value);
    }

    const inputLostFocusHandler = () => {
        setWasInputTouched(true);
    }

    const resetInputValue = () => {
        setWasInputTouched(false);
        setValue("");
    }

    return {
        value: value,
        hasError: isInputInvalid,
        isValueValid: isInputValid,
        inputChangeHandler,
        inputLostFocusHandler,
        resetInputValue
    }
}

export default useInput;