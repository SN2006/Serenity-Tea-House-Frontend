import {useEffect, useState} from "react";
import {request} from "./axios_helper";
import {CUSTOMERS_PAGE, LOGIN_PAGE, MAIN_PAGE, ORDERS_PAGE} from "./utils/Constants";
import AdminLogin from "./components/admin/login/AdminLogin";
import styles from "./App.module.css"
import Main from "./components/Main";
import AdminHome from "./components/admin/home/AdminHome";
import NavbarAdmin from "./components/admin/navbar/NavbarAdmin";
import {Customers} from "./components/admin/customers/Customers";
import {Orders} from "./components/admin/orders/Orders";

const AdminApp = () => {
    const [admin, setAdmin] = useState(null);
    const [activePage, setActivePage] = useState(MAIN_PAGE);
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        request(
            "GET",
            "/api/v1/users/admin",
            {},
            {},
            {}
        ).then(response => {
            setAdmin(response.data);
        }).catch(error => {
            setShowNav(false);
            setActivePage(LOGIN_PAGE);
        })
    }, []);

    const loginHandler = () => {
        request(
            "GET",
            "/api/v1/users/admin",
            {},
            {},
            {}
        ).then(response => {
            setAdmin(response.data);
            setActivePage(MAIN_PAGE);
            setShowNav(false);
        }).catch(error => {
            // console.log(error)
            window.location.href = "/";
        })
    }

    const navClickButtonHandler = (page) => {
        if (page === MAIN_PAGE){
            setShowNav(false);
        }else{
            setShowNav(true);
        }
        setActivePage(page);
    }

    const getContent = (activePage) => {
        switch (activePage) {
            case MAIN_PAGE:
                return <AdminHome onClickNavButton={navClickButtonHandler}/>
            case LOGIN_PAGE:
                return <AdminLogin onSubmit={loginHandler}/>
            case CUSTOMERS_PAGE:
                return <Customers/>
            case ORDERS_PAGE:
                return <Orders/>
            default:
                return <div>{activePage}</div>
        }
    }

    console.log(activePage)
    return <div className={styles.app + " " + styles.admin}>
        <div className={styles.background}></div>
        {showNav && <NavbarAdmin onClickNavButton={navClickButtonHandler} activePage={activePage}/>}
        <div className={styles["wrapper--admin"]}>
            <Main>
                {getContent(activePage)}
            </Main>
        </div>
    </div>
}

export default AdminApp;