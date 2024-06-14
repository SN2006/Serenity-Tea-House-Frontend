import logo1 from "../../images/icons/Logo1.svg";
import logo2 from "../../images/icons/Logo2.svg";
import styles from "./Header.module.css";
import Navbar from "./Navbar";
import CartIcon from "../../images/icons/CartIcon.svg";
import ProfileIcon from "../../images/icons/ProfileIcon.svg";
import IconNavbarButton from "./IconNavbarButton";
import {
    ABOUT_PAGE,
    CART_PAGE,
    CREATE_ORDER_PAGE,
    DELIVERY_PAGE,
    MAIN_PAGE,
    PROFILE_PAGE,
    QUIZ_PAGE
} from "../../utils/Constants";

const getLogo = (currentPage) => {
    const logos = [ABOUT_PAGE, MAIN_PAGE, DELIVERY_PAGE, QUIZ_PAGE, CART_PAGE, PROFILE_PAGE, CREATE_ORDER_PAGE]
    if (logos.includes(currentPage)) {
        return logo2;
    }
    return logo1;
}

const Header = (props) => {
    let logoImg = getLogo(props.activePage);

    const logoClickHandle = () => {
        props.onClickNavButton(MAIN_PAGE);
    }

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles['header-container']}>
                    <div className={styles['logo-box']}>
                        <button onClick={logoClickHandle} className={styles['logo-btn']}>
                            <img alt="logo" src={logoImg}/>
                        </button>
                    </div>
                    <div className={styles["header-buttons"]}>
                        <Navbar onClickNavButton={props.onClickNavButton} activePage={props.activePage}/>
                        <div className={styles["header__icon-btn"]}>
                            <IconNavbarButton onClick={props.onOpenCart} src={CartIcon}/>
                            <IconNavbarButton onClick={() => props.onClickNavButton(PROFILE_PAGE)} src={ProfileIcon}/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;