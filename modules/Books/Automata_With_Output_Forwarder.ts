import {Automata_Forwarder} from "../Automata/Automata_Forwarder.js";
import {Experiment_Output_Writer, Measurement_Type, Output_Command} from "../Experimentation/Experimentation.js";
import {Automata_Configurator} from "../Automata/Automata_Configurator.js";
import {Automata} from "../Automata/Automata.js";
export function init(){}

/*
    I don't do anything - I am just a superclass
 */

export abstract class Automata_With_Output_Forwarder extends Automata_Forwarder {

    // output_writer: Automata_IO;
    pre_run_instructions: Output_Command;
    post_run_instructions: Output_Command;
    measurement: Measurement_Type;

    set_active() {
        this.show_intro();
    }

    // accepted_experiment_responses:
    constructor(
                    forwarder_name: string,
                    measurement: Measurement_Type,
                    pre_run_instructions: Output_Command,
                    post_run_instructions: Output_Command
               )
    {
        super(forwarder_name);
        this.pre_run_instructions = pre_run_instructions;
        this.post_run_instructions = post_run_instructions;
        this.measurement = measurement;
        //
        // this.add_activation_function(
        //     () => this.output_writer().print_string_to_state(this.forwarder_name)
        //     // ()=> this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STATE, text_line(this.forwarder_name))
        // );
        this.automata = new Automata(this.automata_configurator());
        this.automata.initialize();

    }

    abstract automata_configurator(): Automata_Configurator;

    output_writer():Experiment_Output_Writer {
        return this.measurement.output_writer();
    }

    abstract show_intro();

    abstract show_outro();

    empty_screen_and_show_instructions(command:Output_Command) {
        this.output_writer().clear_stage();
        command();
    }
}