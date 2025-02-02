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

const BillingSmallSvg = (props) => {
    return <motion.svg width="45"
                       height="45"
                       viewBox="0 0 45 45"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg"
                       animate={props.active ? "active" : "visible"}
    >
        <g clip-path="url(#clip0_814_431)">
            <motion.path variants={variants}
                d="M29.6079 17.6602H2.3627C1.4127 17.6602 0.642578 18.4392 0.642578 19.4002V37.0602C0.642578 38.0211 1.4127 38.8002 2.3627 38.8002H29.6079C30.5579 38.8002 31.328 38.0211 31.328 37.0602V19.4002C31.328 18.4392 30.5579 17.6602 29.6079 17.6602Z"
                stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
            <motion.path variants={variants}
                d="M43.4086 18.7998L19.0797 6.37979C18.2295 5.94979 17.2014 6.28979 16.7763 7.14979L11.5962 17.5398H28.5404C28.7579 17.5398 28.9556 17.5698 29.1335 17.6198C30.2309 17.5898 31.3578 18.2798 31.3578 19.7098V36.3198L33.9973 37.6698C34.8475 38.0998 35.8756 37.7598 36.3007 36.8998L44.1698 21.1198C44.5949 20.2598 44.2588 19.2198 43.4086 18.7898V18.7998Z"
                stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
            <motion.path variants={variants}
                         animate={props.active ? {
                             pathLength: 1,
                             opacity: 1,
                             transition: {duration: 1},
                             stroke: ["#000", "#85796D"],
                             fill: ["#000", "#85796D"]
                         } : {
                             pathLength: 1,
                             opacity: 1,
                             transition: {duration: 1},
                             stroke: ["#85796D", "#000"],
                             fill: ["#85796D", "#000"],
                         }}
                d="M16.3707 7.97021L14.7593 11.1402L28.4708 18.2602C28.6982 18.1702 28.9552 18.1202 29.2518 18.1202C30.3788 18.1202 31.051 18.8402 31.2586 19.7002L41.866 25.2002L43.4774 22.0302L16.3707 7.97021Z"
                fill="black"/>
            <motion.path variants={variants}
                         animate={props.active ? {
                             pathLength: 1,
                             opacity: 1,
                             transition: {duration: 1},
                             stroke: ["#000", "#85796D"],
                             fill: ["#000", "#85796D"]
                         } : {
                             pathLength: 1,
                             opacity: 1,
                             transition: {duration: 1},
                             stroke: ["#85796D", "#000"],
                             fill: ["#85796D", "#000"],
                         }}
                         d="M31.1697 21.1602H0.810547V24.7002H31.1697V21.1602Z" fill="black"/>
            <motion.path variants={variants}
                         animate={props.active ? {
                             pathLength: 1,
                             opacity: 1,
                             transition: {duration: 1},
                             stroke: ["#000", "#85796D"],
                             fill: ["#000", "#85796D"]
                         } : {
                             pathLength: 1,
                             opacity: 1,
                             transition: {duration: 1},
                             stroke: ["#85796D", "#000"],
                             fill: ["#85796D", "#000"],
                         }}
                         d="M28.8666 33.2798H20.958V36.0298H28.8666V33.2798Z" fill="black"/>
        </g>
        <defs>
            <clipPath id="clip0_814_431">
                <rect width="45" height="45" fill="white"/>
            </clipPath>
        </defs>
    </motion.svg>
}

export default BillingSmallSvg;