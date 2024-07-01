import React from 'react';
import ReactDOM from 'react-dom/client';
import './fonts/RostingGapertas/RostingGapertasBold-yYLGd.eot';
import './fonts/RostingGapertas/RostingGapertasBold-yYLGd.woff';
import './fonts/RostingGapertas/RostingGapertasBold-yYLGd.woff2';
import './index.css';
import CartContextProvider from "./store/CartContextProvider";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </CartContextProvider>
);