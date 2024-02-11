import {IO_Object, text_line} from "./IO_Object.js";
import {Automata_IO, AUTOMATA_OUTPUT_WRITER_ACTION, AUTOMATA_OUTPUT_WRITER_TAGS} from "./Automata_IO.js";
import {Automata_Forwarder} from "../Automata/Automata_Forwarder.js";
import {Experiment_Output_Writer, Measurement_Type} from "../Experimentation/Experimentation";
export function init(){}

/*
    I don't do anything - I am just a superclass
 */

export abstract class Automata_With_Output_Forwarder extends Automata_Forwarder {

    // output_writer: Automata_IO;
    pre_run_instructions: IO_Object;
    measurement: Measurement_Type;

    // accepted_experiment_responses:
    constructor(
                    forwarder_name: string,
                    measurement: Measurement_Type,
                    pre_run_instructions: IO_Object
               )
    {
        super(forwarder_name);
        this.pre_run_instructions = pre_run_instructions;
        this.measurement = measurement;

        this.add_activation_function(
            () => this.output_writer().print_state(this.forwarder_name)
            // ()=> this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STATE, text_line(this.forwarder_name))
        );

    }

    abstract create_and_init_automata();

    output_writer():Experiment_Output_Writer {
        return this.measurement.output_writer();
    }
}