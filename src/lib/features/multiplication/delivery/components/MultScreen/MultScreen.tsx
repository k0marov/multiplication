import "./MultScreen.css";
import LoadedState from "../../../domain/state/MultState";
import { useContext, useState } from "react";
import { MultContext } from "../../../domain/state/MultBloc";

export function MultScreen({state} : {state: LoadedState}) {
    const bloc = useContext(MultContext)!;
    return (
        <div id="multScreen">
            <section id="multSection">
                <span>{state.task.firstNumber} x {state.task.secondNumber} =&nbsp;</span>
                <input 
                    value={(state.answer ?? "").toString()} 
                    onChange={(event) => bloc.changeAnswer(event.target.value)}
                />
                <button id="submitButton">OK</button> 
            </section>
        </div>
    );
}
export default MultScreen;
