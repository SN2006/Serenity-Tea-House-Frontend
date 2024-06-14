import styles from "./Home.module.css"
import first1 from "../../images/main_page/first1.jfif"
import first2 from "../../images/main_page/first2.jfif"
import first3 from "../../images/main_page/first3.jfif"
import second1 from "../../images/main_page/second1.png"
import second2 from "../../images/main_page/second2.png"
import second3 from "../../images/main_page/second3.png"
import second4 from "../../images/main_page/second4.png"
import third1 from "../../images/main_page/third1.png"
import third2 from "../../images/main_page/third2.png"
import third3 from "../../images/main_page/third3.png"
import third4 from "../../images/main_page/third4.png"
import {QUIZ_PAGE} from "../../utils/Constants";
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

const scaleAnimation = custom => ({
    hidden: {
        opacity: 0,
        scale: 0.1
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { delay: custom * 0.3, duration: 0.8 },
    }
})

const unscaleAnimation = custom => ({
    hidden: {
        opacity: 0,
        scale: 1.3,
        // rotateY: 90,
    },
    visible: {
        scale: 1,
        opacity: 1,
        // rotateY: 0,
        transition: { delay: custom * 0.3, duration: 0.8 },
    }
})

const Home = (props) => {

    const startQuizHandler = () => {
        props.onStartQuiz(QUIZ_PAGE);
    }

    return (
        <div className={styles.home}>
            <motion.section initial="hidden"
                            whileInView="visible"
                            viewport={{amount: 0.3, once: true}}
                            className={styles["home__tagline"]}>
                <div className="container">
                    <div className={styles["tagline__inner"]}>
                        <motion.h2 variants={verticalAnimation(0)} className={styles["tagline__title"]}>a house of the
                            most delicious tea
                        </motion.h2>
                        <div className={styles["tagline__images"]}>
                            <motion.div variants={scaleAnimation(3)} className={styles["tagline__img-box"]}>
                                <img src={first1} alt=""/>
                            </motion.div>
                            <motion.div variants={scaleAnimation(4)} className={styles["tagline__img-box"]}>
                                <img src={first2} alt=""/>
                            </motion.div>
                            <motion.div variants={scaleAnimation(5)} className={styles["tagline__img-box"]}>
                                <img src={first3} alt=""/>
                            </motion.div>
                        </div>
                        <motion.h3 variants={verticalAnimation(4)} className={styles["tagline__subtitle"]}>
                            here you can find a wide selection of teas
                        </motion.h3>
                    </div>
                </div>
            </motion.section>
            <motion.section initial="hidden"
                            whileInView="visible"
                            viewport={{amount: 0.3, once: true}}
                            className={styles["home__image-stand"]}>
                <div className="container">
                    <div className={styles["image-stand__inner"]}>
                        <div className={styles["image-stand__column"]}>
                            <motion.div variants={unscaleAnimation(0)} className={styles["image-stand__img"]}>
                                <img className={styles.big} src={second1} alt="tea"/>
                            </motion.div>
                            <motion.div variants={unscaleAnimation(7)} className={styles["image-stand__img"]}>
                                <img className={styles.small} src={third1} alt="tea"/>
                            </motion.div>
                        </div>
                        <div className={styles["image-stand__column"]}>
                            <motion.div variants={unscaleAnimation(1)} className={styles["image-stand__img"]}>
                                <img className={styles.small} src={second2} alt="tea"/>
                            </motion.div>
                            <motion.div variants={unscaleAnimation(6)} className={styles["image-stand__img"]}>
                                <img className={styles.big} src={third2} alt="tea"/>
                            </motion.div>
                        </div>
                        <div className={styles["image-stand__column"]}>
                            <motion.div variants={unscaleAnimation(2)} className={styles["image-stand__img"]}>
                                <img className={styles.big} src={second3} alt="tea"/>
                            </motion.div>
                            <motion.div variants={unscaleAnimation(5)} className={styles["image-stand__img"]}>
                                <img className={styles.small} src={third3} alt="tea"/>
                            </motion.div>
                        </div>
                        <div className={styles["image-stand__column"]}>
                            <motion.div variants={unscaleAnimation(3)} className={styles["image-stand__img"]}>
                                <img className={styles.small} src={second4} alt="tea"/>
                            </motion.div>
                            <motion.div variants={unscaleAnimation(4)} className={styles["image-stand__img"]}>
                                <img className={styles.big} src={third4} alt="tea"/>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.section>
            <motion.section initial="hidden"
                            whileInView="visible"
                            viewport={{amount: 0.3, once: true}}
                            className={styles['home__quiz']}>
                <div className="container">
                    <div className={styles["home__inner"]}>
                        <motion.h2 variants={verticalAnimation(0)} className={styles['quiz__info']}>
                            Pass our quiz to get a 10% discount on your first order
                        </motion.h2>
                        <motion.div variants={unscaleAnimation(4)}>
                            <motion.button
                                whileHover={{scale: [null, 1.3, 1.1]}}
                                transition={{duration: 0.5}}
                                onClick={startQuizHandler}
                                className={styles["quiz__btn"]}
                            >
                                Quiz
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
            
        </div>
    )
}

export default Home;