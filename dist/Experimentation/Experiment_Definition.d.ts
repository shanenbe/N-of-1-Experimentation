import { Independent_Variable } from "./treatments/Independent_Variable";
import { Task } from "./Task";
import { Measurement_Type } from "./Experimentation";
import { Questionnaire_Forwarder } from "../Automata_Forwarders/Questionnaire_Forwarder";
import { Treatments_Combinator } from "./treatments/Treatments_Combinator";
import { Independent_Variables } from "./treatments/Independent_Variables";
export declare function init(): void;
export declare abstract class Experiment_Definition {
    experiment_name: string;
    is_training: boolean;
    variables: Independent_Variables;
    questionnaires: Questionnaire_Forwarder[];
    measurement: Measurement_Type;
    treatments_combinator: Treatments_Combinator;
    tasks: Task[];
    experiment_definition_task_creator: (Task: Task) => void;
    constructor(experiment_name: string, is_training: boolean, treatments_combinator: Treatments_Combinator, variables: Independent_Variables, repetitions: number, measurement: Measurement_Type, task_creator: (task: Task) => void);
    template: {
        experiment_name: string;
        variables: Independent_Variables;
        repetitions: number;
        task_creator: (task: Task) => void;
    };
    init_experiment(is_training: any): void;
    all_independent_variables(): Independent_Variable[];
    generate_csv_data(): string[];
}
