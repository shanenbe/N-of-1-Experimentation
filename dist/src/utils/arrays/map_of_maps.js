export function map_of_maps_of_array(arr, function_array, last_function) {
    var result = {};
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var element = arr_1[_i];
        var current_map = result;
        var function_values = [];
        for (var _a = 0, function_array_1 = function_array; _a < function_array_1.length; _a++) {
            var f = function_array_1[_a];
            var function_value = f(element);
            function_values.push(function_value);
            if (current_map["" + function_value] == undefined) {
                current_map["" + function_value] = {};
            }
            current_map = current_map["" + function_value];
        }
        if (current_map[last_function(element)] == undefined) {
            current_map[last_function(element)] = [];
        }
        current_map[last_function(element)].push(element);
    }
    return result;
}
