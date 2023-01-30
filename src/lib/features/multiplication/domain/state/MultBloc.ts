import { Bloc } from "../../../../core/utils/bloc/Bloc";
import BlocComponentsFactory from "../../../../core/utils/bloc/BlocComponentsFactory";
import NumbersService, { AnswerStatus } from "../service/NumbersService";
import { MultState } from "./MultState";

const WRONG_ANSWER_DELAY_DURATION = 3000;
const CORRECT_ANSWER_DELAY_DURATION = 1000;

export class MultBloc extends Bloc<MultState> {
    constructor(private readonly service: NumbersService) {
        super(null);
        this.restart();
    }

    changeAnswer = (newAnswer: string) => {
        const current = this.state; 
        if (current == null) return; 
        const parsed = this.service.parseAnswer(newAnswer);
        if (Number.isNaN(parsed)) return; 
        this.emit({
            ...current, 
            answer: parsed,
        });
    }

    submitAnswer = async () => {
        const current = this.state; 
        if (current === null || current.answer === null) return; 
        const answerStatus = this.service.checkAnswer(current.answer, current.task);
        this.emit({
            ...current, 
            score: this.computeNewScore(answerStatus),
            answerStatus: answerStatus,
        });
        const delay = answerStatus === AnswerStatus.correct ? CORRECT_ANSWER_DELAY_DURATION : WRONG_ANSWER_DELAY_DURATION;
        setTimeout(() => this.loadNextTask(), delay);
    }

    getMaxScore = () => this.service.maxScore;
    restart = () => this.loadNextTask(); 

    private loadNextTask = async () => {
        const task = await this.service.generateTask();
        this.emit({
            score: 0, // the initial value
            ...this.state,  
            task: task, 
            answer: null,
            answerStatus: null,
        })
    }

    private computeNewScore = (ans: AnswerStatus) => {
        const currentScore = this.state?.score ?? 0; 
        return ans === AnswerStatus.correct ? currentScore + 1 : currentScore;
    }

}

export const {
    Provider: MultProvider, 
    Builder: MultBuilder, 
    Context: MultContext,
} = BlocComponentsFactory<MultState, MultBloc>();