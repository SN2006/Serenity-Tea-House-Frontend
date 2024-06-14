import styles from "./Collections.module.css"
import blackTeaImage from "../../images/site_image/BlackTeaImage.jpg"
import greenTeaImage from "../../images/site_image/GreenTeaImage.jpg"
import fruitTeaImage from "../../images/site_image/FruitTeaImage.jpg"
import CollectionsImageButton from "./CollectionsImageButton";
import {BLACK_FILTER, FRUIT_FILTER, GREEN_FILTER} from "../../utils/Constants";

const buttonsInfo = [
    {text: BLACK_FILTER, src: blackTeaImage},
    {text: GREEN_FILTER, src: greenTeaImage},
    {text: FRUIT_FILTER, src: fruitTeaImage},
]

const Collections = (props) => {
    return (
        <div >
            <div className={styles['collections-container']}>
                {buttonsInfo.map((button, i) => {
                    return <CollectionsImageButton onClick={props.onSelectGroup} text={button.text} src={button.src} key={i}/>
                })}
            </div>
        </div>
    )
}

export default Collections;