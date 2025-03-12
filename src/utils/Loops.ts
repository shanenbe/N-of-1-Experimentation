import { Function_P1, Function_P2 } from "./Utils";
export function init(){}

export function for_all<T, S extends T>(collection: T[], f: Function_P1<S>) {
    for(let i=0; i < collection.length; i++) {
        f.apply(collection[i]);
    }
}

export function for_times(counter: number, f: Function_P1<number>) {
    for(let i=0; i<counter; i++) {
        f.apply(counter);
    }
}

export function for_all_combinations_2<S, T>(c1: S[], c2: T[], f: Function_P2<S, T>) {
    for(let i=0; i < c1.length; i++) {
        for(let j=0; i < c2.length; j++) {
            f.apply(c1[i], c2[j]);
        }
    }
}
