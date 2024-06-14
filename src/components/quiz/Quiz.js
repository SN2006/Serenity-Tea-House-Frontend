import {Fragment, useState} from "react";
import styles from "./Quiz.module.css"
import Footer from "../footer/Footer";
import {MAIN_PAGE} from "../../utils/Constants";

const questions = [{
    question: 'Do black and green tea come from the same plant?',
    ans1: 'No',
    ans2: 'Yes',
    correctAnswer: 'Yes',
    message: 'Black and green tea come from the same bush. The difference between them lies in the manufacturing technology. Green tea is evaporated and oxidized for two days, black tea - from 2 weeks to a month.'
},
    {
        question: 'The most popular tea country is:',
        ans1: 'Turkey',
        ans2: 'China',
        correctAnswer: 'Turkey',
        message: 'Turkey is a leading consumer of tea. Average consumption is 6.87 kg per capita.'
    },
    {
        question: 'Who is the world’s largest tea maker?',
        ans1: 'India',
        ans2: 'China',
        correctAnswer: 'China',
        message: 'China keeps more than a quarter of the world’s tea production. Moreover, it is the only country that produces white and yellow teas.'
    },
    {
        question: 'Do you know when International Tea Day is celebrated?',
        ans1: '15th December',
        ans2: '15th March',
        correctAnswer: '15th December',
        message: 'Black and green tea come from the same bush. The difference between them lies in the manufacturing technology. Green tea is evaporated and oxidized for two days, black tea - from 2 weeks to a month.'
    },
    {
        question: 'Do you like tea?',
        ans1: 'Yes',
        ans2: 'Of course',
        correctAnswer: 'last',
        message: 'last'
    }]

const Question = (props) => {

    const selectAns1Handler = () => {
        props.onChoose(props.question.correctAnswer === props.question.ans1);
    }

    const selectAns2Handler = () => {
        props.onChoose(props.question.correctAnswer === props.question.ans2);
    }

    const classesBtn1 = `${styles['question__btn']} ${props.isFirst && styles['red']}`;
    const classesBtn2 = `${styles['question__btn']} ${props.isFirst && styles['green']}`;

    return <div className="container">
        <div className={styles["question"]}>
            <h2 className={styles["question__title"]}>{props.question.question}</h2>
            <div className={styles["question__actions"]}>
                <button onClick={selectAns1Handler} className={classesBtn1}>{props.question.ans1}</button>
                <button onClick={selectAns2Handler} className={classesBtn2}>{props.question.ans2}</button>
            </div>
            <Footer/>
        </div>
    </div>
}

const Message = (props) => {
    const exitHandler = () => {
        props.onExit(MAIN_PAGE);
    }
    if (props.isEnded) {
        props.onHiddenHeader();
        return <div className={styles.certificate} onClick={exitHandler}>
            <div className={styles['certificate__container']}>
                <h1 className={styles['certificate__header']}>Congratulations!<br/>Here is your discount, take it and
                    let’s shop with us!</h1>
                <p className={styles['certificate__text']}>your discount number:<br/>15052024</p>
            </div>
        </div>
    }
    return (
        <div className="container">
            <div className={styles["message"]}>
                <h2 className={styles["message__title"]}>{props.question.question}</h2>
                <p className={styles["message__text"]}>
                    {props.isCorrect ? "Yeah, you are right!!" : "Nope("}
                </p>
                <p className={styles["message__text"]}>
                    {props.question.message}
                </p>
                <Footer/>
                <button className={styles["message__btn"]} onClick={props.onNext}>
                <span>
                    {">"}
                </span>
                </button>
            </div>
        </div>
    )
}

const Quiz = (props) => {
    const [questionId, setQuestionId] = useState(0);
    const [isQuestion, setIsQuestion] = useState(true);
    const [isEnded, setIsEnded] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const nextQuestionHandler = () => {
        setIsEnded(questions[questionId + 1].message === "last");
        setIsQuestion(true);
        setQuestionId(prevState => prevState + 1);
    }

    const changeQuizState = (isQuestionCorrect) => {
        setIsQuestion(prevState => !prevState);
        setIsCorrect(isQuestionCorrect);
    }
    let content = <div></div>
    if (isQuestion){
         content = <Question question={questions[questionId]} onChoose={changeQuizState} isFirst={questionId === 0}/>
    }else {
        content = <Message question={questions[questionId]}
                           isCorrect={isCorrect}
                           onNext={nextQuestionHandler}
                           isEnded={isEnded}
                           onHiddenHeader={props.onHiddenHeader}
                           onExit={props.onMenuButtonClick}/>
    }

    return <Fragment>
        {content}
    </Fragment>

}

export default Quiz;