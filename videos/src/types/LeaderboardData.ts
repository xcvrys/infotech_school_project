export default interface LeaderboardData {
    title: string
    scores: Score[]
}

interface Score {
    username: string;
    score: number;
}
