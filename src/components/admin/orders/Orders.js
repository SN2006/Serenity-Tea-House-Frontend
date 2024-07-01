import styles from "./Orders.module.css"
import {forwardRef, useEffect, useState} from "react";
import {motion} from "framer-motion";
import {FilterButton} from "../../UI/buttons/admin/FilterButton";
import {request} from "../../../axios_helper";

const ALL = "all";
const NEW = "new";
const FINISHED = "finished";
const ORDER = "order";
const SURNAME_SORT = "surname";
const ID_SORT = "id";
const ADDRESS_SORT = "address";
const CREATED_AT_SORT = "createdAt";
const STATUS_SORT = "status";
const IN_PROCESSING = "IN_PROCESSING";
const COMPLETED = "COMPLETED";

const customersVariants = {
    hidden: {
        opacity: 0,
        scale: 0.5,
        translateY: "-5rem",
        transition: {duration: 0.3},
    },
    visible: {
        translateY: "0",
        opacity: 1,
        scale: 1,
        transition: {duration: 0.3},
    }
}

const tableVariants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
        transition: {duration: 0.8},
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {duration: 0.8},
    }
}

const Table = (props) => {
    const [orders, setOrders] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        setOrders(props.orders);
    }, [props.orders]);

    useEffect(() => {
        if (sortBy === ""){
            setOrders(props.orders.slice());
            return;
        }
        if (direction === 0){
            setOrders(props.orders.slice());
            return;
        }
        if (direction === -1){
            setOrders(prevState => prevState.toSorted((a, b) => {
                if (sortBy === ADDRESS_SORT){
                    return `${a[sortBy]['country']}, ${a[sortBy]['city']}`.toLowerCase() > `${b[sortBy]['country']}, ${b[sortBy]['city']}`.toLowerCase() ? -1 : 1;
                }
                if (sortBy === ID_SORT){
                    return a[sortBy] > b[sortBy] ? -1 : 1;
                }
                if (sortBy === SURNAME_SORT){
                    return a.user.surname.toLowerCase() > b.user.surname.toLowerCase() ? -1 : 1;
                }
                return a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? -1 : 1;
            }))
        }
        if (direction === 1){
            setOrders(prevState => prevState.toSorted((a, b) => {
                if (sortBy === ADDRESS_SORT){
                    return `${a[sortBy]['country']}, ${a[sortBy]['city']}`.toLowerCase() > `${b[sortBy]['country']}, ${b[sortBy]['city']}`.toLowerCase() ? 1 : -1;
                }
                if (sortBy === ID_SORT){
                    return a[sortBy] > b[sortBy] ? 1 : -1;
                }
                if (sortBy === SURNAME_SORT){
                    return a.user.surname.toLowerCase() > b.user.surname.toLowerCase() ? 1 : -1;
                }
                return a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1;
            }))
        }
    }, [sortBy, direction, props.orders]);
    
    const changeSortBy = (value) => {
        if (value === sortBy){
            switch (direction){
                case -1: {
                    setDirection(0);
                    break;
                }
                case 0: {
                    setDirection(1);
                    break;
                }
                default: setDirection(-1);
            }
        }else{
            setSortBy(value);
            setDirection(1);
        }
    }

    const getPrefix = (field) => {
        if (field !== sortBy) return "-";
        switch (direction) {
            case 1: return "🠟";
            case -1: return "🠝";
            default: return "-"
        }
    }

    return <motion.div
        className={styles.orders}
        variants={customersVariants}
        initial="hidden"
        animate="visible"
    >
        <h1 className={styles["orders__title"]}>Orders</h1>
        <div className={styles["orders__actions"]}>
            <FilterButton onClick={() => props.setPage(ALL)} active={props.page === ALL}>All</FilterButton>
            <FilterButton onClick={() => props.setPage(NEW)}
                          active={props.page === NEW}>New</FilterButton>
            <FilterButton onClick={() => props.setPage(FINISHED)} active={props.page === FINISHED}>Finished</FilterButton>
        </div>
        {
            !props.isLoading &&
            <motion.div variants={tableVariants} className={styles["orders__table"]}>
                <table className={styles["table"]}>
                    <tbody>
                    <tr>
                        <th scope="col" onClick={() => changeSortBy(ID_SORT)}>
                            {getPrefix(ID_SORT)}Number of order
                        </th>
                        <th scope="col" onClick={() => changeSortBy(SURNAME_SORT)}>
                            {getPrefix(SURNAME_SORT)}Surname
                        </th>
                        <th scope="col" onClick={() => changeSortBy(ADDRESS_SORT)}>
                            {getPrefix(ADDRESS_SORT)}Address
                        </th>
                        <th scope="col" onClick={() => changeSortBy(CREATED_AT_SORT)}>
                            {getPrefix(CREATED_AT_SORT)}Date of order
                        </th>
                        <th scope="col" onClick={() => changeSortBy(STATUS_SORT)}>
                            {getPrefix(STATUS_SORT)}Status
                        </th>
                    </tr>
                    {orders.map((order) => {
                        const createdAt = new Date(Date.parse(order.createdAt));
                        return <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user.surname}</td>
                            <td>{`${order.address.country}, ${order.address.city}`}</td>
                            {/*<td>{order.createdAt.split(".")[0].replace("T", " at ")}</td>*/}
                            <td>{`${createdAt.getFullYear()}-${createdAt.getMonth()}-${createdAt.getDate()} 
                            at 
                            ${createdAt.getHours()}:${createdAt.getMinutes()}`}</td>
                            <td>{order.status}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </motion.div>
        }
    </motion.div>
}

export const Orders = forwardRef(
    (props, ref) => {
        const [page, setPage] = useState(props.showOrder ? ORDER : ALL);
        const [isLoading, setIsLoading] = useState(false);
        const [orders, setOrders] = useState([]);

        const getAll = () => {
            request(
                "GET",
                "/api/v1/orders",
                {},
                {},
                {}
            ).then(response => {
                setOrders(response.data);
                console.log(response.data)
                setIsLoading(false)
            }).catch(error => {
                console.log(error);
                setIsLoading(false)
            })
        }

        const getByStatus = (status) => {
            request(
                "GET",
                `/api/v1/orders/by-status?status=${status}`,
                {},
                {},
                {}
            ).then(response => {
                setOrders(response.data);
                setIsLoading(false)
            }).catch(error => {
                console.log(error);
                setIsLoading(false)
            })
        }

        useEffect(() => {
            setIsLoading(true);
            switch (page){
                case NEW:{
                    getByStatus(IN_PROCESSING);
                    break;
                }
                case FINISHED: {
                    getByStatus(COMPLETED);
                    break;
                }
                default: {
                    getAll();
                    break;
                }
            }
        }, [page]);

        return <div ref={ref}>
            <Table
                orders={orders}
                setPage={setPage}
                isLoading={isLoading}
                page={page}
            />
        </div>
    }
)