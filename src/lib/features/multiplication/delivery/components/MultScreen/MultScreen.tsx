import "./MultScreen.css";
import MultState from "../../../domain/state/MultState";

export function MultScreen({state} : {state: MultState}) {
    return (
        <div id="multScreen">
            <section id="multSection">
                <span>32 x 44 = </span>
                <button>Check</button>
                <AnswerInput />
            </section>
        </div>
    );
}

function AnswerInput() {
    return <input id="answer"></input>;
}

export default MultScreen;
