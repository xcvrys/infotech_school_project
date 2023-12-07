import React, { useEffect, useState } from "react";
import QuizData from "../types/QuizData";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import style from '../styles/css/Quizz.module.css'

export const Quiz = () => {
    // hooks
    const { videoSlug } = useParams();
    const navigate = useNavigate();

    // game data
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [quizData, setQuizData] = useState<QuizData | undefined>();
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const [finishedPlaying, setFinishedPlaying] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [isScorePosted, setScorePosted] = useState<boolean>(false);
    // get questions from the API
    useEffect(() => {
        axios.get('http://localhost:8080/quiz?slug=' + videoSlug).then(d => setQuizData(d.data)).catch(e => console.log("Connection error " + e.toString()));
    }, [videoSlug]);

    // helper functions to clean up tsx
    const checkQuestion = (questionID: number, answerID: number) => {
        if (quizData!.data.questions[questionID].answers[answerID].correct) {
            setCorrectAnswers(correctAnswers + 1);
        } else {
        }
        if (currentQuestion === quizData!.data.questions.length - 1) {
            setFinishedPlaying(true);
            return;
        }
        setCurrentQuestion(currentQuestion + 1);
    }

    const postScore = () => {
        axios.post("http://localhost:8080/save_score", { slug: videoSlug, username: username, correctAnswers: correctAnswers }).then(() => setScorePosted(true));
    }

    return (
        <div className={style.main}>
            {!isPlaying && (
                <>
                    <div className={style.start}>
                        <p>Sprawdź swoją wiedzę z filmu {quizData !== undefined ? quizData.title : "..."}</p> {/* P AS ANY MAIN TEXT */}
                        <div className={style.btn}>
                            <button onClick={() => setIsPlaying(true)}>START</button> {/* BUTTON AS ANNY INPUT/ OPTION */}
                        </div>
                    </div>
                </>

            )}
            {(isPlaying && quizData !== undefined && !finishedPlaying) && (
                <>
                    <div className={style.start}>
                        <span>question number: {currentQuestion + 1}</span>
                        <p>{quizData!.data.questions[currentQuestion].title}</p>
                        <div className={style.btn}>
                            {quizData.data.questions[currentQuestion].answers.map((v, k) => (
                                <button key={k} onClick={() => checkQuestion(currentQuestion, k)}>{v.title}</button>
                            ))}
                        </div>
                    </div>
                </>
            )}
            {finishedPlaying && (
                <>
                    <div className={style.start}>

                        <span>game over</span>
                        <p>correct answers {correctAnswers}</p>
                        <p>incorrect answers {quizData!.data.questions.length - correctAnswers}</p>
                        <input onInput={e => setUsername(e.currentTarget.value)} placeholder={"your name"} />
                        <div className={style.btn}>
                            {!isScorePosted && (
                                <button onClick={() => postScore()}> Save score</button>
                            )}
                            <button onClick={() => navigate('/')}>go back</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
