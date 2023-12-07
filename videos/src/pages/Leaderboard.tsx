import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeaderboardData from "../types/LeaderboardData";
import axios from "axios";
import style from '../styles/css/Leaderboard.module.css'


export const Leaderboard = () => {
    const navigate = useNavigate();
    const { videoSlug } = useParams();

    const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | undefined>();
    const [connectionError, setConnectionError] = useState<Error | null>(null);

    if (connectionError !== null) {
        // terrible hack to get ErrorBoundary to catch errors from promises
        throw connectionError;
    }

    useEffect(() => {
        axios.get('http://localhost:8080/scores?slug=' + videoSlug).then(d => setLeaderboardData(d.data)).catch(e => setConnectionError(e));
    }, []);

    const renderRowID = (rowID: number) => {
        switch (rowID) {
            case 0:
                return (<th className={style.first}>1</th>)
            case leaderboardData!.scores.length - 1:
                return (<th className={style.last}>{leaderboardData!.scores.length}</th>)
            default:
                return (<th className={style.colorS}>{rowID + 1}</th>)
        }
    }
    return (
        <>
            <div className={style.main}>
                <div className={style.header}>
                    <svg width="46" height="46" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.947 3a.6.6 0 0 1 .6-.6h12a.6.6 0 0 1 .6.6c0 .646-.014 1.26-.04 1.844a3.6 3.6 0 1 1-1.36 7.068c-.948 2.238-2.254 3.332-3.4 3.613v2.607l1.71.428c.233.057.453.162.645.306l2.205 1.654a.6.6 0 0 1-.36 1.08h-12a.6.6 0 0 1-.36-1.08l2.206-1.654c.192-.145.412-.249.644-.306l1.71-.428v-2.607c-1.146-.281-2.451-1.375-3.4-3.615A3.6 3.6 0 1 1 4.99 4.842 39.7 39.7 0 0 1 4.947 3Zm.12 3.048a2.4 2.4 0 1 0 .863 4.722c-.4-1.26-.705-2.815-.864-4.722Zm12.099 4.722a2.4 2.4 0 1 0 .864-4.722c-.16 1.908-.466 3.462-.864 4.722Z"></path>
                    </svg>
                    <h1><span>{leaderboardData?.title}</span> quiz leaderboard</h1>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th className={style.colorH} >Name</th>
                            <th className={style.colorH} >Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData !== undefined && leaderboardData.scores.map((s, k) => (
                            <tr key={k}>
                                {renderRowID(k)}
                                <td>{s.username}</td>
                                <td>{s.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={() => navigate('/')}>go back</button>
        </>

    )
}
