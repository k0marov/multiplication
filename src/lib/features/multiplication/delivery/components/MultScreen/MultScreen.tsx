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

    const delayVars = {
        ['--correct-delay' as any]: `${bloc.correctAnswerDelaySec}s`,
        ['--wrong-delay' as any]: `${bloc.wrongAnswerDelaySec}s`,
    };

    const scoreClassName = state.answerStatus === AnswerStatus.correct ? "incrementedScore" : "";
    const score = <span className={scoreClassName}>{state.score}</span>;

    return (
        <div id="multScreen" style={delayVars}>
            <section id="multSection">
                <MultGameForm state={state} />
                <span>{score}/{bloc.getMaxScore()}</span>
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
    const formClassName = getFormClassName(state.answerStatus);
    return (
        <form className={formClassName} onSubmit={handleSubmit}>
            <span>{state.task.firstNumber} &times; {state.task.secondNumber} =&nbsp;</span>
            <input 
                id="answer"
                disabled={state.answerStatus === AnswerStatus.wrong}
                value={state.answerStatus === AnswerStatus.wrong ? state.task.correctAnswer : answer} 
                onChange={(event) => bloc.changeAnswer(event.target.value)}
            />
            <button type='submit' id="submitButton">
                OK
            </button> 
        </form>
    );
}

function getFormClassName(answer: AnswerStatus | null) {
    switch (answer) {
        case AnswerStatus.correct: return "correct"; 
        case AnswerStatus.wrong: return "wrong"; 
        case null: return "";
    }
}

export default MultScreen;
