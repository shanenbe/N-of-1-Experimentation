import type { Independent_Variable } from "./Independent_Variable";
import { Treatment_Combination } from "./Treatment_Combination";
import { Task } from "../Task";
import { Experiment_Definition } from "../Experiment_Definition";
import { Independent_Variables } from "./Independent_Variables";
/**
 * All experiment definitions contain the treatment combinations (including repetitions)
 */
export declare class Treatments_Combinator {
    variables: Independent_Variables;
    repetitions: number;
    constructor(variables: Independent_Variables, repetitions: number);
    clone(): Treatments_Combinator;
    create_treatment_combinations(): Treatment_Combination[];
    create_tasks(experiment_definition: Experiment_Definition): Task[];
    get_variable_named(var_name: string): Independent_Variable;
}
