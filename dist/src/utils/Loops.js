export function init() { }
export function for_all(collection, f) {
    for (var i = 0; i < collection.length; i++) {
        f.apply(collection[i]);
    }
}
export function for_times(counter, f) {
    for (var i = 0; i < counter; i++) {
        f.apply(counter);
    }
}
export function for_all_combinations_2(c1, c2, f) {
    for (var i = 0; i < c1.length; i++) {
        for (var j = 0; i < c2.length; j++) {
            f.apply(c1[i], c2[j]);
        }
    }
}
