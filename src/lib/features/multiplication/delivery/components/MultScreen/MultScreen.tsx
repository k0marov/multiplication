import "./MultScreen.css";
import LoadedState from "../../../domain/state/MultState";
import { FormEvent, useContext } from "react";
import { MultContext } from "../../../domain/state/MultBloc";

export function MultScreen({state} : {state: LoadedState}) {
    const bloc = useContext(MultContext)!;
    const answer = (state.answer != null ? state.answer : "").toString();
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        bloc.submitAnswer();
    }
    return (
        <div id="multScreen">
            <section id="multSection">
                <form onSubmit={handleSubmit}>
                    <span>{state.task.firstNumber} x {state.task.secondNumber} =&nbsp;</span>
                    <input 
                        id="answer"
                        value={answer} 
                        onChange={(event) => bloc.changeAnswer(event.target.value)}
                    />
                    <button type='submit' id="submitButton">
                        OK
                    </button> 
                </form>
                <span>{state.score}/10</span>
            </section>
        </div>
    );
}
export default MultScreen;
