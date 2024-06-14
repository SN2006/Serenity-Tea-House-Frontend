import {useContext} from "react";
import CartContext from "../../store/cart-context";
import styles from "./Cart.module.css"
import Footer from "../footer/Footer";
import CartItem from "./CartItem";
import TransparentButton from "../UI/buttons/TransparentButton";
import {CART_PAGE, CREATE_ORDER_PAGE} from "../../utils/Constants";

const Cart = (props) => {

    const ctx = useContext(CartContext);

    let content = <p className={styles["cart__empty-msg"]}>the shopping cart is empty, it means  that it's time to buy something</p>

    if (ctx.items.length > 0) {
        content = <div className={styles["cart__items"]}>
            {ctx.items.map((item) =>
                <CartItem
                    key={item.product.id}
                    prevPage={CART_PAGE}
                    onSelectProduct={props.onSelectProduct}
                    item={item}
                    onAdd={ctx.addItem}
                    onRemove={ctx.removeItem}
                    maxAmount={props.maxAmountPerProduct}/>)}
        </div>
    }

    return (
        <div className="container">
            <div className={styles.cart}>
                <h1 className={styles['cart__title']}>Shopping cart</h1>
                {content}
                {
                    ctx.items.length > 0
                    &&
                    <TransparentButton onClick={() => props.onChangePage(CREATE_ORDER_PAGE)}>
                        Make an order
                    </TransparentButton>
                }
                <Footer/>
            </div>
        </div>
    )
}

export default Cart;