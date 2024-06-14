import styles from "./About.module.css"
import Footer from "../footer/Footer";
import {motion} from "framer-motion";

const verticalAnimation = custom => ({
    hidden: {
        y: 100,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: { delay: custom * 0.5, duration: 1 },
    }
})

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

const About = (props) => {
    return (
        <div className="container">
            <div className={styles['about-container']}>
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{amount: 0.2, once: true}}>
                    <motion.h1 variants={verticalAnimation(1)} className={styles["about__header"]}>Serenity Tea House
                        (STH)
                    </motion.h1>
                    <motion.p variants={verticalAnimation(2)} className={styles["about__info"]}>
                        We value each of our clients, so high quality service is a priority for us.
                        You can always ask any questions you are interested in online or by phone and receive detailed
                        advice.
                        A team of professionals monitors the constant replenishment and updating of the assortment,
                        the development of promotions and a system of favorable discounts, and informing our customers
                        about
                        the availability of new products. Employees undergo thorough training, improve their skills and
                        knowledge,
                        undergo special courses and trainings to keep up with the times.
                    </motion.p>
                    <motion.h2 variants={verticalAnimation(3)} className={styles.h2}>Our Mission</motion.h2>
                    <motion.p variants={verticalAnimation(4)} className={styles['about__mission']}>
                        Our mission is to offer you only the highest quality tea, which not only impresses with
                        its taste and aroma, but also brings health benefits. We believe that each cup of tea is not
                        just a drink, but a real ritual that brings pleasure and harmony.
                    </motion.p>
                </motion.div>
                <motion.div initial="hidden" whileInView="visible" viewport={{amount: 0.2, once: true}}>
                    <motion.h2 variants={verticalAnimation(0)} className={styles.h2}>Why Choose Us?</motion.h2>
                    <ul>
                        <motion.li variants={horizontalAnimation(2)}>
                            High Quality:
                            <p className={styles['about__list-paragraph']}>
                                We carefully select only the best varieties of tea from leading producers.
                                Each of our products undergoes strict quality control.
                            </p>
                        </motion.li>

                        <motion.li variants={horizontalAnimation(3)}>
                            Variety of Assortment:
                            <p className={styles['about__list-paragraph']}>
                                In our catalog you will find tea for every taste -
                                from classic black and green varieties to exotic white, oolong and puerh.
                            </p>
                        </motion.li>

                        <motion.li variants={horizontalAnimation(4)}>
                            Professionalism:
                            <p className={styles['about__list-paragraph']}>
                                Our team consists of experts who are well versed in all the nuances of tea.
                                We are always ready to help you make the right choice.
                            </p>
                        </motion.li>

                        <motion.li variants={horizontalAnimation(5)}>
                            Customer care:
                            <p className={styles['about__list-paragraph']}>
                                We value each of our customers and are always ready to answer your questions and provide
                                advice.
                                Your satisfaction is our priority.
                            </p>
                        </motion.li>

                        <motion.li variants={horizontalAnimation(6)}>
                            Environmental friendliness:
                            <p className={styles['about__list-paragraph']}>
                                We support sustainable production methods and strive to minimize
                                the impact on the environment.
                            </p>
                        </motion.li>

                    </ul>
                </motion.div>
                <Footer/>
            </div>
        </div>
    )
}

export default About;