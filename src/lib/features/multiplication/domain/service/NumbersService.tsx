export interface MultTask { 
    firstNumber: number, 
    secondNumber: number, 
    correctAnswer: number,
};

abstract class NumbersService {
    abstract generateTask() : Promise<MultTask>;
    // parseAnswer returns 
    //    - null if the answer field should be empty, 
    //    - NaN if the new character is invalid and the answer field should not be updated
    //    - number if the answer is a valid number
    abstract parseAnswer(answer: string): number | null;
    abstract get maxScore() : number;
};

export default NumbersService;