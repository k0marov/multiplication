import NumbersService, { MultTask } from "./NumbersService";

class NumbersServiceImpl implements NumbersService {
    get maxScore() { return 10; };
    private static maxResult = 9999;

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

    parseAnswer = (answer: string) : number | null => {
        if (answer === "") return null; 
        const parsed = Number.parseInt(answer);
        if (parsed > NumbersServiceImpl.maxResult) return NaN;
        return parsed;
    };
    
}

export default NumbersServiceImpl;