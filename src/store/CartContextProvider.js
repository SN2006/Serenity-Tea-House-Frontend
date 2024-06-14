import {useReducer} from "react";
import CartContext from "./cart-context";
import {CART_STORAGE} from "../utils/Constants";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    // console.log(action.type);
    if (action.type === "ADD_NEW_ITEM") {
        const updatedTotalAmount =
            (state.totalAmount + action.item.amount * action.item.product.price);
        let isAdded = false;
        const updatedItems = state.items.map((item) => {
            if (item.product.id === action.item.product.id){
                item.amount += action.item.amount;
                isAdded = true;
            }
            return item;
        });
        if (!isAdded) {
            updatedItems.unshift(action.item);
        }
        const updatedState = {
            items: updatedItems,
            totalAmount: Math.round(updatedTotalAmount * 100) / 100
        };
        localStorage.setItem(CART_STORAGE, JSON.stringify(updatedState));
        return updatedState;
    }
    if (action.type === "REMOVE_ITEM_BY_ID"){
        let updatedTotalAmount = state.totalAmount;
        const updatedItems = [];
        state.items.map((item) => {
            if (item.product.id === action.id){
                updatedTotalAmount -= item.product.price;
                item.amount -= 1;
            }
            if (item.amount > 0){
                updatedItems.push(item);
            }
        });
        // console.log(updatedItems);
        // console.log(updatedTotalAmount);
        const  updatedState = {
            items: updatedItems,
            totalAmount: Math.round(updatedTotalAmount * 100) / 100
        };
        localStorage.setItem(CART_STORAGE, JSON.stringify(updatedState));
        return updatedState;
    }
    if (action.type === "CLEAR_ITEMS"){
        localStorage.removeItem(CART_STORAGE);
        return defaultCartState;
    }
    if (action.type === "LOAD_CART"){
        const stateFromStorage = localStorage.getItem(CART_STORAGE);
        // console.log(stateFromStorage)
        if (stateFromStorage) {
            return JSON.parse(stateFromStorage);
        }
        return defaultCartState;
    }
}

const CartContextProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = (item) => {
        dispatchCartAction({
            type: "ADD_NEW_ITEM",
            item: item
        });
    }

    const removeItemHandler = (id) => {
        dispatchCartAction({
            type: "REMOVE_ITEM_BY_ID",
            id: id
        });
    }

    const clearItemsHandler = () => {
        dispatchCartAction({
            type: "CLEAR_ITEMS",
        });
    }

    const loadCartHandler = () => {
        // console.log("heh");
        dispatchCartAction({
            type: "LOAD_CART",
        });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearItemsHandler,
        loadCart: loadCartHandler,
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartContextProvider;