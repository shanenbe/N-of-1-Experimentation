var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { is_true } from './Testing';
import { random_array_element } from "../Experimentation/Experimentation";
var Binding = /** @class */ (function () {
    function Binding(number_of_variables) {
        this.values = [];
        this.values = new Array(number_of_variables).fill(null);
    }
    Binding.prototype.do_matching = function (that, this_positions, other_positions) {
        var result_left = this.clone();
        var result_right = that.clone();
        var has_left_variable_replacements = false;
        var has_right_variable_replacements = false;
        for (var variable_position = 0; variable_position < this_positions.length; variable_position++) {
            var this_value = this.values[this_positions[variable_position]];
            var that_value = that.values[other_positions[variable_position]];
            if (this_value !== that_value) {
                // WAIT - it could mean that one of them is unbound!
                if (this_value === null) {
                    result_left.values[this_positions[variable_position]] = that_value;
                    has_left_variable_replacements = true;
                }
                else if (that_value === null) {
                    result_right.values[other_positions[variable_position]] = this_value;
                    has_right_variable_replacements = true;
                }
                else {
                    // console.log(this.values[this_positions[variable_position]]  + " === " + binding.values[other_positions[variable_position]] + ": false");
                    return { matches: false, left: null, has_left_variable_replacements: false, right: null, has_right_variable_replacements: false };
                }
            }
            else {
                // console.log(this.values[this_positions[variable_position]]  + " === " + binding.values[other_positions[variable_position]] + ": true");
            }
        }
        // console.log("x..............true");
        return { matches: true, left: result_left, has_left_variable_replacements: has_left_variable_replacements, right: result_right, has_right_variable_replacements: has_right_variable_replacements };
    };
    Binding.prototype.clone = function () {
        var ret = new Binding(this.number_of_variables);
        var vs = [];
        for (var _i = 0, _a = this.values; _i < _a.length; _i++) {
            var v = _a[_i];
            vs.push(v);
        }
        ret.values = vs;
        return ret;
    };
    Binding.prototype.do_print = function () {
        console.log(this.values.join(", "));
    };
    return Binding;
}());
export { Binding };
var Logical_Results = /** @class */ (function () {
    function Logical_Results(number_of_variables) {
        this.rows = [];
        this.rows.push(new Binding(number_of_variables));
    }
    Logical_Results.Empty_Logical_Results = function (num_params) {
        var ret = new Logical_Results(num_params);
        ret.rows = [];
        return ret;
    };
    Logical_Results.Logical_Results_FROM_SOLUTION_ARRAY = function (num_params, array) {
        var ret = Logical_Results.Empty_Logical_Results(num_params);
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var row = array_1[_i];
            ret.add_solution_array(row);
        }
        return ret;
    };
    Logical_Results.prototype.has_contradiction = function () {
        return this.rows.length === 0;
    };
    Logical_Results.prototype.add_solution_array = function (solution_array) {
        var binding = new Binding(this.number_of_variables);
        binding.values = __spreadArray([], solution_array, true);
        this.rows.push(binding);
    };
    Logical_Results.prototype.unify_results = function (that, this_positions, other_positions) {
        if (this.rows.length == 1 && this.rows[0] == undefined)
            console.log("stop");
        var this_remaining_rows = [];
        var that_remaining_rows = [];
        var this_handled_rows_no = [];
        var that_handled_rows_no = [];
        var this_row_counter = 0;
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var this_row = _a[_i];
            this_row_counter++;
            var that_row_counter = 0;
            for (var _b = 0, _c = that.rows; _b < _c.length; _b++) {
                var that_row = _c[_b];
                that_row_counter++;
                var matching = null;
                try {
                    matching = this_row.do_matching(that_row, this_positions, other_positions);
                }
                catch (ex) {
                    matching = this_row.do_matching(that_row, this_positions, other_positions);
                    throw "something is wrong";
                }
                if (matching.matches) {
                    if (!this_handled_rows_no.includes(this_row_counter)) {
                        this_remaining_rows.push(matching.left);
                        if (!matching.has_left_variable_replacements)
                            this_handled_rows_no.push(this_row_counter);
                    }
                    if (!that_handled_rows_no.includes(that_row_counter)) {
                        that_remaining_rows.push(matching.right);
                        if (!matching.has_right_variable_replacements) {
                            if (!matching.has_right_variable_replacements)
                                that_handled_rows_no.push(that_row_counter);
                        }
                    }
                }
            }
        }
        this.rows = this_remaining_rows;
        that.rows = that_remaining_rows;
    };
    Logical_Results.prototype.do_print = function () {
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var r = _a[_i];
            r.do_print();
        }
    };
    Logical_Results.prototype.solutions = function () {
        return this.rows;
    };
    Logical_Results.prototype.random_result_for_column = function (column) {
        var ret = new Logical_Results(this.number_of_variables);
        ret.rows = [this.random_row_for_random_column_value(2)];
        return ret;
    };
    Logical_Results.prototype.random_row_for_random_column_value = function (column) {
        var arr = this.elements_of_column_with_unique_results(column);
        var random_value = random_array_element(arr);
        var possible_row_nos = this.rows_with_value_matching(column, random_value);
        var random_row_no = random_array_element(possible_row_nos);
        return this.rows[random_row_no];
    };
    Logical_Results.prototype.elements_of_column_with_unique_results = function (column) {
        var ret = [];
        this.rows.forEach(function (binding) {
            var value = binding.values[column];
            if (!ret.includes(value))
                ret.push(value);
        });
        return ret;
    };
    Logical_Results.prototype.rows_with_value_matching = function (column, value) {
        var ret = [];
        for (var i = 0; i < this.rows.length; i++) {
            if (this.rows[i].values[column] == value) {
                ret.push(i);
            }
        }
        return ret;
    };
    return Logical_Results;
}());
export { Logical_Results };
export function array_of_rows_to_logical_result(number_of_columns, array_of_rows) {
    var ret = new Logical_Results(number_of_columns);
    ret.rows = [];
    for (var _i = 0, array_of_rows_1 = array_of_rows; _i < array_of_rows_1.length; _i++) {
        var row = array_of_rows_1[_i];
        var new_binding = new Binding(number_of_columns);
        new_binding.values = [];
        for (var column in row) {
            var new_value = row[column];
            new_binding.values.push(new_value);
        }
        ret.rows.push(new_binding);
    }
    return ret;
}
export function array_of_values_to_logical_result(number_of_columns, array_of_values) {
    var ret = new Logical_Results(number_of_columns);
    ret.rows = [];
    for (var _i = 0, array_of_values_1 = array_of_values; _i < array_of_values_1.length; _i++) {
        var row = array_of_values_1[_i];
        var new_binding = new Binding(number_of_columns);
        new_binding.values = [];
        for (var _a = 0, row_1 = row; _a < row_1.length; _a++) {
            var value = row_1[_a];
            new_binding.values.push(value);
        }
        ret.rows.push(new_binding);
    }
    return ret;
}
export function array_of_array_of_values_to_logical_result(number_of_columns, array_of_arrays_of_values) {
    var ret = new Logical_Results(number_of_columns);
    ret.rows = [];
    for (var _i = 0, array_of_arrays_of_values_1 = array_of_arrays_of_values; _i < array_of_arrays_of_values_1.length; _i++) {
        var row = array_of_arrays_of_values_1[_i];
        var new_binding = new Binding(number_of_columns);
        new_binding.values = [];
        for (var _a = 0, row_2 = row; _a < row_2.length; _a++) {
            var value = row_2[_a];
            new_binding.values.push(value);
        }
        ret.rows.push(new_binding);
    }
    return ret;
}
function test_logic_programming() {
    var binding_1;
    var binding_2;
    binding_1 = array_of_rows_to_logical_result(6, [
        { a: 1, b: 2, c: 3, d: 4, e: 5, f: 1 },
        { a: 1, b: 2, c: 3, d: 4, e: 5, f: 2 },
        { a: 1, b: 3, c: 3, d: 4, e: 5, f: 3 },
        { a: 1, b: 3, c: 3, d: 4, e: 5, f: 4 }
    ]);
    binding_2 = array_of_rows_to_logical_result(2, [
        { x: 2, y: 3 }
    ]);
    binding_1.unify_results(binding_2, [1, 2], [0, 1]);
    is_true(binding_1.rows.length == 2 && binding_2.rows.length == 1, "Unify 1 (all right): with possibly double entries right " + binding_1.rows.length + " -- " + binding_2.rows.length);
    binding_1 = array_of_rows_to_logical_result(6, [
        { a: 1, b: 2, c: 3, d: 4, e: 5, f: 1 },
        { a: 1, b: 2, c: 3, d: 4, e: 5, f: 2 },
        { a: 1, b: 3, c: 3, d: 4, e: 5, f: 3 },
        { a: 1, b: 3, c: 3, d: 4, e: 5, f: 4 }
    ]);
    binding_2 = array_of_rows_to_logical_result(2, [
        { x: 2, y: 3 },
        { x: 3, y: 3 }
    ]);
    binding_1.unify_results(binding_2, [1, 2], [0, 1]);
    is_true(binding_1.rows.length == 4 && binding_2.rows.length == 2, "Unify 2 (all right): with possibly double entries right " + binding_1.rows.length + " -- " + binding_2.rows.length);
    binding_1 = array_of_rows_to_logical_result(6, [
        { a: 1, b: 2, c: 3, d: 4, e: 5, f: 1 },
        { a: 1, b: 2, c: 3, d: 4, e: 5, f: 2 },
        { a: 1, b: 3, c: 3, d: 4, e: 5, f: 3 },
        { a: 1, b: 3, c: 3, d: 4, e: 5, f: 4 }
    ]);
    binding_2 = array_of_rows_to_logical_result(2, [
        { x: 2, y: 3 }
    ]);
    binding_1.unify_results(binding_2, [1], [0]);
    is_true(binding_1.rows.length == 2 && binding_2.rows.length == 1, "Unify 3 (only subset right): with possibly double entries right " + binding_1.rows.length + " -- " + binding_2.rows.length);
    binding_2 = array_of_rows_to_logical_result(6, [
        { x: 2, y: 3 }
    ]);
    binding_1 = array_of_rows_to_logical_result(6, [
        { a: 1, b: null, c: 3, d: 4, e: 5, f: 6 },
        { a: 1, b: null, c: 3, d: 4, e: 5, f: 6 },
    ]);
    binding_2 = array_of_rows_to_logical_result(6, [
        { x: 2 }
    ]);
    binding_1.unify_results(binding_2, [1], [0]);
    is_true(binding_1.rows.length == 2 && binding_2.rows.length == 1, "Unify 4 (on unbound variable left) " + binding_1.rows.length + " -- " + binding_2.rows.length);
    is_true(binding_1.rows[0].values[1] === 2, "Unify 3 (unbounded becomes bounded) " + binding_1.rows.length + " -- " + binding_2.rows.length);
    binding_1 = array_of_rows_to_logical_result(2, [
        { a: 1, b: null, c: 3, d: 4, e: 5, f: 6 },
        { a: 1, b: null, c: 3, d: 4, e: 5, f: 6 },
    ]);
    binding_2 = array_of_rows_to_logical_result(2, [
        { x: 2 },
        { x: 3 }
    ]);
    binding_1.unify_results(binding_2, [1], [0]);
    is_true(binding_1.rows.length === 4 && binding_2.rows.length == 2, "Unify 5 (multiple variable bindings) " + binding_1.rows.length + " -- " + binding_2.rows.length);
    is_true(binding_1.rows[0].values[1] === 2, "Unify 5 (multiple variable bindings - unbounded variable is now bounded");
    binding_1 = array_of_rows_to_logical_result(2, [
        { a: 1, b: null, c: 3, d: 4, e: 5, f: 6 },
        { a: 1, b: null, c: 3, d: 4, e: 5, f: 6 },
    ]);
    binding_2 = array_of_rows_to_logical_result(1, [
        { x: null }
    ]);
    binding_1.unify_results(binding_2, [1], [0]);
    is_true(binding_1.rows.length == 2 && binding_2.rows.length == 1, "Unify 6 (unifying unbounded variables) " + binding_1.rows.length + " -- " + binding_2.rows.length);
    is_true(binding_1.rows[0].values[1] === null, "Unify 6 (multiple variable bindings - unbounded variable is now bounded - 1st");
    is_true(binding_2.rows[0].values[0] === null, "Unify 6 (multiple variable bindings - unbounded variable is now bounded - 2nd");
    binding_1 = new Logical_Results(3);
    binding_2 = array_of_rows_to_logical_result(1, [
        { x: 1 },
        { x: 2 },
        { x: 3 }
    ]);
    binding_1.unify_results(binding_2, [1], [0]);
    is_true(binding_1.rows.length == 3 && binding_2.rows.length == 3, "Unify 7 " + binding_1.rows.length + " -- " + binding_2.rows.length);
    binding_1 = array_of_array_of_values_to_logical_result(6, [
        [1, 2, 3, 4, 5, 6],
        [1, 3, 3, 4, 5, 6],
    ]);
    binding_2 = new Logical_Results(3);
    binding_1.unify_results(binding_2, [1], [0]);
    is_true(binding_1.rows.length == 2 && binding_2.rows.length == 2, "Unify 8 " + binding_1.rows.length + " -- " + binding_2.rows.length);
    is_true(binding_1.rows[0].values[1] === 2, "Unify 8 (multiple variable bindings - unbounded variable is now bounded - 1st");
    is_true(binding_1.rows[1].values[1] === 3, "Unify 8 (multiple variable bindings - unbounded variable is now bounded - 2nd");
}
test_logic_programming();
console.log("ok, logic programming seems to work.");
