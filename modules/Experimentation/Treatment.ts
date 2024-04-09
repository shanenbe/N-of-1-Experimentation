import {Variable} from "./Variable.js";
import ParseMethods from "mathjax-full/js/input/tex/ParseMethods";
import variable = ParseMethods.variable;
export function init(){}
export class Treatment {
    variable: Variable;
    value: string;
    constructor(variable: Variable, value: string) {
        this.variable = variable;
        this.value = ""+value;
    }

    clone():Treatment {
        let ret = new Treatment(this.variable, this.value);
        return ret;
    }
}