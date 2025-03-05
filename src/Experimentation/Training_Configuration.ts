import {Experiment_Definition} from "./Experiment_Definition";
import {Independent_Variable} from "./treatments/Independent_Variable";
import {Treatment} from "./treatments/Treatment";
import {iterate_both, iterate_with_counter} from "../utils/loops/loop";
import {Task} from "./Task";
import {Treatment_Combination} from "./treatments/Treatment_Combination";

export class Training_Configuration {

    fixed_treatments: any[];
    can_be_cancelled: boolean = true;
    can_be_repeated:boolean = true;

    constructor(
                    training_configuration: {
                                                fixed_treatments?: string[][];
                                                can_be_cancelled: boolean;
                                                can_be_repeated: boolean
                                            }
                                                                                ){
                                                                                    if(training_configuration === undefined) return;
                                                                                    if(training_configuration.fixed_treatments!=undefined)
                                                                                        this.fixed_treatments = training_configuration.fixed_treatments;

                                                                                    this.can_be_cancelled = training_configuration.can_be_cancelled;
                                                                                    this.can_be_repeated = training_configuration.can_be_repeated;
                                                                                }


    init_experiment(
                        experiment_definition: Experiment_Definition
                   )                                                    {
                                                                            experiment_definition.tasks = [];
                                                                            if(this.fixed_treatments != undefined) {

                                                                                for(let a_treatment_combination of this.fixed_treatments) {

                                                                                    let treatment_combination = new Treatment_Combination([]);

                                                                                    iterate_both(
                                                                                                experiment_definition.all_independent_variables(),
                                                                                                a_treatment_combination,
                                                                                                (variable:Independent_Variable, value:string)=> {
                                                                                                    treatment_combination.treatment_combination.push(new Treatment(variable, value));
                                                                                                });

                                                                                    let task = new Task(treatment_combination, experiment_definition, "");
                                                                                    task.is_training = true;
                                                                                    experiment_definition.experiment_definition_task_creator(task);
                                                                                    experiment_definition.tasks.push(task);
                                                                                }
                                                                            } else {
                                                                                experiment_definition.init_experiment(true);
                                                                            }
                                                                        }


}
