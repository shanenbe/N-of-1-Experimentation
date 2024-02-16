import dummy from "../../modules_hard_import/seedrandom/seedrandom.js";
import {Task} from "./Task.js";
import {convert_string_to_html_string} from "../Utils.js";

export type Output_Command=()=>void;
export function init(){}
export enum VARIABLE_TYPE { STRING = 1, NUMBER }

export function Reaction_Time(input_type: Experiment_Input_Type): Measurement_Type {
    return new Reaction_Time_Measurement(input_type);
};

export function Time_to_finish(input: (writer: Experiment_Output_Writer)=> Experiment_Input_Type): (writer: Experiment_Output_Writer) => Measurement_Type {
    return (writer: Experiment_Output_Writer) => new Time_To_Finish_Measurement(input(writer));
}

export function keys(key_list: string[], output_writer: Experiment_Output_Writer):Experiment_Input_Type {
    return new Key_Pressing(key_list, output_writer);
}

export function text_input(output_writer: Experiment_Output_Writer):Experiment_Input_Type {
    return new Free_Text(output_writer);
}

export abstract class Experiment_Output_Writer {
    abstract print_experiment_name(s: string);

    abstract print_string_to_state(forwarder_name: string);

    abstract clear_stage();

    abstract print_string_on_stage(s: string);
    abstract print_html_on_stage(s: string);
    abstract print_html_on_error(s: string);

    abstract print_error_string_on_stage(error_string: string);

    convert_string_to_html_string(s:string):string {
        return convert_string_to_html_string(s);
    }
    string_page_command(s: string): Output_Command {
        return ()=>this.print_string_on_stage(s);
    }

    stage_string_pages_commands(pages: string[]):Output_Command[] {
        let ret = [];
        for(let a of pages) {
            ret.push(this.string_page_command(a));
        }
        return ret;
    }

    abstract ask_for_input();

    abstract print_string_to_page_number(s:string);

    get_given_answer(input:string):string {
        return input;
    }

    print_on_input_response(given_answer: string) {}
    set_focus_on_input(){}

    abstract clear_state();
}


export abstract class Measurement_Type {
    input_type: Experiment_Input_Type;
    start_time: number;

    constructor(input_type: Experiment_Input_Type) {
        this.input_type = input_type;
    }

    accepted_responses() {
        return this.input_type.accepted_responses();
    }

    given_answer(i: string) {
        return this.input_type.given_answer(i);
    }

    start_measurement(task: Task) {
        this.start_time = new Date().getTime().valueOf();
        task.print_task();
    }

    stop_measurement(input: string, task: Task) {
        let end_time = new Date().getTime().valueOf();
        task.given_answer =  this.input_type.get_given_answer(input);
        task.required_milliseconds = end_time - this.start_time;
        task.do_print_after_task_information();
    }

    incorrect_response(i: string, task: Task) {
        task.do_print_error_message(this.input_type.get_given_answer(i));
    }

    output_writer():Experiment_Output_Writer {
        return this.input_type.output_writer;
    }

    get_given_answer(input:string) {
        return this.input_type.get_given_answer(input);
    }
}

export class Reaction_Time_Measurement extends Measurement_Type {
    constructor(input_type: Experiment_Input_Type) {
        super(input_type);
    }
}
export class Time_To_Finish_Measurement extends Measurement_Type {
    constructor(input_type: Experiment_Input_Type) {
        super(input_type);
    }
}

export abstract class Experiment_Input_Type {

    output_writer: Experiment_Output_Writer;
    abstract accepted_responses():string[];
    abstract given_answer(key_pressed: string);

    constructor(output_writer: Experiment_Output_Writer) {
        this.output_writer = output_writer;
    }

    print_input_request() {
        this.output_writer.ask_for_input();
    }

    get_given_answer(input_string: string) {
        let value = this.output_writer.get_given_answer(input_string);
        return value;
    }
}

export class Key_Pressing extends Experiment_Input_Type {

    accepted_keys: string[];

    constructor(accepted_keys: string[], output_writer: Experiment_Output_Writer) {
        super(output_writer);
        this.accepted_keys = accepted_keys;
    }

    accepted_responses() {
        return this.accepted_keys;
    }

    given_answer(key_pressed: string) {
        return key_pressed;
    }

}

export class Free_Text extends Experiment_Input_Type {

    constructor(output_writer: Experiment_Output_Writer) {
        super(output_writer);
    }

    accepted_responses() {
        return ["Enter"];
    }

    given_answer(key_pressed: string) {

    }
}

class _Random {

    constructor() {
        // @ts-ignore
        Math.seedrandom('1234567890');
    }

// @ts-ignore

    new_random_integer(upper_limit: number): number {
        return Math.trunc(upper_limit * Math.random());
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

export function do_random_array_sort(array:any[]) {
    let copy = [...array];
    let result = [];
    while(copy.length > 0) {
        result.push(copy.splice(new_random_integer(copy.length), 1)[0]);
    }
    return result;
}

export function random_array_element(array:any[]) {
    return array[new_random_integer(array.length)];
}

// This invocation just makes sure that RANDOM is loaded
dummy();
