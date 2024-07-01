import styles from "./Customers.module.css"
import {forwardRef, useEffect, useState} from "react";
import {FilterButton} from "../../UI/buttons/admin/FilterButton";
import {request} from "../../../axios_helper";
import PhoneInput from "react-phone-input-2";
import {motion} from "framer-motion";

const ALL = "all";
const REGULAR = "regular";
const NEW = "new";
const CUSTOMER = "customer";
const SURNAME_SORT = "surname";
const NAME_SORT = "name";
const ADDRESS_SORT = "address";
const PHONE_SORT = "phone";

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
    const [customers, setCustomers] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [direction, setDirection] = useState(0);

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

    useEffect(() => {
        setCustomers(props.customers.slice())
        // console.log(customers)
    }, [props.customers]);

    useEffect(() => {
        // console.log(sortBy, direction)
        if (sortBy === ""){
            setCustomers(props.customers.slice());
            return;
        }
        if (direction === 0){
            setCustomers(props.customers.slice());
            return;
        }
        if (direction === -1){
            setCustomers(prevState => prevState.toSorted((a, b) => {
                if (sortBy === ADDRESS_SORT){
                    return `${a[sortBy]['country']}, ${a[sortBy]['city']}`.toLowerCase() > `${b[sortBy]['country']}, ${b[sortBy]['city']}`.toLowerCase() ? -1 : 1;
                }
                return a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? -1 : 1;
            }))
        }
        if (direction === 1){
            setCustomers(prevState => prevState.toSorted((a, b) => {
                if (sortBy === ADDRESS_SORT){
                    return `${a[sortBy]['country']}, ${a[sortBy]['city']}`.toLowerCase() > `${b[sortBy]['country']}, ${b[sortBy]['city']}`.toLowerCase() ? 1 : -1;
                }
                return a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1;
            }))
        }
    }, [sortBy, direction, props.customers]);

    const getPrefix = (field) => {
        if (field !== sortBy) return "-";
        switch (direction) {
            case 1: return "🠟";
            case -1: return "🠝";
            default: return "-"
        }
    }

    return <motion.div
        className={styles.customers}
        variants={customersVariants}
        initial="hidden"
        animate="visible"
    >
        <h1 className={styles["customers__title"]}>Customers</h1>
        <div className={styles["customers__actions"]}>
            <FilterButton onClick={() => props.setPage(ALL)} active={props.page === ALL}>All</FilterButton>
            <FilterButton onClick={() => props.setPage(REGULAR)} active={props.page === REGULAR}>Regular</FilterButton>
            <FilterButton onClick={() => props.setPage(NEW)} active={props.page === NEW}>New</FilterButton>
        </div>
        {
            !props.isLoading &&
            <motion.div variants={tableVariants} className={styles["customers__table"]}>
                <table className={styles["table"]}>
                    <tbody>
                    <tr>
                        <th scope="col" onClick={() => changeSortBy(SURNAME_SORT)}>
                            {getPrefix(SURNAME_SORT)}Surname
                        </th>
                        <th scope="col" onClick={() => changeSortBy(NAME_SORT)}>
                            {getPrefix(NAME_SORT)}Name
                        </th>
                        <th scope="col" onClick={() => changeSortBy(ADDRESS_SORT)}>
                            {getPrefix(ADDRESS_SORT)}Address
                        </th>
                        <th scope="col" onClick={() => changeSortBy(PHONE_SORT)}>
                            {getPrefix(PHONE_SORT)}Phone
                        </th>
                    </tr>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.surname}</td>
                            <td>{customer.name}</td>
                            <td>{`${customer.address.country}, ${customer.address.city}`}</td>
                            <td><PhoneInput
                                value={customer.phone}
                                disabled={true}
                                containerClass={styles['phone__container']}
                                inputClass={styles['phone__input']}
                                specialLabel=""
                            /></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </motion.div>
        }
    </motion.div>
}

export const Customers = forwardRef(
    (props, ref) => {
        const [page, setPage] = useState(props.showCustomer ? CUSTOMER : ALL);
        const [customers, setCustomers] = useState([]);
        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            // console.log("loading")
            setIsLoading(true);
            if (page === ALL || page === REGULAR || page === NEW) {
                request(
                    "GET",
                    "/api/v1/users/customers",
                    {},
                    {},
                    {}
                ).then(response => {
                    const data = response.data;
                    switch (page) {
                        case ALL: {
                            setCustomers(data)
                            break;
                        }
                        case REGULAR: {
                            setCustomers(data.filter(user => user.countOfOrder > 2));
                            break;
                        }
                        case NEW: {
                            setCustomers(data.filter(user => user.countOfOrder === 0));
                            break;
                        }
                    }
                    setIsLoading(false);
                }).catch(error => {
                    setIsLoading(false);
                })
            }
        }, [page]);

        return <div ref={ref}>
            <Table
                customers={customers}
                setPage={setPage}
                isLoading={isLoading}
                page={page}
            />
        </div>
    }
)
