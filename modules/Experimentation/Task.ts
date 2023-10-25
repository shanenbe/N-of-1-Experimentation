import * as Utils from "../Utils";
import {Treatment} from "./Treatment";
import {code_line, code_page, text_line} from "../Books/IO_Object";
import {Experiment_Definition} from "./Experiment_Definition";
import {Automata_IO, AUTOMATA_OUTPUT_WRITER_ACTION, AUTOMATA_OUTPUT_WRITER_TAGS} from "../Books/Automata_IO";
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

    abstract print_task_on(output_object: Automata_IO);
    abstract print_between_tasks(output_object: Automata_IO);

}

export class Code_Task extends Task {
    code: string = "";
    after_task_string:()=>string = ()=>this.code;
    constructor(tc: Treatment[], experiment_definition: Experiment_Definition<any>, text: string) { super(tc, experiment_definition); this.code = text; }

    print_task_on(writer: Automata_IO) {
        writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, code_line(this.code));
        writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.TASK, text_line("Task "+this.task_number_in_execution + " / " + this.experiment_definition.tasks.length));
        // writer.overwrite_on_stage(code_line(this.code));
        // writer.overwrite_at_tag("task", text_line("Task "+this.task_number_in_execution + " / " + this.experiment_definition.tasks.length));
    }

    print_between_tasks(writer: Automata_IO) {
        writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(this.after_task_string()));
        // writer.append_on_stage(text_line(this.after_task_string()));
    }

}