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
        try {
            this.emit({
                ...current, 
                answer: newAnswer === "" ? null : Number.parseInt(newAnswer),
            });
        } catch (e) {
            // Ignore the parsing error, thus not updating the answer text field 
        }
    }

    submitAnswer = () => {
        const current = this.state; 
        if (current == null) return; 
        if (current.answer === current.task.correctAnswer) {
            console.log("Correct!"); 
            this.loadNextTask(current.score + 1);
        } else {
            console.log("Incorrect!");
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