import dummy from "../../modules_hard_import/seedrandom/seedrandom.js";
import {guarantee_test, guarantee_true} from "../Utils.js";
import {Code_Experiment_Definition, create_code_experiment_execution} from "./Code_Experiment_Definition.js";
import {Code_Task} from "./Task.js";
import {Experiment_Execution_Forwarder} from "./Experiment_Execution_Forwarder.js";
import {Book} from "../Books/Book.js";
import {text_as_pages, text_line, text_pages} from "../Books/IO_Object.js";
import {Simplified_IO} from "../Books/Automata_IO.js";
export function init(){}
export enum VARIABLE_TYPE { STRING = 1, NUMBER }

dummy();

// function random_generator(a:string) {
//     return ()=>Math.random();
// }

class _Random {

    constructor() {
        // @ts-ignore
        Math.seedrandom('1234567890');
    }

// @ts-ignore
    generator = Math.random;

    new_random_integer(upper_limit: number): number {
        return Math.trunc(upper_limit * this.generator());
    }

    set_seed(seed: string) {
        // @ts-ignore
        Math.seedrandom(seed);
    }
}

export const Random = new _Random();
export function SET_SEED(seed: string) {
    Random.set_seed(seed);
}

export function new_random_integer(upper_limit: number): number {
    return Random.new_random_integer(upper_limit);
}
export function Experimentation_Tests() {
    Experimentation_Tests_02();
    Experimentation_Tests_01();
}

function Experimentation_Tests_02() {
    let string_output = new Simplified_IO();
    let example_code_reading_experiment = create_code_experiment_execution(
        {
            experiment_name: "test",
            seed: "42",
            introduction_pages: text_pages(["blabla", "another blabla"]),
            pre_run_instructions: text_line("blabla"),
            finish_pages: text_as_pages("thanks"),
            layout: [{
                variable: "Counter",
                treatments: ["1", "2", "3", "4", "5"]
            }],
            repetitions: 1,
            task_configuration: (t: Code_Task) => {
                t.code = "Task " + t.treatment_combination[0].value;
                t.after_task_string = () => { return "Done " + t.code };
            },
            output_object: string_output,
            accepted_responses: ["1", "2", "3"],
            finish_function: () => {}
        }
    );

    let introduction_fowarder = (example_code_reading_experiment.forwarders[0] as Book);
    let experiment_definition = (example_code_reading_experiment.forwarders[1] as Experiment_Execution_Forwarder<Code_Task>).experiment_definition;

    guarantee_true(introduction_fowarder.current_page==0);
    example_code_reading_experiment.input("Enter")


}
function Experimentation_Tests_01() {
    let string_output = new Simplified_IO();
    let example_code_reading_experiment = create_code_experiment_execution(
                                                                            {
                                                                                    experiment_name: "test",
                                                                                    seed: "42",
                                                                                    introduction_pages: text_as_pages("blabla"),
                                                                                    pre_run_instructions: text_line("blabl"),
                                                                                    finish_pages: text_as_pages("thanks"),
                                                                                    // final_instructions: ["finally"],
                                                                                    layout: [{
                                                                                        variable: "Counter",
                                                                                        treatments: ["1", "2", "3", "4", "5"]
                                                                                    }],
                                                                                    repetitions: 1,
                                                                                    task_configuration: (t: Code_Task) => {
                                                                                        t.code = "Task " + t.treatment_combination[0].value;
                                                                                        t.after_task_string = () => { return "Done " + t.code };
                                                                                    },
                                                                                    output_object: string_output,
                                                                                    accepted_responses: ["1", "2", "3"],
                                                                                    finish_function: (exp:Code_Experiment_Definition) => {}
                                                                                }
                                                                            );

    let experiment_definition = (example_code_reading_experiment.forwarders[1] as Experiment_Execution_Forwarder<Code_Task>).experiment_definition;
    let t: (n:number)=>Code_Task = (n:number)=>experiment_definition.tasks[n];

    let output_1:string = t(0).code;
    let between_1:string = t(0).after_task_string();

    let output_2:string = t(1).code;
    let between_2:string = t(1).after_task_string();

    let output_3:string = t(2).code;
    let between_3:string = t(2).after_task_string();

    let output_4:string = t(3).code;
    let between_3$:string = t(3).after_task_string();

    let output_5:string = t(4).code;
    let between_5:string = t(4).after_task_string();


    guarantee_true(string_output.output_string == "blabla");
    example_code_reading_experiment.input("Enter")
    guarantee_true(string_output.output_string == output_1);
    example_code_reading_experiment.input("Enter")
    guarantee_true(string_output.output_string == output_1);
    example_code_reading_experiment.input("1")
    guarantee_true(string_output.output_string == between_1);
    example_code_reading_experiment.input("Enter")
    guarantee_true(string_output.output_string == output_2);

    example_code_reading_experiment.input_sequence(["2", "Enter", "1", "Enter", "1", "Enter", "1"]);

    guarantee_true(string_output.output_string == between_5);

}