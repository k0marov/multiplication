import { MultBloc, MultBuilder, MultProvider } from "../../../domain/state/MultBloc";
import MultScreen from "./MultScreen";

export function MultScreenContainer({ }) {
    return (
            <MultProvider create={() => new MultBloc({})}>
                <MultBuilder builder={(snapshot) => {
                    if (snapshot == null) {
                        return <></>;
                    }
                    return <MultScreen state={snapshot} />;
                }} />
            </MultProvider>
    );
}

export default MultScreenContainer;