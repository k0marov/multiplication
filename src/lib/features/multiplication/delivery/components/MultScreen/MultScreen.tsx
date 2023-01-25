import "./MultScreen.css";
import LoadedState from "../../../domain/state/MultState";
import { useState } from "react";

export function MultScreen({state} : {state: LoadedState}) {
    return (
        <div id="multScreen">
            <section id="multSection">
                <span>32 x 44 =&nbsp;</span>
                <AnswerInput />
                <button id="submitButton">OK</button> 
            </section>
        </div>
    );
}

function AnswerInput() {
    const [text, setText] = useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value.replace(/[^0-9]/g, '')) 
    };
    return (
        <input 
            id="answer"
            value={text} 
            onChange={handleChange}
        />
    );
}

export default MultScreen;
