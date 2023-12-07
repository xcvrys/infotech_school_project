import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { getAllVideosPreview, getQuizLeaderboard, getSelectedQuestions, getSelectedVideo, saveQuizScore } from "./db";
import { QUIZ_CORRECT_ANSWER_POINTS } from "./consts";

const app = express()
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());
app.use(express.json());

app.get('/videos', async (req, res) => {
    const allVideoPreviews = await getAllVideosPreview();
    res.status(200).send(allVideoPreviews);
});

app.get('/video', async (req, res) => {
    if (req.query.slug === undefined) { res.status(404).send({}); return }
    const videoSlug = req.query.slug as string;
    const selectedVideoDetails = await getSelectedVideo(videoSlug);
    res.status(200).send(selectedVideoDetails);
});

app.get('/quiz', async (req, res) => {
    if (req.query.slug === undefined) { res.status(404).send({}); return }
    const videoSlug = req.query.slug as string;
    const video = await getSelectedVideo(videoSlug);
    if (video === undefined) { res.status(404).send({}); return; }
    const quizData = await getSelectedQuestions(videoSlug);
    res.status(200).send({ title: video!.title, data: quizData });
});

app.post('/save_score', async (req, res) => {
    if (req.body.slug === undefined) { res.status(404).send({}); return }
    const { slug, correctAnswers, username } = req.body;
    const requestedVideo = await getSelectedVideo(slug);
    if (requestedVideo === null) { res.status(404).send({}); return; }
    await saveQuizScore(slug, username, correctAnswers * QUIZ_CORRECT_ANSWER_POINTS);
    res.status(200).send({});
});

app.get('/scores', async (req, res) => {
    if (req.query.slug === undefined) { res.status(404).send({}); return }
    const videoSlug = req.query.slug as string;
    const requestedVideo = await getSelectedVideo(videoSlug);
    if (requestedVideo === null) { res.status(404).send({}); return; }
    res.status(200).send({ title: requestedVideo.title, scores: await getQuizLeaderboard(videoSlug) });
});

app.listen(8080, () => {
    console.log("--- App listening on port 8080 ---");
});

