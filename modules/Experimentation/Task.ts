import {Treatment} from "./Treatment.js";
import {Experiment_Definition} from "./Experiment_Definition.js";
import {Output_Command} from "./Experimentation";
export function init(){}
export class Task {

    treatment_combination: Treatment[];
    expected_answer: string = "";
    given_answer: string = "";
    required_milliseconds = null;
    task_number_in_execution: number = -1;
    experiment_definition: Experiment_Definition;
    invalid_answers = [];

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
    // is_treatment_combination(combination: string[]) {
    //     for (let a_treatment_combination of this.treatment_combination) {
    //         if (a_treatment_combination.value != combination[0]) {
    //             return false;
    //         };
    //         combination = combination.slice(1);
    //     }
    //     return true;
    // }

    // print_task(writer: Automata_IO): void {
    //     writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.TASK, text_line("Task "+this.task_number_in_execution + " / " + this.experiment_definition.tasks.length));
    //     this.write_action(writer);
    // }
    //
    // write_action: (writer: Automata_IO) => void;
    // after_task_write_action:() => (writer: Automata_IO) => void;


    // code_string(code_string: string) {
    //     this.write_action = (writer: Automata_IO) => writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, code_line(code_string))
    // }
    //
    // html_string(html_string: string) {
    //     this.write_action = (writer: Automata_IO) => writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_line(html_string))
    // }

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

    after_task_html_string_constructor(a_string_constructor: () => string) {
        // this.after_task_write_action = () => (writer: Automata_IO) =>writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_line(a_string_constructor()));
    }

    print_between_tasks() {
        // this.after_task_write_action()(writer);
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

// export class Code_Task extends Task {
//
//     write_action: (writer: Automata_IO) => void;
//     after_task_write_action:() => (writer: Automata_IO) => void;
//     constructor(tc: Treatment[], experiment_definition: Experiment_Definition<any>, text: string) {
//         super(tc, experiment_definition);
//         this.code_string(text);
//     }
//
//     print_task(writer: Automata_IO) {
//         super.print_task(writer);
//         this.write_action(writer);
//     }
//
//     code_string(code_string: string) {
//         this.write_action = (writer: Automata_IO) => writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, code_line(code_string))
//     }
//
//     html_string(html_string: string) {
//         this.write_action = (writer: Automata_IO) => writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_line(html_string))
//     }
//
//     html_string_with_cmd(html_string: string, cmd: ()=>void) {
//         this.write_action = (writer: Automata_IO) => {
//             writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_line(html_string));
//             cmd();
//         }
//     }
//
//     html_node_with_cmd(element: any, cmd: ()=>void) {
//         this.write_action = (writer: Automata_IO) => {
//             writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_node(element));
//             cmd();
//         }
//     }
//     after_task_string_constructor(a_string_constructor: () => string) {
//         this.after_task_write_action = () => (writer: Automata_IO) =>writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(a_string_constructor()));
//     }
//
//     after_task_html_string_constructor(a_string_constructor: () => string) {
//         this.after_task_write_action = () => (writer: Automata_IO) =>writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_line(a_string_constructor()));
//     }
//
//     print_between_tasks(writer: Automata_IO) {
//         this.after_task_write_action()(writer);
//     }
//
// }