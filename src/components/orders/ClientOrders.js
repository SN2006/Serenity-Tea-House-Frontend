import styles from "./ClientOrders.module.css"
import Footer from "../footer/Footer";
import {useEffect, useState} from "react";
import {request} from "../../axios_helper";
import {motion} from "framer-motion";
import ClientOrder from "./ClientOrder";
import LeftArrowButton from "../UI/buttons/LeftArrowButton";

const ALL = "all";
const BY_ID = "by_id";

const cardVariants = delay => ({
    hidden: {
        opacity: 0,
        scale: 0.5,
        transition: {duration: 0.15, delay: delay * 0.1},
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {duration: 0.35, delay: delay * 0.1},
    },
})

const arrowVariants = {
    hidden: {
        translateX: "-200%",
        translateY: "-50%",
        opacity: 0
    },
    visible: {
        translateX: "-100%",
        translateY: "-50%",
        opacity: 1
    }
}

const OrderListItem = (props) => {
    const createdAt = new Date(Date.parse(props.order.createdAt));
    return <motion.div
        className={styles['orders__list__item']}
        variants={cardVariants(props.delay)}
        initial="hidden"
        animate="visible"
    >
        <div className={styles['orders__item-col']}>
            <p className={styles['orders__item-description']}>Date:</p>
            <p className={styles['orders__item-value']}>
                {`${createdAt.getFullYear()}.${createdAt.getMonth()}.${createdAt.getDate()}`}
            </p>
        </div>
        <div className={styles['orders__item-col']}>
            <p className={styles['orders__item-description']}>Number:</p>
            <p className={styles['orders__item-value']}>
                {props.order.id}
            </p>
        </div>
        <div className={styles['orders__item-col']}>
            <p className={styles['orders__item-description']}>Price:</p>
            <p className={styles['orders__item-value']}>
                {`${props.order.totalSum}$`}
            </p>
        </div>
        <div className={styles['orders__item-col']}>
            <p className={styles['orders__item-description']}>More information:</p>
            <p className={styles['orders__item-value'] + ' ' + styles['underLine']} onClick={() => {
                props.onOpen(props.order.id);
            }}>
                click here
            </p>
        </div>
</motion.div>
}

const ClientOrders = (props) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(ALL);
    const [currentOrderId, setCurrentOrderId] = useState(-1);

    useEffect(() => {
        if (activePage === ALL){
            setIsLoading(true);
            request(
                "GET",
                "api/v1/orders/by-current-user",
                {},
                {},
                {}
            ).then(response => {
                console.log(response.data);
                setOrders(response.data.toSorted((a, b) => {
                    return a.createdAt > b.createdAt ? -1 : 1;
                }));
                setIsLoading(false);
            }).catch(error => {
                console.log(error);
                setIsLoading(false);
            })
        }
    }, [activePage]);

    const backButtonClickHandler = () => {
        setActivePage(ALL);
        setCurrentOrderId(-1);
    }

    const openOrderButtonClickHandler = (id) => {
        setActivePage(BY_ID);
        setCurrentOrderId(id);
    }

    let content = <div>No content</div>

    switch (activePage){
        case ALL: {
            content = <h2>You haven`t made orders yet :(</h2>;
            if (orders.length > 0) {
                content = <div className={styles['orders__list']}>
                    {orders.map((order, index) => {
                        return <OrderListItem order={order} delay={index} key={order.id} onOpen={openOrderButtonClickHandler}/>
                    })}
                </div>
            }
            break;
        }
        case BY_ID: {
            content = <ClientOrder id={currentOrderId} prev={backButtonClickHandler}/>
        }
    }

    return <div className={styles.orders}>
        <h1 className={styles['orders__title']}>
            {activePage === BY_ID && <motion.div
                className={styles['arrow-btn']}
                variants={arrowVariants}
                initial="hidden"
                animate="visible"
            >
                <LeftArrowButton arrow={"<"} onClick={backButtonClickHandler} size={"64px"}/>
            </motion.div>}
            My orders
        </h1>
        {
            !isLoading && content
        }
        {isLoading && <h2>Loading...</h2>}
        <Footer/>
    </div>
}

export default ClientOrders;