import styles from "./CartItem.module.css"
import {Fragment, useState} from "react";
import Modal from "../UI/Modal";
import DeleteItemModal from "./modals/DeleteItemModal";
import MaxCountItemModal from "./modals/MaxCountItemModal";

const CartItem = (props) => {
    const src = `http://localhost:8080/products/images/${props.item.product.mainPictureId}`;
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalMaxCount, setShowModalMaxCount] = useState(false);

    const productClickHandler = () => {
        props.onSelectProduct(props.item.product.id, props.prevPage);
    }

    const addButtonHandler = (event) => {
        if (props.item.amount === props.maxAmount){
            setShowModalMaxCount(true);
            event.stopPropagation();
            return;
        }
        props.onAdd({product: props.item.product, amount: 1});
        event.stopPropagation();
    }

    const removeButtonHandler = (event) => {
        if (props.item.amount === 1){
            setShowModalDelete(true);
            event.stopPropagation();
            return;
        }
        props.onRemove(props.item.product.id);
        event.stopPropagation();
    }

    const onChooseDeleteHandler = (isAgree) => {
        if (isAgree){
            props.onRemove(props.item.product.id);
        }
        setShowModalDelete(false);
    }

    const onChooseCloseHandler = () => {
        setShowModalMaxCount(false);
    }

    return (
        <Fragment>
            <button className={styles['item-btn']} onClick={productClickHandler}>
                <div className={styles['item']}>
                    <div className={styles['item__img-box']}>
                        <img src={src} alt="product image"/>
                    </div>
                    <div className={styles['item__info']}>
                        <h3 className={styles['item__title']}>{props.item.product.name}</h3>
                        <p className={styles['item__price']}>{`price: ${props.item.product.price}$/kg`}</p>
                    </div>
                    <div className={styles['item__amount']}>
                        <button className={styles['amount-btn']} onClick={removeButtonHandler}>
                            <span>-</span>
                        </button>
                        <p className={styles['amount__info']}>{props.item.amount}</p>
                        <button className={styles['amount-btn']} onClick={addButtonHandler}>
                            <span>+</span>
                        </button>
                    </div>
                </div>
            </button>
            {showModalDelete && <Modal>
                <DeleteItemModal
                    onChoose={onChooseDeleteHandler}
                />
            </Modal>}
            {showModalMaxCount && <Modal>
                <MaxCountItemModal
                    onChoose={onChooseCloseHandler}
                />
            </Modal>}
        </Fragment>
    )
}

export default CartItem;