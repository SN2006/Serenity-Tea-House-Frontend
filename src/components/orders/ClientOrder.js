import styles from "./ClientOrder.module.css"
import {useEffect, useState} from "react";
import {request} from "../../axios_helper";
import {motion} from "framer-motion";
import LeftArrowButton from "../UI/buttons/LeftArrowButton";

const tableVariants = {
    hidden: {
        translateY: "5rem",
        opacity: 0
    },
    visible: {
        translateY: 0,
        opacity: 1,
        transition: {duration: 0.3},
    }
}

const loadingVariants = {
    hidden: {
        translateY: "1rem",
        opacity: 0
    },
    visible: {
        translateY: 0,
        opacity: 1,
        transition: {duration: 0.1},
    }
}

const ClientOrder = (props) => {
    const [order, setOrder] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        request(
            "GET",
            `/api/v1/orders/${props.id}`,
            {},
            {},
            {}
        ).then(response => {
            console.log(response.data);
            setOrder(response.data);
            setTimeout(() => setIsLoading(false), 200);
        }).catch(error => {
            console.log(error);
            setIsLoading(false);
        })
    }, [props.id]);

    const createdAt = new Date(Date.parse(order.createdAt));

    return <div>
        {!isLoading &&
            <div className={styles["order__inner"]}>
                {/*<div className={styles['arrow-btn']}>*/}
                {/*    <LeftArrowButton arrow={"<"} onClick={props.prev}/>*/}
                {/*</div>*/}
                <motion.div
                    className={styles.order}
                    variants={tableVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <table className={styles.table}>
                        <tbody>
                        <tr>
                            <th>Date</th>
                            <td>{`${createdAt.getFullYear()}.${createdAt.getMonth() + 1}.${createdAt.getDate()}`}</td>
                        </tr>
                        <tr>
                            <th>Number</th>
                            <td>{order.id}</td>
                        </tr>
                        <tr>
                            <th>Total price</th>
                            <td>{order.totalSum}</td>
                        </tr>
                        <tr>
                            <th>Surname</th>
                            <td>{order.user.surname}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{order.user.name}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>{`${order.address.country}: ${order.address.city}, ${order.address.address}`}</td>
                        </tr>
                        <tr>
                            <th>Date of delivery</th>
                            <td>{order.deliveryAt ? order.deliveryAt : "In processing"}</td>
                        </tr>
                        </tbody>
                    </table>
                </motion.div>
            </div>
        }
        {isLoading && <motion.h2
            variants={loadingVariants}
            initial="hidden"
            animate={isLoading ? "visible" : "hidden"}
        >Loading...</motion.h2>}
    </div>
}

export default ClientOrder;