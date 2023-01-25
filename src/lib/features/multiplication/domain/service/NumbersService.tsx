export interface MultTask { 
    firstNumber: number, 
    secondNumber: number, 
    correctAnswer: number,
};

interface NumbersService {
    generateTask() : Promise<MultTask>;
};

export default NumbersService;