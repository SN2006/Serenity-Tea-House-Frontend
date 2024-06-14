import {useContext, useEffect, useState} from "react";
import styles from "./App.module.css"
import Header from "./components/header/Header";
import {
    ABOUT_PAGE, AUTHORIZE_PAGE,
    BLACK_FILTER,
    CART_PAGE,
    COLLECTION_PAGE, CREATE_ORDER_PAGE,
    DELIVERY_PAGE,
    MAIN_PAGE, PRODUCT_PAGE,
    PRODUCTS_LIST_PAGE, PROFILE_PAGE, QUIZ_PAGE
} from "./utils/Constants";
import Main from "./components/Main";
import About from "./components/about/About";
import Delivery from "./components/delivary/Delivery";
import Collections from "./components/collections/Collections";
import ProductsList from "./components/products/ProductsList";
import Product from "./components/products/product/Product";
import Cart from "./components/cart/Cart";
import CartContext from "./store/cart-context";
import Home from "./components/home/Home";
import Quiz from "./components/quiz/Quiz";
import AuthorizeForm from "./components/authorize/AuthorizeForm";
import Profile from "./components/profile/Profile";
import CreateOrder from "./components/order/CreateOrder";

function App() {
    const [activePage, setActivePage] = useState(MAIN_PAGE);
    const [filter, setFilter] = useState(BLACK_FILTER);
    const [productInfo, setProductInfo] = useState({});
    const [isShowHeader, setShowHeader] = useState(true);
    const [maxAmountPerProduct, setMaxAmountPerProduct] = useState(5);
    const ctx = useContext(CartContext);

    useEffect(() => {
        ctx.loadCart();
    }, []);

    const clickNavButtonHandler = (page) => {
        setShowHeader(true);
        setActivePage(page);
    }

    const hiddenHeaderHandler = () => {
        setShowHeader(false);
    }

    const onChangeFilter = (filter) => {
        setShowHeader(true);
        setFilter(filter);
        setActivePage(PRODUCTS_LIST_PAGE);
    }

    const selectProductHandler = (productId, prevPage) => {
        setShowHeader(false);
        // setProductId(productId);
        setProductInfo({id: productId, prevPage: prevPage});
        setActivePage(PRODUCT_PAGE);
        console.log(productId);
    }

    const onUnauthorizedHandler = () => {
        setShowHeader(true);
        setActivePage(AUTHORIZE_PAGE);
    }

    const succeededAuthorizationHandler = () => {
        setShowHeader(true);
        setActivePage(PROFILE_PAGE);
    }

    const getContent = (activePage, action) => {
        if (activePage === ABOUT_PAGE) {
            return <About/>
        }
        if (activePage === DELIVERY_PAGE) {
            return <Delivery/>
        }
        if (activePage === COLLECTION_PAGE) {
            return <Collections onSelectGroup={onChangeFilter}/>
        }
        if (activePage === PRODUCTS_LIST_PAGE) {
            return <ProductsList onSelectProduct={selectProductHandler}
                                 maxAmountPerProduct={maxAmountPerProduct}
                                 filter={action.filter}/>
        }
        if (activePage === PRODUCT_PAGE) {
            return <Product id={productInfo.id}
                            prevPage={productInfo.prevPage}
                            onExit={clickNavButtonHandler}
                            onExitCollection={onChangeFilter}
                            onMenuButtonClick={clickNavButtonHandler}
                            maxAmountPerProduct={maxAmountPerProduct}/>
        }
        if (activePage === CART_PAGE) {
            return <Cart
                onSelectProduct={selectProductHandler}
                maxAmountPerProduct={maxAmountPerProduct}
                onChangePage={clickNavButtonHandler}
            />
        }
        if (activePage === MAIN_PAGE){
            return <Home onStartQuiz={clickNavButtonHandler}/>
        }
        if (activePage === AUTHORIZE_PAGE){
            return <AuthorizeForm onAuthorization={succeededAuthorizationHandler}/>
        }
        if (activePage === PROFILE_PAGE){
            return <Profile onUnauthorize={onUnauthorizedHandler}/>
        }
        if (activePage === QUIZ_PAGE){
            return <Quiz
                onHiddenHeader={hiddenHeaderHandler}
                onMenuButtonClick={clickNavButtonHandler}/>
        }
        if (activePage === CREATE_ORDER_PAGE){
            return <CreateOrder
                maxAmountPerProduct={maxAmountPerProduct}
                onSelectProduct={selectProductHandler}
            />
        }
        return <div></div>
    }

    const openCartHandler = () => {
        setActivePage(CART_PAGE);
    }

    return (
        <div className={styles.app}>
            <div className={styles.wrapper}>
                {isShowHeader && <Header activePage={activePage}
                                                        onOpenCart={openCartHandler}
                                                        onClickNavButton={clickNavButtonHandler}/>}
                <Main>
                    {getContent(activePage, {filter: filter})}
                </Main>
            </div>
        </div>
    );
}

export default App;
