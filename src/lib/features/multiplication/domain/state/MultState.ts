import { MultTask } from "../service/NumbersService";

export type MultState = null | LoadedState;

export enum AnswerStatus {
    wrong, 
    successful, 
    unset, 
};

export interface LoadedState {
    score: number, 
    task: MultTask,
    answer: number | null,
    previousAnswer: AnswerStatus,
};

export default LoadedState;