import styles from "./ChatInput.module.css"

const ChatInput = (props) => {
    return <div className={styles['input__container']}>
        <input
            className={styles['input'] + " " + styles[props.bgcolor]}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
        />
        <div className={styles['actions']}>
            <button className={styles['button']}>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_921_1556)">
                        <path
                            d="M22.0306 0.771484H2.96971C1.75566 0.771484 0.771484 1.75566 0.771484 2.96971V22.0306C0.771484 23.2447 1.75566 24.2289 2.96971 24.2289H22.0306C23.2447 24.2289 24.2289 23.2447 24.2289 22.0306V2.96971C24.2289 1.75566 23.2447 0.771484 22.0306 0.771484Z"
                            stroke="#6D6D6D" stroke-width="1.6" stroke-miterlimit="10"/>
                        <path
                            d="M0.771484 19.1667C0.771484 19.1667 5.02332 14.8378 6.06458 14.7607C7.10585 14.6835 12.0904 19.6295 16.4097 24.2285"
                            stroke="#6D6D6D" stroke-width="1.6" stroke-miterlimit="10"/>
                        <path
                            d="M10.6925 18.1063C10.1236 18.6655 17.0076 10.5765 18.8683 10.4897C19.7361 10.4511 22.4356 13.0446 24.2386 15.05"
                            stroke="#6D6D6D" stroke-width="1.6" stroke-miterlimit="10"/>
                        <path
                            d="M10.9716 9.54482C11.978 9.54482 12.7938 8.72899 12.7938 7.7226C12.7938 6.71622 11.978 5.90039 10.9716 5.90039C9.96525 5.90039 9.14941 6.71622 9.14941 7.7226C9.14941 8.72899 9.96525 9.54482 10.9716 9.54482Z"
                            stroke="#6D6D6D" stroke-width="1.36" stroke-miterlimit="10"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_921_1556">
                            <rect width="25" height="25" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </button>
            <button className={styles['button']} disabled={props.value.trim() === ""} onClick={props.onSend}>
                <svg fill={props.stroke} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                     viewBox="-51.2 -51.2 614.40 614.40"
                     width="30px" height="30px" stroke="#000000" stroke-width="3"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC"
                       stroke-width="1.024"></g>
                    <g id="SVGRepo_iconCarrier"> <g> <g> <g> <path
                        d="M0,234.919l174.682,102.399l102.399,174.682L512,0.001L0,234.919z M275.387,478.16l-85.176-145.304l52.097-52.097 l-11.068-11.068l-52.098,52.098L33.84,236.612L459.726,41.206L293.249,207.681l11.068,11.068L470.795,52.275L275.387,478.16z"></path>
                        <rect x="257.132" y="223.121"
                              transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 277.6292 609.0733)" width="15.652"
                              height="47.834"></rect> </g> </g> </g> </g>
                </svg>
            </button>
        </div>
    </div>
}

export default ChatInput;