import { Bloc } from "../../../../core/utils/bloc/Bloc";
import BlocComponentsFactory from "../../../../core/utils/bloc/BlocComponentsFactory";
import NumbersService, { AnswerStatus } from "../service/NumbersService";
import { MultState } from "./MultState";

export class MultBloc extends Bloc<MultState> {
    constructor(private readonly service: NumbersService) {
        super(null);
        this.restart();
    }
    get wrongAnswerDelaySec() { return 3; }
    get correctAnswerDelaySec() { return  1; } 


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
        const delay = answerStatus === AnswerStatus.correct ? 
              this.correctAnswerDelaySec 
            : this.wrongAnswerDelaySec;
        setTimeout(() => this.loadNextTask(), delay*1000);
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