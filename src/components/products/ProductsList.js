import {request} from "../../axios_helper";
import {useEffect, useState} from "react";
import styles from "./ProductsList.module.css"
import Footer from "../footer/Footer";
import {MProductListItem, ProductListItem} from "./ProductListItem";
import {motion} from "framer-motion";

const animation = custom => ({
    hidden: {
        opacity: 0,
        scale: 0.1
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { delay: custom * 0.3, duration: 0.8 },
    }
})

const ProductsList = (props) => {
    const [data, setData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        request("GET",
            "/products/type",
            {},
            {},
            {filter: props.filter})
            .then((response) => {
                // console.log(response.data);
                setData(response.data);
                setHasError(false);
                setIsLoading(false);
            })
            .catch((error) => {
                setHasError(true);
                if (error.code === "ERR_NETWORK"){
                    setErrorMessage("Failed to connect to server");
                }
                setIsLoading(false);
            });
    }, [props.filter]);

    let items = <h1 className={styles['error-message']}>No data!</h1>;
    if (hasError){
        items = <h1 className={styles['error-message']}>{errorMessage}</h1>;
    }
    if (isLoading){
        items = <h1 className={styles['error-message']}>Loading data...</h1>;
    }
    if (data.length > 0) {
        let counter = 1;
        items = <motion.div initial="hidden"
                            whileInView="visible"
                            viewport={{amount: 0.2, once: true}} className={styles["product-list__list"]}>
            {data.map((product) => {
                return (
                    <MProductListItem
                                      variants={animation(counter++)}
                                      name={product.name}
                                     imageId={product.mainPictureId}
                                     key={product.id}
                                     id={product.id}
                                     maxAmountPerProduct={props.maxAmountPerProduct}
                                     onSelect={props.onSelectProduct}
                                      product={product}
                    />
                )
            })}
        </motion.div>;
    }
    return (
        <div className="container">
            <div className={styles['product-list-container']}>
                <h2 className={styles.title}>{`Collection of ${props.filter} sorts`}</h2>
                {items}
            </div>
            <Footer/>
        </div>
    )
}

export default ProductsList;