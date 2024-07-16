import {Treatment} from "./Treatment.js";
import {Experiment_Definition} from "./Experiment_Definition.js";
export function init(){}
export class Task {

    treatment_combination: Treatment[];
    expected_answer: string = "";
    given_answer: string = "";
    required_milliseconds = null;
    task_number_in_execution: number = -1;
    experiment_definition: Experiment_Definition;
    invalid_answers = [];
    is_training:boolean = false;

    constructor(tc: Treatment[], experiment_definition: Experiment_Definition, text: string) {
        this.treatment_combination = tc;
        this.experiment_definition = experiment_definition;
        // this.code_string(text);
    }

    do_print_task: ()=>void = () => {
        throw new Error("Method not implemented.");
    }

    do_print_error_message:(input:string)=>void = () => {
        throw new Error("Method not implemented.");
    }

    accepts_answer_function = (answer:string) => true;
    accepts_answer(input:string) {
        let answer = this.experiment_definition.measurement.get_given_answer(input);
        return this.accepts_answer_function(answer);
    }

    next_task():Task {
        if(this.task_number_in_execution<this.experiment_definition.tasks.length)
            return this.experiment_definition.tasks[this.task_number_in_execution];
        else
            return null;
    }

    html_string_with_cmd(html_string: string, cmd: ()=>void) {
        // this.write_action = (writer: Automata_IO) => {
        //     writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_line(html_string));
        //     cmd();
        // }
    }

    html_node_with_cmd(element: any, cmd: ()=>void) {
        // this.write_action = (writer: Automata_IO) => {
        //     writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_node(element));
        //     cmd();
        // }
    }
    after_task_string_constructor(a_string_constructor: () => string) {
        // this.after_task_write_action = () => (writer: Automata_IO) =>writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(a_string_constructor()));
    }

    do_print_after_task_information: ()=>void = () => {
        throw new Error("Method not implemented.");
    }

    print_task() {
        this.do_print_task();
        this.print_input_request();
    }

    private print_input_request() {
        this.experiment_definition.measurement.input_type.print_input_request();
    }
}
