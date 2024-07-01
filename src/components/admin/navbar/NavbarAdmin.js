import styles from "./NavbarAdmin.module.css"
import SmallAdminHomeButton from "../../UI/buttons/admin/nav/SmallAdminHomeButton";
import {
    BILLING_PAGE,
    CHATS_PAGE,
    CUSTOMERS_PAGE,
    HOME_PAGE,
    MAIN_PAGE,
    ORDERS_PAGE,
    SETTING_PAGE
} from "../../../utils/Constants";
import {MSmallAdminNavButton, SmallAdminNavButton} from "../../UI/buttons/admin/nav/SmallAdminNavButton";
import {useState} from "react";
import {motion} from "framer-motion";
import home_icon from "../../../images/admin_page/home_icon.svg";
import AdminHomeButton from "../../UI/buttons/admin/nav/AdminHomeButton";
import {MAdminNavButton} from "../../UI/buttons/admin/nav/AdminNavButton";
import customers_icon from "../../../images/admin_page/customers_icon.svg";
import orders_icon from "../../../images/admin_page/orders_icon.svg";
import chats_icon from "../../../images/admin_page/chats_icon.svg";
import billing_icon from "../../../images/admin_page/billing_icon.svg";
import setting_icon from "../../../images/admin_page/setting_icon.svg";
import home_icon_small from "../../../images/admin_page/small/home_icon.svg";
import customers_icon_small from "../../../images/admin_page/small/customers_icon.svg";
import orders_icon_small from "../../../images/admin_page/small/orders_icon.svg";
import chats_icon_small from "../../../images/admin_page/small/chats_icon.svg";
import billing_icon_small from "../../../images/admin_page/small/billing_icon.svg";
import setting_icon_small from "../../../images/admin_page/small/setting_icon.svg";
import {Link} from "react-router-dom";
import UnderlineButton from "../../UI/buttons/UnderlineButton";
import HomeSmallSvg from "../../UI/svg/admin/HomeSmallSvg";
import CustomersSmallSvg from "../../UI/svg/admin/CustomersSmallSvg";
import OrdersSmallSvg from "../../UI/svg/admin/OrdersSmallSvg";
import ChatsSmallSvg from "../../UI/svg/admin/ChatsSmallSvg";
import BillingSmallSvg from "../../UI/svg/admin/BillingSmallSvg";
import SettingsSmallSvg from "../../UI/svg/admin/SettingsSmallSvg";

const headerVariants = {
    hidden: {
        opacity: 0,
        transform: "translateX(-100%)"
    },
    visible: {
        opacity: 1,
        transform: "translateX(0)",
        transition: {duration: 0.5}
    }
}

const navVariants = custom => ({
    hidden: {
        opacity: 0,
        scale: 0.5,
        transition: {duration: 0.1, delay: custom * 0.1}
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {duration: 0.3, delay: custom * 0.1}
    }
})

const navSmallVariants = custom => ({
    hidden: {
        opacity: 0,
        scale: 0.5,
        transition: {duration: 0.1, delay: custom * 0.1},
        background: "transparent"
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {duration: 0.3, delay: custom * 0.1},
        background: "transparent"
    },
    active: {
        opacity: 1,
        scale: 1,
        transition: {duration: 0.5, delay: custom * 0.1},
        background: "white",
        borderRadius: "50%"
    }
})

const NavbarAdmin = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeHandler = () => {
        setIsOpen(false);
    }

    const openHandler = () => {
        setIsOpen(true);
    }

    const navButtonClickHandler = (e, page) => {
        props.onClickNavButton(page);
        e.stopPropagation();
    }

    return <div className={styles.menu}>
        <motion.header
            onClick={openHandler}
            className={styles["header--close"]}
            variants={headerVariants}
            initial={"hidden"}
            whileInView={"visible"}
            viewport={{once: true}}
        >
            <SmallAdminHomeButton onClick={() => props.onClickNavButton(MAIN_PAGE)}/>
            <motion.nav
                className={styles["navbar--close"]}
                initial={"hidden"}
                animate={"visible"}
                viewport={{once: true}}
            >
                <MSmallAdminNavButton onClick={(e) => navButtonClickHandler(e, HOME_PAGE)}
                                      src={home_icon_small} svg={<HomeSmallSvg active={props.activePage === HOME_PAGE}/>}
                                      variants={navSmallVariants(1)}/>
                <MSmallAdminNavButton onClick={(e) => navButtonClickHandler(e, CUSTOMERS_PAGE)}
                                      src={customers_icon_small} svg={<CustomersSmallSvg active={props.activePage === CUSTOMERS_PAGE}/>}
                                      variants={navSmallVariants(2)}/>
                <MSmallAdminNavButton onClick={(e) => navButtonClickHandler(e, ORDERS_PAGE)}
                                      offsetX={-5} src={orders_icon_small} svg={<OrdersSmallSvg offsetX={-5} active={props.activePage === ORDERS_PAGE}/>}
                                      variants={navSmallVariants(3)}/>
                <MSmallAdminNavButton onClick={(e) => navButtonClickHandler(e, CHATS_PAGE)}
                                      src={chats_icon_small} svg={<ChatsSmallSvg active={props.activePage === CHATS_PAGE}/>}
                                      variants={navSmallVariants(4)}/>
                <MSmallAdminNavButton onClick={(e) => navButtonClickHandler(e, BILLING_PAGE)}
                                      src={billing_icon_small} svg={<BillingSmallSvg active={props.activePage === BILLING_PAGE}/>}
                                      variants={navSmallVariants(5)}/>
                <MSmallAdminNavButton onClick={(e) => navButtonClickHandler(e, SETTING_PAGE)}
                                      src={setting_icon_small} svg={<SettingsSmallSvg active={props.activePage === SETTING_PAGE}/>}
                                      variants={navSmallVariants(6)}/>
            </motion.nav>
        </motion.header>
        <motion.header
            onClick={closeHandler}
            className={styles["home__header"]}
            initial={{translateX: "-100%"}}
            animate={isOpen ? {
                translateX: 0
            } : {
                translateX: "-100%"
            }}
            transition={{ease: [0.08, 0.65, 0.53, 0.96], duration: 1}}
        >
            <motion.nav
                className={styles["home__nav"]}
                initial={"hidden"}
                whileInView={"visible"}
            >
                <AdminHomeButton onClick={() => props.onClickNavButton(MAIN_PAGE)}/>
                <MAdminNavButton src={home_icon} animate={isOpen ? navVariants(1).visible : navVariants(6).hidden}
                                 onClick={() => props.onClickNavButton(HOME_PAGE)}
                                 active={props.activePage === HOME_PAGE}
                >Home</MAdminNavButton>
                <MAdminNavButton src={customers_icon} animate={isOpen ? navVariants(2).visible : navVariants(5).hidden}
                                 onClick={() => props.onClickNavButton(CUSTOMERS_PAGE)}
                                 active={props.activePage === CUSTOMERS_PAGE}
                >Customers</MAdminNavButton>
                <MAdminNavButton src={orders_icon} animate={isOpen ? navVariants(3).visible : navVariants(4).hidden}
                                 onClick={() => props.onClickNavButton(ORDERS_PAGE)}
                                 active={props.activePage === ORDERS_PAGE}
                >Orders</MAdminNavButton>
                <MAdminNavButton src={chats_icon} animate={isOpen ? navVariants(4).visible : navVariants(3).hidden}
                                 onClick={() => props.onClickNavButton(CHATS_PAGE)}
                                 active={props.activePage === CHATS_PAGE}
                >Chats</MAdminNavButton>
                <MAdminNavButton src={billing_icon} animate={isOpen ? navVariants(5).visible : navVariants(2).hidden}
                                 onClick={() => props.onClickNavButton(BILLING_PAGE)}
                                 active={props.activePage === BILLING_PAGE}
                >Billing</MAdminNavButton>
                <MAdminNavButton src={setting_icon} animate={isOpen ? navVariants(6).visible : navVariants(1).hidden}
                                 onClick={() => props.onClickNavButton(SETTING_PAGE)}
                                 active={props.activePage === SETTING_PAGE}
                >Settings</MAdminNavButton>
            </motion.nav>
            <div className={styles["home__exit"]}>
                <Link to={"/"} className={"un-link"}><UnderlineButton>Sign out</UnderlineButton></Link>
            </div>
        </motion.header>
        <motion.div
            onClick={closeHandler}
            className={styles.backdrop}
            animate={isOpen ? {zIndex: 20, opacity: 1} : {zIndex: -20, opacity: 0}}
            initial={{zIndex: -20, opacity: 0}}
        ></motion.div>
    </div>
}

export default NavbarAdmin;