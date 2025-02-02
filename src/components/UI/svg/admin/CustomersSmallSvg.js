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

const CustomersSmallSvg = (props) => {
    return <motion.svg
        width="45"
        height="45"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={props.active ? "active" : "visible"}
    >
        <g clip-path="url(#clip0_814_416)">
            <motion.path
                variants={variants}
                d="M22.4999 22.5C12.6299 22.5 4.62988 30.5 4.62988 40.37C4.62988 40.82 4.64988 41.26 4.67988 41.7H40.3099C40.3399 41.26 40.3599 40.82 40.3599 40.37C40.3599 30.5 32.3599 22.5 22.4899 22.5H22.4999Z"
                stroke="black" stroke-width="2.71" stroke-miterlimit="10"/>
            <motion.path
                variants={variants}
                d="M22.4999 22.4999C27.9179 22.4999 32.3099 18.1078 32.3099 12.6899C32.3099 7.27197 27.9179 2.87988 22.4999 2.87988C17.082 2.87988 12.6899 7.27197 12.6899 12.6899C12.6899 18.1078 17.082 22.4999 22.4999 22.4999Z"
                stroke="black" stroke-width="2.71" stroke-miterlimit="10"/>
        </g>
        <defs>
            <clipPath id="clip0_814_416">
                <rect width="45" height="45" fill="white"/>
            </clipPath>
        </defs>
    </motion.svg>
}

export default CustomersSmallSvg;