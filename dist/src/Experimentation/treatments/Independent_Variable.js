import { Treatment } from "./Treatment";
var Independent_Variable = /** @class */ (function () {
    function Independent_Variable(name, treatments) {
        this.treatments = [];
        this.name = name;
        for (var _i = 0, treatments_1 = treatments; _i < treatments_1.length; _i++) {
            var aString = treatments_1[_i];
            this.treatments.push(new Treatment(this, aString));
        }
    }
    return Independent_Variable;
}());
export { Independent_Variable };
