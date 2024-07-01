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

const ChatsSmallSvg = (props) => {
    return <motion.svg width="45"
                       height="45"
                       viewBox="0 0 45 45"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg"
                       animate={props.active ? "active" : "visible"}
    >
        <g clip-path="url(#clip0_814_421)">
            <motion.path variants={variants}
                d="M37.6399 8.08984H7.36986C4.74099 8.08984 2.60986 10.221 2.60986 12.8498V32.1398C2.60986 34.7687 4.74099 36.8998 7.36986 36.8998H37.6399C40.2687 36.8998 42.3999 34.7687 42.3999 32.1398V12.8498C42.3999 10.221 40.2687 8.08984 37.6399 8.08984Z"
                stroke="black" stroke-width="3.18" stroke-miterlimit="10"/>
            <motion.path variants={variants} d="M4.21973 9.29004L22.4997 24.19" stroke="black" stroke-width="3.18" stroke-miterlimit="10"/>
            <motion.path variants={variants} d="M21.3799 24.4499L41.2399 8.8999" stroke="black" stroke-width="3.18" stroke-miterlimit="10"/>
        </g>
        <defs>
            <clipPath id="clip0_814_421">
                <rect width="45" height="45" fill="white"/>
            </clipPath>
        </defs>
    </motion.svg>
}

export default ChatsSmallSvg;