var Treatment = /** @class */ (function () {
    function Treatment(variable, value) {
        this.variable = variable;
        this.value = "" + value;
    }
    Treatment.prototype.clone = function () {
        var ret = new Treatment(this.variable, this.value);
        return ret;
    };
    return Treatment;
}());
export { Treatment };
