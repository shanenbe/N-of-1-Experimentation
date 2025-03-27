import { Experiment_Definition } from "./Experiment_Definition";
import { Treatment_Combination } from "./treatments/Treatment_Combination";
export declare class Task {
    treatment_combination: Treatment_Combination;
    expected_answer: string;
    given_answer: string;
    required_milliseconds: any;
    task_number_in_execution: number;
    experiment_definition: Experiment_Definition;
    invalid_answers: any[];
    is_training: boolean;
    has_pre_task_description: boolean;
    constructor(tc: Treatment_Combination, experiment_definition: Experiment_Definition, text: string);
    do_print_task: () => void;
    do_print_pre_task: () => void;
    do_print_error_message: (input: string) => void;
    accepts_answer_function: (answer: string) => boolean;
    accepts_answer(input: string): boolean;
    next_task(): Task;
    html_string_with_cmd(html_string: string, cmd: () => void): void;
    html_node_with_cmd(element: any, cmd: () => void): void;
    after_task_string_constructor(a_string_constructor: () => string): void;
    do_print_after_task_information: () => void;
    print_task(): void;
    print_pre_task_info(): void;
    private print_input_request;
    treatment_value(treatment_name: string): string;
    set_computed_variable_value(variable_name: string, value: string): void;
}
