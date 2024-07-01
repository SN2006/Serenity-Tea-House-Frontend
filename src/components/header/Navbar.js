import NavbarButton from "./NavbarButton";
import styles from "./Navbar.module.css";
import {ABOUT_PAGE, COLLECTION_PAGE, DELIVERY_PAGE} from "../../utils/Constants";

const Navbar = (props) => {
    const collectionsButtonDisabled = props.activePage === COLLECTION_PAGE;
    const aboutButtonDisabled = props.activePage === ABOUT_PAGE;
    const deliveryButtonDisabled = props.activePage === DELIVERY_PAGE;

    const collectionsClickHandler = () => {
        props.onClickNavButton(COLLECTION_PAGE);
    }

    const aboutClickHandler = () => {
        props.onClickNavButton(ABOUT_PAGE);
    }

    const deliveryClickHandler = () => {
        props.onClickNavButton(DELIVERY_PAGE);
    }

    return (
        <nav>
            <div className={styles['nav-container']}>
                <NavbarButton onClick={collectionsClickHandler} text="Collections" disabled={collectionsButtonDisabled} />
                <NavbarButton onClick={aboutClickHandler} text="About us" disabled={aboutButtonDisabled} />
                <NavbarButton onClick={deliveryClickHandler} text="Delivery" disabled={deliveryButtonDisabled} />
            </div>
        </nav>
    );
}

export default Navbar;