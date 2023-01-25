export interface MultTask { 
    firstNumber: number, 
    secondNumber: number, 
    correctAnswer: number,
};

interface NumbersService {
    generateTask() : Promise<MultTask>;
    getMaxResult() : number;
};

export default NumbersService;