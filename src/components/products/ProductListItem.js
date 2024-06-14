import styles from "./ProductListItem.module.css";
import {motion} from "framer-motion";
import {forwardRef, useContext} from "react";
import {PRODUCTS_LIST_PAGE} from "../../utils/Constants";
import CartIconMin from "../../images/icons/CartIconMin.svg"
import CartContext from "../../store/cart-context";

export const ProductListItem = forwardRef(
    (props, ref) => {
        const src = `http://localhost:8080/products/images/${props.imageId}`;
        const ctx = useContext(CartContext);

        const buttonClickHandler = () => {
            props.onSelect(props.id, PRODUCTS_LIST_PAGE);
        }

        const buttonToCartHandler = (e) => {
            if (ctx.items.filter((item) => item.product.id === props.product.id)
                .map((item) => item.amount)[0] === props.maxAmountPerProduct){
                e.stopPropagation();
                return;
            }
            const item = {
                product: props.product,
                amount: 1
            }
            ctx.addItem(item);
            e.stopPropagation();
        }

        return (
            <button className={styles.item} onClick={buttonClickHandler} ref={ref}>
                <div className={styles['item__img-box']}>
                    <img src={src} alt={props.name}/>
                    <button onClick={buttonToCartHandler} className={styles["item__cart"]}>
                        <img src={CartIconMin} alt={"Add to cart"}/>
                    </button>
                </div>
                <div className={styles['item__content']}>
                    {props.name}
                </div>
            </button>
        )
    })

export const MProductListItem =  motion(ProductListItem)