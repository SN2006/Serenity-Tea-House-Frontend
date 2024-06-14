import styles from "./Delivary.module.css"
import Footer from "../footer/Footer";
import {motion} from "framer-motion";

const horizontalAnimation = custom => ({
    hidden: {
        x: -100,
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: { delay: custom * 0.4, duration: 1 },
    }
})

const Delivery = (props) => {
    return (
        <div className="container">
            <div className={styles['delivery-container']}>
                <motion.p initial="hidden"
                          whileInView="visible"
                          viewport={{amount: 0.2, once: true}}
                          variants={horizontalAnimation(1)}
                          className={styles['delivery__info']}>
                    We understand how important it is for you to get your favorite tea quickly and
                    without too much trouble. Therefore, we have organized the delivery process in
                    such a way as to ensure maximum comfort and convenience for our customers.
                </motion.p>
                <motion.div initial="hidden"
                            whileInView="visible"
                            viewport={{amount: 0.3, once: true}}
                            className={styles['delivery__section']}>
                    <motion.h2 variants={horizontalAnimation(2)} className={styles.h2}>Terms of Delivery</motion.h2>
                    <motion.p variants={horizontalAnimation(3)} className={styles['delivery__terms-paragraph']}>
                        Fast delivery across Ukraine:
                    </motion.p>
                    <motion.p variants={horizontalAnimation(4)} className={styles['delivery__terms-paragraph']}>
                        Terms: <br/>
                        We guarantee fast processing of orders and delivery throughout the territory of Ukraine
                        in the shortest possible time. Delivery usually takes 1-3 business days.
                    </motion.p>
                    <motion.p variants={horizontalAnimation(5)} className={styles['delivery__terms-paragraph']}>
                        Partners: <br/>
                        We cooperate with leading logistics companies, such as Nova Poshta and Ukrposhta,
                        to ensure reliability and speed of delivery.
                    </motion.p>
                    <motion.p variants={horizontalAnimation(6)} className={styles['delivery__terms-paragraph']}>
                        Free delivery:
                    </motion.p>
                    <motion.p variants={horizontalAnimation(7)} className={styles['delivery__terms-paragraph']}>
                        We offer free delivery for orders over 100$. This is a great opportunity to get your
                        favorite tea at no extra cost.
                    </motion.p>
                    <motion.p variants={horizontalAnimation(8)} className={styles['delivery__terms-paragraph']}>
                        International Delivery:
                    </motion.p>
                    <motion.p variants={horizontalAnimation(9)} className={styles['delivery__terms-paragraph']}>
                        We also deliver to other countries. The terms and cost of international delivery depend on the
                        country of destination.
                        Please contact us for more information.
                    </motion.p>
                </motion.div>
                <motion.div initial="hidden"
                            whileInView="visible"
                            viewport={{amount: 0.3, once: true}}
                            className={styles['delivery__section']}>
                    <motion.h2 variants={horizontalAnimation(1)} className={styles.h2}>
                        Payment methods
                    </motion.h2>
                    <ul>
                        <motion.li variants={horizontalAnimation(3)}>
                            Cash Settlement:
                            <p className={styles['delivery__list-paragraph']}>
                                Payment upon receipt of the order (cash on delivery).
                            </p>
                        </motion.li>
                        <motion.li variants={horizontalAnimation(5)}>
                            Cashless Payment:
                            <p className={styles['delivery__list-paragraph']}>
                                Payment by bank card through a secure payment system on our website.
                            </p>
                        </motion.li>
                        <motion.li variants={horizontalAnimation(7)}>
                            Payment by bank transfer:
                            <p className={styles['delivery__list-paragraph']}>
                                You can pay via Internet banking or at a bank branch.
                            </p>
                        </motion.li>
                    </ul>
                </motion.div>
                <motion.div initial="hidden"
                            whileInView="visible"
                            viewport={{amount: 0.3, once: true}}
                            className={styles['delivery__section']}>
                    <motion.h2 variants={horizontalAnimation(1)} className={styles.h2}>Order Tracking</motion.h2>
                    <motion.p variants={horizontalAnimation(3)}>
                        After sending the order, you will receive a tracking number with which
                        you can monitor the movement of the parcel online.
                    </motion.p>
                </motion.div>
                <motion.div initial="hidden"
                            whileInView="visible"
                            viewport={{amount: 0.3, once: true}}
                            className={styles['delivery__section']}>
                    <motion.h2 variants={horizontalAnimation(1)} className={styles.h2}>Return Policy</motion.h2>
                    <motion.p variants={horizontalAnimation(3)}>
                        If for any reason you are unhappy with your order, we offer a simple and
                        convenient returns process. You can return the product within 14 days of receipt,
                        provided that the packaging is not damaged and the product has not been used.
                    </motion.p>
                </motion.div>
                <motion.div initial="hidden"
                            whileInView="visible"
                            viewport={{amount: 0.3, once: true}}
                            className={styles['delivery__section']}>
                    <motion.h2 variants={horizontalAnimation(1)} className={styles.h2}>Customer support</motion.h2>
                    <motion.p variants={horizontalAnimation(3)}>
                        Our team is always ready to help you with any shipping questions.
                        Contact us by phone: +380-111-22-33 or email: serenity.teahouse@gmail.com
                        and we will be happy to help you.
                    </motion.p>
                    <motion.p variants={horizontalAnimation(5)}>
                        Thank you for choosing us! We strive to make your shopping experience
                        as pleasant and convenient as possible. Enjoy the best tea with us!
                    </motion.p>
                </motion.div>
                <Footer/>
            </div>
        </div>
    )
}

export default Delivery;