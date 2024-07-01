import styles from "./AdminHome.module.css"
import AdminHomeButton from "../../UI/buttons/admin/nav/AdminHomeButton";
import {AdminNavButton, MAdminNavButton} from "../../UI/buttons/admin/nav/AdminNavButton";
import UnderlineButton from "../../UI/buttons/UnderlineButton";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {
    BILLING_PAGE,
    CHATS_PAGE,
    CUSTOMERS_PAGE,
    HOME_PAGE,
    MAIN_PAGE,
    ORDERS_PAGE,
    SETTING_PAGE
} from "../../../utils/Constants";
import home_icon from "../../../images/admin_page/home_icon.svg"
import chats_icon from "../../../images/admin_page/chats_icon.svg"
import billing_icon from "../../../images/admin_page/billing_icon.svg"
import customers_icon from "../../../images/admin_page/customers_icon.svg"
import setting_icon from "../../../images/admin_page/setting_icon.svg"
import orders_icon from "../../../images/admin_page/orders_icon.svg"

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
        scale: 0.5
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {duration: 0.3, delay: custom * 0.1}
    }
})

const titleVariants = {
    hidden: {
        opacity: 0,
        transform: "translateX(5rem)",
        scale: 0.5
    },
    visible: {
        opacity: 1,
        transform: "translateX(0)",
        transition: {duration: 1},
        scale: 1
    }
}

const AdminHome = (props) => {

    return <div className={styles.home}>
        <motion.header
            className={styles["home__header"]}
            variants={headerVariants}
            initial={"hidden"}
            whileInView={"visible"}
            viewport={{once: true}}
        >
            <motion.nav
                className={styles["home__nav"]}
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{once: true}}
            >
                <AdminHomeButton onClick={() => props.onClickNavButton(MAIN_PAGE)}/>
                <MAdminNavButton src={home_icon} variants={navVariants(1)} onClick={() => props.onClickNavButton(HOME_PAGE)}>Home</MAdminNavButton>
                <MAdminNavButton src={customers_icon} variants={navVariants(2)} onClick={() => props.onClickNavButton(CUSTOMERS_PAGE)}>Customers</MAdminNavButton>
                <MAdminNavButton src={orders_icon} variants={navVariants(3)} onClick={() => props.onClickNavButton(ORDERS_PAGE)}>Orders</MAdminNavButton>
                <MAdminNavButton src={chats_icon} variants={navVariants(4)} onClick={() => props.onClickNavButton(CHATS_PAGE)}>Chats</MAdminNavButton>
                <MAdminNavButton src={billing_icon} variants={navVariants(5)} onClick={() => props.onClickNavButton(BILLING_PAGE)}>Billing</MAdminNavButton>
                <MAdminNavButton src={setting_icon} variants={navVariants(6)} onClick={() => props.onClickNavButton(SETTING_PAGE)}>Settings</MAdminNavButton>
            </motion.nav>
            <div className={styles["home__exit"]}>
                <Link to={"/"} className={"un-link"}><UnderlineButton>Sign out</UnderlineButton></Link>
            </div>
        </motion.header>
        <motion.main className={styles['home__main']}
                     variants={titleVariants}
                     initial={"hidden"}
                     whileInView={"visible"}
        >
            <h1 className={styles['home__title']}>
                Serenity Tea House must be the coziest  place for our
                customers, so don't waste time and come up with the greatest ideas...
            </h1>
        </motion.main>
    </div>
}

export default AdminHome;