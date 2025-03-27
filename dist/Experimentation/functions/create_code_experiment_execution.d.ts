import { Measurement_Type, Output_Command } from "../Experimentation";
import { Question } from "../../Automata_Forwarders/Questionnaire_Forwarder";
import { Task } from "../Task";
import { Experiment_Definition } from "../Experiment_Definition";
import { Sequential_Forwarder_Forwarder } from "../../Books/Sequential_Forwarder_Forwarder";
export declare function create_code_experiment_execution(cfg: {
    experiment_name: string;
    seed: string;
    introduction_pages: Output_Command[];
    post_questionnaire?: Question[];
    pre_run_training_output: Output_Command;
    training_configuration?: {
        fixed_treatments?: string[][];
        can_be_cancelled: boolean;
        can_be_repeated: boolean;
    };
    pre_run_experiment_output: Output_Command;
    finish_pages: Output_Command[];
    layout: {
        variable: string;
        treatments: string[];
    }[];
    repetitions: number;
    task_configuration: (task: Task) => void;
    measurement: Measurement_Type;
    finish_function: (experiment: Experiment_Definition) => void;
}): Sequential_Forwarder_Forwarder;
