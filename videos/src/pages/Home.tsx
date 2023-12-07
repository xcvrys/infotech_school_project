import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VideoPreview from "../types/VideoPreview";
import style from '../styles/css/Home.module.css'

export const Home: FC = () => {
    const navigate = useNavigate();

    const [videos, setVideos] = useState<VideoPreview[]>([]);
    const [connectionError, setConnectionError] = useState<Error | null>(null);

    if (connectionError !== null) {
        // terrible hack to get ErrorBoundary to catch errors from promises
        throw connectionError;
    }

    useEffect(() => {
        axios.get("http://localhost:8080/videos").then(res => setVideos(res.data)).catch(e => {
            setConnectionError(e);
        });
    }, []);
    return (
        <>
            <h1 className={style.title}>Movies</h1>
            <div className={style.main}>
                {videos.map((v: VideoPreview) => (
                    <div className={style.card} onClick={() => { navigate('/details/' + v.slug) }}>
                        <img src={v.thumb} alt={v.slug + "_preview"} />
                        <div className={style.details}>
                            <h2>{v.title}</h2>
                            <p>{v.director}</p>
                        </div>
                        <div className={style.rating}>
                            <p>{v.rating}&#47;10</p>
                            <svg width={20} height={20} viewBox="0 0 24 24" >
                                <path d="M6.255 20.452c-.464.237-.99-.18-.896-.71l.996-5.677-4.227-4.027c-.395-.377-.19-1.065.34-1.14l5.877-.835 2.62-5.192a.616.616 0 0 1 1.113 0L14.7 8.063l5.878.835c.529.075.734.763.338 1.14l-4.226 4.027.996 5.676c.093.532-.432.948-.896.71l-5.269-2.707-5.267 2.708h.002Z" />
                            </svg>
                        </div>
                    </div>)
                )}
            </div>
        </>
    )
}
