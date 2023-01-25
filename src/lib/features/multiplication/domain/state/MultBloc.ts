import { Bloc } from "../../../../core/utils/bloc/Bloc";
import BlocComponentsFactory from "../../../../core/utils/bloc/BlocComponentsFactory";
import NumbersService from "../service/NumbersService";
import { MultState } from "./MultState";

export class MultBloc extends Bloc<MultState> {
    constructor(private readonly service: NumbersService) {
        super(null);
        this.loadNextTask();
    }

    changeAnswer = (newAnswer: string) => {
        const current = this.state; 
        if (current == null) return; 
        this.emit({
            ...current, 
            answer: newAnswer,
        })
    }

    submitAnswer = () => {
        const current = this.state; 
        if (current == null) return; 
        if (Number.parseInt(current.answer) === current.task.correctAnswer) {
            console.log("Correct!"); 
        } else {
            console.log("Incorrect!");
        }
        this.loadNextTask();
    }

    private loadNextTask = async () => {
        const task = await this.service.generateTask();
        this.emit({
            ...this.state, 
            task: task, 
            answer: "",
        })
    }

}

export const {
    Provider: MultProvider, 
    Builder: MultBuilder, 
    Context: MultContext,
} = BlocComponentsFactory<MultState, MultBloc>();