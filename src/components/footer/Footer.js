import styles from "./Footer.module.css"

const Footer = (props) => {
    return (
        <footer>
            <div className={styles['footer-container']}>
                <h3 className={styles['footer__content']}>-Serenity Tea House-</h3>
            </div>
        </footer>
    )
}

export default Footer;