import {Treatment} from "./Treatment.js";
export function init(){}
export class Variable {
    name: string;
    treatments: Treatment[] = [];

    constructor(name: string, treatments: string[]) {
        this.name = name;
        for (let aString of treatments) {
            this.treatments.push(new Treatment(this, aString));
        }
    }

    all_treatment_combinations_do(
        treatment_combination: Treatment[],
        variables: Variable[],
        f: (treatments: Treatment[]) => void
    )
        :void {
        for (var a_treatment of this.treatments) {
            let this_treatment_combination = treatment_combination.slice();
            this_treatment_combination.push(a_treatment);
            if (variables.length == 0)
                f(this_treatment_combination);
            else {
                variables[0].all_treatment_combinations_do(this_treatment_combination, variables.slice(1), f)
            }
        }
    }
}