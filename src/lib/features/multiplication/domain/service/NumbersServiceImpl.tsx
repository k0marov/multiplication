import NumbersService, { MultTask } from "./NumbersService";

class NumbersServiceImpl implements NumbersService {
    private genRandomNumber = () : number => {
        return Math.floor(Math.random() * 90) + 10 
    }
    generateTask = async () : Promise<MultTask> => {
        const first = this.genRandomNumber(); 
        const second = this.genRandomNumber();
        return {
            firstNumber: first, 
            secondNumber: second, 
            correctAnswer: first*second, 
        };
    }
    getMaxResult = () => 9999;
}

export default NumbersServiceImpl;