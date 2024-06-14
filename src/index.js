import React from 'react';
import ReactDOM from 'react-dom/client';
import './fonts/RostingGapertas/RostingGapertasBold-yYLGd.eot';
import './fonts/RostingGapertas/RostingGapertasBold-yYLGd.woff';
import './fonts/RostingGapertas/RostingGapertasBold-yYLGd.woff2';
import './index.css';
import App from './App';
import CartContextProvider from "./store/CartContextProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartContextProvider>
        <App />
    </CartContextProvider>
);