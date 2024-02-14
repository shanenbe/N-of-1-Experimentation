import {Automata_Configurator, create_automata} from "../Automata/Automata_Configurator.js";
import {from} from "../Automata/Transitions.js";
import {Experiment_Execution_Forwarder} from "./Experiment_Execution_Forwarder.js";

let SHOW_INTRO = 0;
let SHOW_TASK = 1;
let TASK_FINISHED = 2;
let CURRENT_TRAINING_SESSION_FINISHED = 3;
let EVERYTHING_DONE = 6;
// let CURRENT_TRAINING_SESSION_FINISHED = 4;
let ESCAPED = 5;


export class Training_Execution_Forwarder extends  Experiment_Execution_Forwarder{

    print_cancel_text() {
        this.output_writer().clear_stage();
        this.output_writer().print_string_to_page_number("Cancelled");
        let converted_string = this.output_writer().convert_string_to_html_string(
            "You cancelled this training session.\n\n" +
            "Press [E] (capital E!) if you want to start with the experiment.\n\n" +
            "Press [Enter] if you want to start with another training session."
        );
        this.output_writer().print_string_on_stage(converted_string);
    }

    automata_configurator() {
        return new Automata_Configurator(
            [SHOW_INTRO, SHOW_TASK, TASK_FINISHED, CURRENT_TRAINING_SESSION_FINISHED, CURRENT_TRAINING_SESSION_FINISHED, ESCAPED, EVERYTHING_DONE],
            SHOW_INTRO,
            () => {},
            this.transitions(),
            [EVERYTHING_DONE]
        );
    }

    transitions() {
        let experiment_transitions = super.transitions();
        let this_transitions = [
                from(SHOW_INTRO).to(ESCAPED)
                    .on("Escape")
                    .if(() => true)
                    .do((i:string) => {
                        this.print_cancel_text();
                    }),

                from(SHOW_TASK).to(ESCAPED)
                    .on("Escape")
                    .do((i:string) => {
                        this.print_cancel_text();
                    }),

                from(TASK_FINISHED).to(ESCAPED)
                    .on("Escape")
                    .if(() => this.current_task_index < this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.print_cancel_text();
                    }),

                from(ESCAPED).to(EVERYTHING_DONE)
                    .on("E").do(() => {

                    }),

                from(ESCAPED).to(SHOW_TASK)
                    .on("Enter").do(() => {

                    this.experiment_definition.init_experiment();
                    this.set_experiment_index(0);
                    this.measurement.start_measurement(this.current_task());

                }),


                from(CURRENT_TRAINING_SESSION_FINISHED).to(SHOW_TASK)
                    .on("Enter").do(() => {
                        this.experiment_definition.init_experiment();
                        this.set_experiment_index(0);
                        this.measurement.start_measurement(this.current_task());
                    }
                ),

                from(CURRENT_TRAINING_SESSION_FINISHED).to(EVERYTHING_DONE)
                    .on("E")
                    .do((i:string) => {})


            ];
        experiment_transitions.splice(experiment_transitions.length-1);
        this_transitions.forEach((e)=>experiment_transitions.push(e));
        return experiment_transitions;
    }

    input(s: string) {
        if(s=="X")
            console.log("dummy");
        this.automata.input(s);
    }
}