import "./MultScreen.css";
import LoadedState from "../../../domain/state/MultState";
import { FormEvent, useContext } from "react";
import { MultContext } from "../../../domain/state/MultBloc";
import { blob } from "node:stream/consumers";
import { AnswerStatus } from "../../../domain/service/NumbersService";

export interface MultScreenProps {
    state: LoadedState,
};

export function MultScreen({state} : MultScreenProps) {
    const bloc = useContext(MultContext)!;
    return (
        <div id="multScreen">
            <section id="multSection">
                <MultGameForm state={state} />
                <span>{state.score}/{bloc.getMaxScore()}</span>
            </section>
        </div>
    );
}

function MultGameForm({state}: MultScreenProps) {
    const bloc = useContext(MultContext)!;
    const answer = (state.answer != null ? state.answer : "").toString();
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        bloc.submitAnswer();
    }
    const submitClassName = getSubmitClassName(state.answerStatus);
    return (
        <form onSubmit={handleSubmit}>
            <span>{state.task.firstNumber} x {state.task.secondNumber} =&nbsp;</span>
            <input 
                id="answer"
                value={answer} 
                onChange={(event) => bloc.changeAnswer(event.target.value)}
            />
            <button type='submit' className={submitClassName} id="submitButton">
                OK
            </button> 
        </form>
    );
}

function getSubmitClassName(answer: AnswerStatus | null) {
    switch (answer) {
        case AnswerStatus.correct: return "correct"; 
        case AnswerStatus.wrong: return "wrong"; 
        case null: return "";
    }
}

export default MultScreen;
