export interface Task { 
    firstNumber: number, 
    secondNumber: number, 
    correctAnswer: number,
};

interface NumbersService {
    generateTask() : Promise<Task>;
};

export default NumbersService;