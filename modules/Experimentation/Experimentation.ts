import dummy from "../../modules_hard_import/seedrandom/seedrandom.js";
import {Task} from "./Task.js";
import {Browser_Output_Writer} from "./Browser_Output_Writer.js";

export function init(){}
export enum VARIABLE_TYPE { STRING = 1, NUMBER }

export function Reaction_Time(input_type: Experiment_Input_Type): Measurement_Type {
    return new Reaction_Time_Measurement(input_type);
};

export function Time_to_finish(input: (writer: Experiment_Output_Writer)=> Experiment_Input_Type): (writer: Experiment_Input_Type) => Measurement_Type {
    return (writer: Experiment_Input_Type) => new Time_To_Finish_Measurement(writer);
}

export function keys(key_list: string[], output_writer: Experiment_Output_Writer):Experiment_Input_Type {
    return new Key_Pressing(key_list, output_writer);
}

export function text_input(output_writer: Experiment_Output_Writer):Experiment_Input_Type {
    return new Free_Text(output_writer);
}

export abstract class Experiment_Output_Writer {
    abstract print_experiment_name();

    abstract print_state(forwarder_name: string);

    abstract clear_stage();

    abstract print_string_on_stage(youCanGoOnByPressingEnter: string);

    abstract print_error_on_stage(pleaseAnswerTheQuestion: string);

    abstract set_task();
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
    }

    stop_measurement(input: string, task: Task) {
        let end_time = new Date().getTime().valueOf();
        task.given_answer= this.given_answer(input);
        task.required_miliseconds = end_time - this.start_time;
    }

    incorrect_response(i: string, task: Task) {
        
    }

    output_writer():Experiment_Output_Writer {
        return this.input_type.output_writer;
    }
}

export class Reaction_Time_Measurement extends Measurement_Type {}
export class Time_To_Finish_Measurement extends Measurement_Type {}

export abstract class Experiment_Input_Type {

    output_writer: Experiment_Output_Writer;
    abstract accepted_responses():string[];
    abstract given_answer(key_pressed: string);

    constructor(output_writer: Experiment_Output_Writer) {
        this.output_writer = output_writer;
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

dummy();
