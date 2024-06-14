import styles from "./Product.module.css"
import {useContext, useEffect, useState} from "react";
import {request} from "../../../axios_helper";
import logo from "../../../images/icons/Logo1.svg"
import ProductImage from "./ProductImage";
import Main from "../../Main";
import {COLLECTION_PAGE, MAIN_PAGE} from "../../../utils/Constants";
import ArrowButton from "../../UI/buttons/LeftArrowButton";
import IconNavbarButton from "../../header/IconNavbarButton";
import CartContext from "../../../store/cart-context";
import CartIcon from "../../../images/icons/CartIcon.svg";

const Product = (props) => {
    const [product, setProduct] = useState(null);
    const ctx = useContext(CartContext);
    useEffect(() => {
        request(
            "GET",
            `/products/${props.id}`,
            {},
            {}
        ).then((response) => {
            setProduct(response.data);
        }).catch((response) => console.log(response));
    }, [props.id]);

    const onMenuButtonClick = () => {
        props.onMenuButtonClick(MAIN_PAGE);
    }

    const addProductToCartHandler = () => {
        if (ctx.items.filter((item) => item.product.id === product.id)
            .map((item) => item.amount)[0] === props.maxAmountPerProduct){
            return;
        }
        const item = {
            product: product,
            amount: 1
        }
        ctx.addItem(item);
    }

    if (product === null) {
        return <div className="container">
            <nav className={styles["product__header"]}>
                <div className={styles["header__logo"]}>
                    <button onClick={onMenuButtonClick}>
                        <img src={logo} alt="logo"/>
                    </button>
                </div>
                <h1 className={styles['product__title']}>No data!</h1>
                {/*<div>*/}
                {/*    <IconNavbarButton onClick={addProductToCartHandler}/>*/}
                {/*</div>*/}
            </nav>
        </div>
    }

    const exitHandler = () => {
        if (props.prevPage === COLLECTION_PAGE) {
            props.onExitCollection(product.type);
        }else{
            props.onExit(props.prevPage)
        }
    }

    const content = (
        <Main>
            <div className={styles['product__content']}>
                <div className={styles['product__content-images-container']}>
                    <div className={styles['product__arrow']}>
                        <ArrowButton onClick={exitHandler} arrow={"<"}/>
                    </div>
                    <div className={styles['product__content-images']}>
                        {product.imagesIds.map(id => (<ProductImage id={id} key={id}/>))}
                    </div>
                </div>
                <p className={styles['product__price']}>{`Price: ${product.price}$/kg`}</p>
                <p className={styles['product__description']}>{product.description}</p>
            </div>
        </Main>
    )

    return <div className="container">
        <nav className={styles["product__header"]}>
            <div className={styles["header__logo"]}>
                <button onClick={onMenuButtonClick}>
                    <img src={logo} alt="logo"/>
                </button>
            </div>
            <h1 className={styles['product__title']}>{product.name}</h1>
            <div className={styles["cart-btn"]}>
                <IconNavbarButton onClick={addProductToCartHandler} src={CartIcon}/>
            </div>
        </nav>
        {content}
    </div>
}

export default Product;