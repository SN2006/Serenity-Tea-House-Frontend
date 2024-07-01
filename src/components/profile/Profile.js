import {Fragment, useEffect, useState} from "react";
import {request, setAuthToken} from "../../axios_helper";
import styles from "./Profile.module.css"
import PhoneInput from "react-phone-input-2";
import EditIcon from "../../images/icons/EditIcon.svg"
import EditUserDataPage from "./EditUserDataPage";
import UnderlineButton from "../UI/buttons/UnderlineButton";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {ORDERS_PAGE} from "../../utils/Constants";

const buttonVariants = {
    simple: {
        scale: 1
    },
    hover: {
        scale: 1.05
    },
    tap: {
        scale: 0.9
    }
}

const ProfileButton = (props) => {
    return <motion.button
        className={styles['profile__btn']}
        onClick={props.onClick}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
    >
        <span>
            {props.children}
        </span>
    </motion.button>
}

const UserDetailsCard = (props) => {
    return <div className={styles.card}>
        <button className={styles["card__btn"]} onClick={props.onEdit}>
            <img src={EditIcon} alt=""/>
            Edit
        </button>
        <h3 className={styles['card__title']}>{props.title}</h3>
        <div className={styles['card__body']}>
            {Object.keys(props.info).map(key => {
                if (key === "phone"){
                    return <p className={styles["card__body-item"]} key={key}>
                        {key}:
                        <PhoneInput
                            value={props.info[key]}
                            disabled={true}
                            containerClass={styles['phone__container']}
                            inputClass={styles['phone__input']}
                            specialLabel=""
                        />
                    </p>
                }
                if (props.showHeaders){
                    return <p key={key} className={styles["card__body-item"]}>{key}: {props.info[key]}</p>
                }
                return <p key={key} className={styles["card__body-item"]}>{props.info[key]}</p>
            })}
        </div>
    </div>
}

const Profile = (props) => {
    const [user, setUser] = useState({});
    const [address, setAddress] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showEditPage, setShowEditPage] = useState(false);

    const onClickEditButtonHandler = () => {
        setShowEditPage(true);
    }

    const openProfilePage = () => {
        setShowEditPage(false);
        getUserData();
    }

    const getUserData = () => {
        setIsLoading(true);
        request(
            "GET",
            "/api/v1/users/current",
            {},
            {},
            {}
        ).then(response => {
            console.log(response.data);
            // console.log(new Date(Date.parse(response.data.createdAt)))
            setUser(response.data);
            setAddress(response.data.address);
            // setTimeout(() => {
            //     setIsLoading(false);
            // }, 200)
            setIsLoading(false);
        }).catch(error => {
            if (error.response.status === 401) {
                props.onUnauthorize();
            }else {
                exitHandler();
            }
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getUserData()
    }, []);

    const exitHandler = () => {
        setAuthToken(null);
        props.onUnauthorize();
    }

    if (isLoading) {
        return <div className={"container"}>
            <h1 className={styles['profile__title']}>Loading...</h1>
        </div>
    }

    if (showEditPage) {
        return <div className="container">
            <EditUserDataPage
                onSubmit={openProfilePage}
                user={user}
            />
        </div>
    }

    return <div className="container">
        <div className={styles.profile}>
            <h1 className={styles['profile__title']}>Hi, {user.name}</h1>
            <section className={styles["profile__section"]}>
                <UserDetailsCard
                    onEdit={onClickEditButtonHandler}
                    key={1}
                    title="My account"
                    showHeaders={false}
                    info={{name: user.name, surname: user.surname, middleName: user.middleName}}
                />
                <UserDetailsCard
                    onEdit={onClickEditButtonHandler}
                    key={2}
                    title="Contacts"
                    showHeaders={true}
                    info={{email: user.email, phone: user.phone}}
                />
                <UserDetailsCard
                    onEdit={onClickEditButtonHandler}
                    key={3}
                    title="Address"
                    showHeaders={false}
                    info={{
                        country: address.country,
                        city: address.city
                    }}
                />
            </section>
            <section className={styles['profile__section']}>
                <ProfileButton onClick={() => props.onChangePage(ORDERS_PAGE)}>My orders</ProfileButton>
            </section>
            <div className={styles.actions}>
                {
                    user.role === "ADMIN"
                    &&
                    <Link to={"/admin"} className={styles["admin-link"]}>admin</Link>
                }
                <UnderlineButton onClick={exitHandler} className={styles["exit-btn"]}>Exit</UnderlineButton>
            </div>
        </div>
    </div>
}

export default Profile;