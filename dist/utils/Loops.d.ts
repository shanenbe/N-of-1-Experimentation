import { Function_P1, Function_P2 } from "./Utils";
export declare function init(): void;
export declare function for_all<T, S extends T>(collection: T[], f: Function_P1<S>): void;
export declare function for_times(counter: number, f: Function_P1<number>): void;
export declare function for_all_combinations_2<S, T>(c1: S[], c2: T[], f: Function_P2<S, T>): void;
