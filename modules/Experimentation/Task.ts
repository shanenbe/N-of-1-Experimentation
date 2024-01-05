import {Treatment} from "./Treatment.js";
import {code_line, code_page, text_line} from "../Books/IO_Object.js";
import {Experiment_Definition} from "./Experiment_Definition.js";
import {Automata_IO, AUTOMATA_OUTPUT_WRITER_ACTION, AUTOMATA_OUTPUT_WRITER_TAGS} from "../Books/Automata_IO.js";
export function init(){}
export abstract class Task {
    treatment_combination: Treatment[];
    expected_answer: string = "";
    given_answer: string = "";
    required_miliseconds = null;
    task_number_in_execution: number = -1;
    experiment_definition: Experiment_Definition<any>;

    constructor(tc: Treatment[], experiment_definition: Experiment_Definition<any>) {
        this.treatment_combination = tc;
        this.experiment_definition = experiment_definition;
    }


    is_treatment_combination(combination: string[]) {
        for (var a_treatment_combination of this.treatment_combination) {
            if (a_treatment_combination.value != combination[0]) {
                return false;
            };
            combination = combination.slice(1);
        }
        return true;
    }

    print_task_on(writer: Automata_IO): void {
        writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.TASK, text_line("Task "+this.task_number_in_execution + " / " + this.experiment_definition.tasks.length));
    }

    abstract print_between_tasks(output_object: Automata_IO);

}

export class Code_Task extends Task {

    write_action: (writer: Automata_IO) => void;
    after_task_write_action:() => (writer: Automata_IO) => void;
    constructor(tc: Treatment[], experiment_definition: Experiment_Definition<any>, text: string) {
        super(tc, experiment_definition);
        this.code_string(text);
    }

    print_task_on(writer: Automata_IO) {
        super.print_task_on(writer);
        this.write_action(writer);
    }

    code_string(code_string: string) {
        this.write_action = (writer: Automata_IO) => writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, code_line(code_string))
    }

    after_task_string_constructor(a_string_constructor: () => string) {
        this.after_task_write_action = () => (writer: Automata_IO) =>writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(a_string_constructor()));
    }

    print_between_tasks(writer: Automata_IO) {
        this.after_task_write_action()(writer);
    }

}