import { MultTask } from "../service/NumbersService";

export type MultState = null | LoadedState;

export interface LoadedState {
    task: MultTask,
    answer: number | null,
}

export default LoadedState;