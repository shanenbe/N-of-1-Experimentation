var Treatment_Combination = /** @class */ (function () {
    function Treatment_Combination(treatment_combination) {
        this.treatment_combination = [];
        this.treatment_combination = treatment_combination;
    }
    Treatment_Combination.prototype.clone = function () {
        var ret = new Treatment_Combination([]);
        for (var _i = 0, _a = this.treatment_combination; _i < _a.length; _i++) {
            var treatment = _a[_i];
            ret.treatment_combination.push(treatment.clone());
        }
        return ret;
    };
    return Treatment_Combination;
}());
export { Treatment_Combination };
