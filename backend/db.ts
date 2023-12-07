import mongoose from "mongoose";
import { Quiz, Score, Video } from "./models";

mongoose.connect("mongodb://admin:admin@mongodb:27017/videosAppData?authSource=admin&authMechanism=DEFAULT").then(() => { });

export const getAllVideosPreview = async () => {
    return Video.find({}, { slug: 1, title: 1, thumb: 1, director: 1, rating: 1 });
}

export const getSelectedVideo = async (slug: string) => {
    return Video.findOne({ slug: slug }, { _id: 0 });
}

export const getSelectedQuestions = async (slug: string) => {
    return Quiz.findOne({ for: slug }, { _id: 0, "questions._id": 0, "questions.answers._id": 0 });
}

export const saveQuizScore = async (slug: string, username: string, score: number) => {
    const quizScore = new Score({
        slug: slug,
        username: username,
        score: score
    });
    await quizScore.save();
}

export const getQuizLeaderboard = async (slug: string) => {
    return Score.find({ slug: slug }, { _id: 0, __v: 0, slug: 0 }).sort([["score", -1]]);
}
