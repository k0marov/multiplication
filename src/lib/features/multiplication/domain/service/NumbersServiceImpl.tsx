import NumbersService, { Task } from "./NumbersService";

class NumbersServiceImpl implements NumbersService {
    private genRandomNumber = () : number => {
        return Math.floor(Math.random() * 90) + 10 
    }
    generateTask = async () : Promise<Task> => {
        const first = this.genRandomNumber(); 
        const second = this.genRandomNumber();
        return {
            firstNumber: first, 
            secondNumber: second, 
            correctAnswer: first*second, 
        };
    }
}

export default NumbersServiceImpl;