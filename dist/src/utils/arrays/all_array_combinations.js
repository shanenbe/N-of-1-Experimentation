var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function all_array_combinations_internal(arr, combination, f) {
    if (arr.length == 0) {
        f(combination);
    }
    else {
        var last = arr.shift();
        for (var _i = 0, last_1 = last; _i < last_1.length; _i++) {
            var e = last_1[_i];
            combination.push(e);
            all_array_combinations_internal(arr, combination, f);
            combination.pop();
        }
        arr.unshift(last);
    }
}
/**
 *  @param arr: An array of arrays
 *  executes for all combinations of arrays the function f
 */
export function all_array_combinations(arr, f) {
    all_array_combinations_internal(arr, [], f);
}
/**
 * Examples:
 *   all_x_tupel(1, [1, 2, 3]) = [1, 2, 3]
 *   all_x_tupel(2, [1, 2, 3]) = [[1, 1], [1,2]], [1,3], [2,1]....[3,3]]

 */
export function all_x_tupel(tupel_length, arr) {
    var result = [];
    if (tupel_length == 1) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var e = arr_1[_i];
            result.push([e]);
        }
        return result;
    }
    var x_minus_one_tupel = all_x_tupel(tupel_length - 1, arr);
    for (var _a = 0, arr_2 = arr; _a < arr_2.length; _a++) {
        var e = arr_2[_a];
        for (var _b = 0, x_minus_one_tupel_1 = x_minus_one_tupel; _b < x_minus_one_tupel_1.length; _b++) {
            var a_x_minux_one_tupel = x_minus_one_tupel_1[_b];
            result.push(__spreadArray([e], a_x_minux_one_tupel, true));
        }
    }
    return result;
}
/**
 * Examples:
 *   all_different_x_tupel(3, [1, 2, 3]) = [[1, 2, 3], [1,3,2], [2,1,3], [2,3,1]. [3,1,2], [3,2,1]]
 *
*/
export function all_different_x_tupel(tupel_length, arr) {
    var result = [];
    if (tupel_length == 1) {
        for (var _i = 0, arr_3 = arr; _i < arr_3.length; _i++) {
            var e = arr_3[_i];
            result.push([e]);
        }
        return result;
    }
    for (var e = 0; e < arr.length; e++) {
        var arr_without_current_element = arr.slice();
        arr_without_current_element.splice(e, 1);
        var x_minus_one_tupel = all_different_x_tupel(tupel_length - 1, arr_without_current_element);
        for (var _a = 0, x_minus_one_tupel_2 = x_minus_one_tupel; _a < x_minus_one_tupel_2.length; _a++) {
            var a_x_minux_one_tupel = x_minus_one_tupel_2[_a];
            result.push(__spreadArray([arr[e]], a_x_minux_one_tupel, true));
        }
    }
    return result;
}
