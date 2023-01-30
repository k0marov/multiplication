import { AnswerStatus, MultTask } from "../service/NumbersService";

export type MultState = null | LoadedState;

export interface LoadedState {
    score: number, 
    task: MultTask,
    answer: number | null,
    answerStatus: AnswerStatus | null,
};

export default LoadedState;