import { MultTask } from "../service/NumbersService";

export type MultState = null | LoadedState;

export interface LoadedState {
    score: number, 
    task: MultTask,
    answer: number | null,
}

export default LoadedState;