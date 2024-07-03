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

export function all_array_combinations(arr: any[], f) {
    all_array_combinations_internal(arr, [], f);
}