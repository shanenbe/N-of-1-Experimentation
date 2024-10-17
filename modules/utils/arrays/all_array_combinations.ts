function all_array_combinations_internal(arr: any[], combination, f) {
        if(arr.length==0) {
            f(combination);
        } else {
            let last:[] = arr.shift();
            for (let e of last) {
                combination.push(e);
                all_array_combinations_internal(arr, combination, f);
                combination.pop();
            }
            arr.unshift(last);
        }
}

/**
 *  @param arr: An array of arrays
 *  executes for all combinations or arrays the function f
 */
export function all_array_combinations<T>(arr: T[][], f:((T)=>any)) {
    all_array_combinations_internal(arr, [], f);
}