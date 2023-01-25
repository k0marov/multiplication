import { Bloc } from "../../../../core/utils/bloc/Bloc";
import BlocComponentsFactory from "../../../../core/utils/bloc/BlocComponentsFactory";
import NumbersService from "../service/NumbersService";
import { MultState } from "./MultState";

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
        console.log(current.answer); 
        console.log(current.task.correctAnswer);
        if (current.answer === current.task.correctAnswer) {
            this.loadNextTask(current.score + 1);
        } else {
            this.loadNextTask(current.score);
        }
    }

    restart = async () => {
        this.loadNextTask(0);
    }

    private loadNextTask = async (score: number) => {
        const task = await this.service.generateTask();
        this.emit({
            ...this.state,  
            score: score,
            task: task, 
            answer: null,
        })
    }

}

export const {
    Provider: MultProvider, 
    Builder: MultBuilder, 
    Context: MultContext,
} = BlocComponentsFactory<MultState, MultBloc>();