var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Independent_Variable } from "./Independent_Variable";
import { all_array_combinations } from "../../utils/arrays/all_array_combinations";
import { Treatment_Combination } from "./Treatment_Combination";
var Independent_Variables = /** @class */ (function () {
    function Independent_Variables() {
        this.independent_variables = [];
    }
    Independent_Variables.prototype.push_variable = function (n, treatments) {
        this.independent_variables.push(new Independent_Variable(n, treatments));
    };
    Independent_Variables.prototype.print_to_array = function (result) {
        for (var _i = 0, _a = this.independent_variables; _i < _a.length; _i++) {
            var variable = _a[_i];
            result.push(variable.name + ";");
        }
    };
    Independent_Variables.prototype.create_treatment_combinations = function () {
        var treatment_combinations = [];
        all_array_combinations(this.independent_variables.map(function (t) { return t.treatments; }), function (treatments) {
            treatment_combinations.push(new Treatment_Combination(__spreadArray([], treatments, true)));
        });
        return treatment_combinations;
    };
    Independent_Variables.prototype.get_variable_named = function (var_name) {
        for (var _i = 0, _a = this.independent_variables; _i < _a.length; _i++) {
            var v = _a[_i];
            if (v.name === var_name)
                return v;
        }
        throw "Unknown independent variable named: " + var_name;
    };
    Independent_Variables.from_layout = function (layout) {
        var variables = new Independent_Variables();
        for (var _i = 0, layout_1 = layout; _i < layout_1.length; _i++) {
            var aVar = layout_1[_i];
            variables.push_variable(aVar.variable, aVar.treatments);
        }
        return variables;
    };
    return Independent_Variables;
}());
export { Independent_Variables };
