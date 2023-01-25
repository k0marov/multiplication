import NumbersServiceImpl from "./features/multiplication/domain/service/NumbersServiceImpl";
import { MultBloc } from "./features/multiplication/domain/state/MultBloc";

interface UIDeps {
    multBlocFactory: () => MultBloc,
}
export let uiDeps: UIDeps;

const numbersService = new NumbersServiceImpl();
uiDeps = {
    multBlocFactory: () => new MultBloc(numbersService),
};