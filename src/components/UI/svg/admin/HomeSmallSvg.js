import {motion} from "framer-motion";

const variants = {
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: {duration: 1},
        stroke: ["#85796D", "#000"]
    },
    active: {
        pathLength: 1,
        opacity: 1,
        transition: {duration: 1},
        stroke: ["#000", "#85796D"]
    }
}

const HomeSmallSvg = (props) => {
    return <motion.svg width="45"
                       height="45"
                       viewBox="0 0 45 45"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg"
                       // initial="visible"
                       animate={props.active ? "active" : "visible"}
    >
        <g clip-path="url(#clip0_814_428)">
            <motion.path
                variants={variants}
                d="M8.02024 26.5002V39.0602C8.02024 39.3802 8.29024 39.6402 8.61024 39.6402H17.7602C18.0802 39.6402 18.3402 39.3802 18.3402 39.0602L18.4602 26.9102C18.4602 26.5902 18.7302 26.3302 19.0502 26.3302L25.8102 26.3902C26.1302 26.3902 26.3902 26.6502 26.3902 26.9702V39.0502C26.3902 39.3702 26.6502 39.6302 26.9702 39.6302H36.3102C36.6302 39.6302 36.9002 39.3702 36.8902 39.0402L36.8302 26.1302H42.0002C42.5102 26.1302 42.7802 25.5202 42.4602 25.1802L31.4102 13.4402L31.3702 6.6102C31.3702 6.2802 31.1002 6.0202 30.7702 6.0302L29.0802 6.0702C28.7602 6.0702 28.5102 6.3402 28.5102 6.6502V10.8202L22.6802 5.5002C22.4502 5.2802 22.0902 5.2802 21.8602 5.5102L2.55024 25.0202C2.19024 25.3902 2.44024 26.0102 2.96024 26.0202L8.02024 26.1102V26.5102V26.5002Z"
                stroke="black" stroke-width="3.1" stroke-miterlimit="10"/>
        </g>
        <defs>
            <clipPath id="clip0_814_428">
                <rect width="45" height="45" fill="white"/>
            </clipPath>
        </defs>
    </motion.svg>
}

export default HomeSmallSvg;