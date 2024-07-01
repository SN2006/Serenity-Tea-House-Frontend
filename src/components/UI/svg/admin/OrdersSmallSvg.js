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

const OrdersSmallSvg = (props) => {
    return <motion.svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"
                       style={{transform: `translateX(${props.offsetX ? props.offsetX : 0}px)`}}
                       animate={props.active ? "active" : "visible"}
    >
        <g clip-path="url(#clip0_814_451)">
            <motion.path
                variants={variants} d="M27.2499 39.0198L10.6499 31.9898V13.2998L27.2499 20.1898V39.0198Z" stroke="black"
                  stroke-width="1.47" stroke-miterlimit="10"/>
            <motion.path
                variants={variants} d="M44.1198 32.0598L28.7098 38.9998L28.5298 20.0998L44.0498 13.2998L44.1198 32.0598Z" stroke="black"
                  stroke-width="1.47" stroke-miterlimit="10"/>
            <motion.path
                variants={variants} d="M27.3698 19.02L11.7998 12.23L27.2498 5.97998L42.9498 12.22L27.3698 19.02Z" stroke="black"
                  stroke-width="1.47" stroke-miterlimit="10"/>
            <motion.path
                variants={variants} d="M19.8101 16.5501L35.2701 9.08008" stroke="black" stroke-width="1.96" stroke-miterlimit="10"/>
            <motion.path
                variants={variants}
                d="M12.5699 19.1802H1.47988C1.14851 19.1802 0.879883 19.4488 0.879883 19.7802V19.7902C0.879883 20.1215 1.14851 20.3902 1.47988 20.3902H12.5699C12.9013 20.3902 13.1699 20.1215 13.1699 19.7902V19.7802C13.1699 19.4488 12.9013 19.1802 12.5699 19.1802Z"
                fill="black"/>
            <motion.path
                variants={variants}
                d="M18.2999 23.27H7.20986C6.87849 23.27 6.60986 23.5386 6.60986 23.87V23.88C6.60986 24.2114 6.87849 24.48 7.20986 24.48H18.2999C18.6312 24.48 18.8999 24.2114 18.8999 23.88V23.87C18.8999 23.5386 18.6312 23.27 18.2999 23.27Z"
                fill="black"/>
            <motion.path
                variants={variants}
                d="M14.2999 27.5298H3.20986C2.87849 27.5298 2.60986 27.7984 2.60986 28.1298V28.1398C2.60986 28.4712 2.87849 28.7398 3.20986 28.7398H14.2999C14.6312 28.7398 14.8999 28.4712 14.8999 28.1398V28.1298C14.8999 27.7984 14.6312 27.5298 14.2999 27.5298Z"
                fill="black"/>
        </g>
        <defs>
            <clipPath id="clip0_814_451">
                <rect width="45" height="45" fill="white"/>
            </clipPath>
        </defs>
    </motion.svg>
}

export default OrdersSmallSvg;