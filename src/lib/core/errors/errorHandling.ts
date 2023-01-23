import { Failure, UnknownFailure} from "./failures";


export function convertError(e: any, fallback?: Failure) {
    console.log(`caught exception`);
    console.log(e);
    return e instanceof Failure ? e : fallback ?? new UnknownFailure();
}

export function withErrorHandling<T>(callback: () => Promise<T>): Promise<Failure | T> {
    return callback().then((res) => res).catch((e) => convertError(e));
}