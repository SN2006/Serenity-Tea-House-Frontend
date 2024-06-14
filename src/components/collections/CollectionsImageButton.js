import styles from "./CollectionsImageButton.module.css"

const CollectionsImageButton = (props) => {

    const buttonClockHandler = () => {
        props.onClick(props.text);
    }

    return (
        <button className={styles.button} onClick={buttonClockHandler} style={
            {
                backgroundImage: `url(${props.src})`
            }
        }>
            <div className={styles['button-text']}>
                {props.text}
            </div>
            {/*<img src={props.src} alt={props.text}/>*/}
        </button>
    )
}

export default CollectionsImageButton;