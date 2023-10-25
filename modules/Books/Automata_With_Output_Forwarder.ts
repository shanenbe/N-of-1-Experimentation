import {Automata} from "../Automata/Automata";
import {IO_Object, text_line} from "./IO_Object";
import {Automata_IO, AUTOMATA_OUTPUT_WRITER_ACTION, AUTOMATA_OUTPUT_WRITER_TAGS} from "./Automata_IO";
import {Automata_Forwarder} from "../Automata/Automata_Forwarder";
export function init(){}

/*
    I don't do anything - I am just a superclass
 */

export abstract class Automata_With_Output_Forwarder extends Automata_Forwarder {

    output_writer: Automata_IO;
    pre_run_instructions: IO_Object;
    accepted_experiment_responses: string[];

    // accepted_experiment_responses:
    constructor(
                    forwarder_name: string,
                    output_writer:Automata_IO,
                    accepted_experiment_responses: string[],
                    pre_run_instructions: IO_Object
               )
    {
        super(forwarder_name);
        this.output_writer = output_writer;
        this.pre_run_instructions = pre_run_instructions;
        this.accepted_experiment_responses = accepted_experiment_responses;

        this.add_activation_function(
            ()=> this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STATE, text_line(this.forwarder_name))
        );

    }

    abstract create_and_init_automata();
}