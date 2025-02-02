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

const SettingsSmallSvg = (props) => {
    return <motion.svg
        width="47"
        height="47"
        viewBox="0 0 47 47"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={props.active ? "active" : "visible"}
    >
        <g clip-path="url(#clip0_814_447)">
            <motion.path variants={variants}
                d="M42.65 18.4202H38.71C38.45 17.6502 38.12 16.9102 37.75 16.2002L40.62 13.3302C41.92 12.0302 41.92 9.91023 40.62 8.61023L38.3 6.29023C37 4.99023 34.88 4.99023 33.58 6.29023L30.47 9.40023C29.81 9.10023 29.13 8.84023 28.42 8.63023V4.33023C28.42 2.49023 26.92 0.990234 25.08 0.990234H21.81C19.97 0.990234 18.47 2.49023 18.47 4.33023V8.85023C17.85 9.07023 17.24 9.33023 16.66 9.62023L13.38 6.34023C12.08 5.04023 9.96 5.04023 8.66 6.34023L6.34 8.66023C5.04 9.96023 5.04 12.0802 6.34 13.3802L9.61 16.6502C9.31 17.2502 9.05 17.8702 8.84 18.5202H4.34C2.5 18.5202 1 20.0202 1 21.8602V25.1302C1 26.9702 2.5 28.4702 4.34 28.4702H8.99C9.19 29.0202 9.42 29.5502 9.68 30.0602L6.33 33.4102C5.03 34.7102 5.03 36.8302 6.33 38.1302L8.65 40.4502C9.95 41.7502 12.07 41.7502 13.37 40.4502L16.8 37.0202C17.35 37.2902 17.93 37.5302 18.52 37.7302V42.6602C18.52 44.5002 20.02 46.0002 21.86 46.0002H25.13C26.97 46.0002 28.47 44.5002 28.47 42.6602V37.9202C29.09 37.7302 29.7 37.5102 30.28 37.2502L33.47 40.4402C34.77 41.7402 36.89 41.7402 38.19 40.4402L40.51 38.1202C41.81 36.8202 41.81 34.7002 40.51 33.4002L37.65 30.5402C38.03 29.8502 38.36 29.1302 38.63 28.3902H42.66C44.5 28.3902 46 26.8902 46 25.0502V21.7802C46 19.9402 44.5 18.4402 42.66 18.4402L42.65 18.4202ZM23.5 30.4702C19.65 30.4702 16.53 27.3502 16.53 23.5002C16.53 19.6502 19.65 16.5302 23.5 16.5302C27.35 16.5302 30.47 19.6502 30.47 23.5002C30.47 27.3502 27.35 30.4702 23.5 30.4702Z"
                stroke="black" stroke-width="1.99" stroke-miterlimit="10"/>
        </g>
        <defs>
            <clipPath id="clip0_814_447">
                <rect width="46.99" height="46.99" fill="white"/>
            </clipPath>
        </defs>
    </motion.svg>
}

export default SettingsSmallSvg;