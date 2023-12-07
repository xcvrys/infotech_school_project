export default interface QuizData {
    title: string;
    data: {
        for: string;
        questions: Question[]
    }
}

interface Question {
    id: number;
    title: string;
    answers: Answer[];
}

interface Answer {
    id: 0,
    title: string;
    correct: boolean;
}
