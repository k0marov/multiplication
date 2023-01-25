import { Bloc } from "../../../../core/utils/bloc/Bloc";
import BlocComponentsFactory from "../../../../core/utils/bloc/BlocComponentsFactory";
import NumbersService from "../service/NumbersService";
import { AnswerStatus, MultState } from "./MultState";

export class MultBloc extends Bloc<MultState> {
    constructor(private readonly service: NumbersService) {
        super(null);
        this.restart();
    }

    changeAnswer = (newAnswer: string) => {
        const current = this.state; 
        if (current == null) return; 
        const parsed = newAnswer === "" ? null : Number.parseInt(newAnswer);
        if (Number.isNaN(parsed) || (parsed ?? 0) > this.service.getMaxResult()) return; 
        this.emit({
            ...current, 
            answer: parsed,
        });
    }

    submitAnswer = () => {
        const current = this.state; 
        if (current == null) return; 
        this.loadNextTask(current.answer === current.task.correctAnswer ? 
              AnswerStatus.successful 
            : AnswerStatus.wrong
        );
    }

    getMaxScore = () => this.service.getMaxScore();
    restart = () => this.loadNextTask(AnswerStatus.unset); 

    private loadNextTask = async (answerResult: AnswerStatus) => {
        const task = await this.service.generateTask();
        this.emit({
            ...this.state,  
            score: this.computeNewScore(answerResult),
            task: task, 
            previousAnswer: answerResult,
            answer: null,
        })
    }

    private computeNewScore = (ans: AnswerStatus) => {
        const currentScore = this.state?.score ?? 0; 
        return ans === AnswerStatus.successful ? currentScore + 1 : currentScore;
    }

}

export const {
    Provider: MultProvider, 
    Builder: MultBuilder, 
    Context: MultContext,
} = BlocComponentsFactory<MultState, MultBloc>();