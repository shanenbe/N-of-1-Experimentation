import {Automata_Configurator, create_automata} from "../Automata/Automata_Configurator.js";
import {from} from "../Automata/Transitions.js";
import {Experimentation_Forwarder} from "./Experimentation_Forwarder.js";
import {Measurement_Type, Output_Command} from "../Experimentation/Experimentation.js";
import {Experiment_Definition} from "../Experimentation/Experiment_Definition.js";

let SHOW_INTRO = 0;
let SHOW_TASK = 1;
let TASK_FINISHED = 2;
let CURRENT_TRAINING_SESSION_FINISHED = 3;
let EVERYTHING_DONE = 6;
let ESCAPED = 5;


export class Training_Execution_Forwarder extends  Experimentation_Forwarder{


    constructor(pre_run_instructions: Output_Command,
                experiment_definition: Experiment_Definition,
                measurement: Measurement_Type)
    {
        super(
            "Training",
            ()=> {
                pre_run_instructions();
                measurement.output_writer().print_html_on_stage("<hr>" +
                    "Press [Enter] to start training.");
            },
            ()=> {
                measurement.output_writer().print_html_on_stage(
                    "You finished the training phase.<hr>" +
                    "Please, press [Enter] to run again a training session.<br>" +
                    "Please, press [E] (capital E!) to enter the experiment phase."
                )},
            experiment_definition,
            measurement);
    }

    print_cancel_text() {
        this.output_writer().clear_stage();
        this.output_writer().print_string_to_page_number("Cancelled");

        let navigation_string =
            "You cancelled this training session.<hr>" +
            "Press [Enter] if you want to start another training session.<br>" +
            "Press [E] (capital E!) if you want to start with the experiment."

        this.output_writer().print_html_on_stage(navigation_string);
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
                    .if(() => this.current_page_index < this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.print_cancel_text();
                    }),

                from(ESCAPED).to(EVERYTHING_DONE)
                    .on("E").do(() => {

                    }),

                from(ESCAPED).to(SHOW_INTRO)
                    .on("Enter").do(() => {
                        this.experiment_definition.init_experiment();
                        this.show_intro();
                }),


                from(CURRENT_TRAINING_SESSION_FINISHED).to(SHOW_INTRO)
                    .on("Enter").do(() => {
                        this.experiment_definition.init_experiment();
                        this.show_intro();
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

}