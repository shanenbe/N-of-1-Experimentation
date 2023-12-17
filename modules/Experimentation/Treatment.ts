import {Variable} from "./Variable.js";
export function init(){}
export class Treatment {
    variable: Variable;
    value: string;
    constructor(variable: Variable, value: string) {
        this.variable = variable;
        this.value = value;
    }

}