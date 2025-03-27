export function all_true_false_combinations(number) {
    var all_combinations = [];
    for (var c = 0; c < number; c++) {
        all_combinations.push(number_as_binary_array(c, binary_length(number)));
    }
    return all_combinations;
}
export function number_as_binary_array(number, length) {
    var ret = [];
    var rest = number;
    for (var counter = 0; counter < length; counter++) {
        ret.push(number % 2 == 0);
        number = Math.floor(number / 2);
    }
    return ret.reverse();
}
export function binary_length(number) {
    var c = 1;
    while ((number = Math.floor(number / 2)) > 0)
        c++;
    return c;
}
