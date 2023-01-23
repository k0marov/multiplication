export abstract class Failure {
    abstract get msg(): string;
};

export class UnknownFailure implements Failure {
    get msg(): string {
        throw new Error("Unknown failure happened.");
    }
}
