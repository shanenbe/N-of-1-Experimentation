import {Task} from "./Task.js";
import {create_automata} from "../Automata/Automata_Configurator.js";
import {from} from "../Automata/Transitions.js";
import {Experiment_Definition} from "./Experiment_Definition.js";
import { Automata_With_Output_Forwarder } from "../Books/Automata_With_Output_Forwarder.js";
import {Measurement_Type, Output_Command, SET_SEED} from "./Experimentation.js";


let SHOW_INTRO=0;
let SHOW_TASK=1;
let TASK_FINISHED=2;
let TASKS_DONE = 3;

export class Experiment_Execution_Forwarder extends  Automata_With_Output_Forwarder{

    current_task_index = -1;
    experiment_definition: Experiment_Definition;
    seed: string;

    current_task():Task {
        return this.experiment_definition.tasks[this.current_task_index] ;
    };

    constructor(
                experiment_automata_name:string,
                seed: string,
                pre_run_instructions: Output_Command,
                experiment_definition: Experiment_Definition,
                measurement: Measurement_Type
    ) {

        super(experiment_automata_name,
            measurement, pre_run_instructions);
        this.seed = seed;
        this.experiment_definition = experiment_definition;

        SET_SEED(this.seed);
        this.create_automata();
        // this.set_active();

    }

    set_active() {
        this.set_experiment_index(0);
        super.set_active();
    }

    create_automata() {
        this.automata = create_automata(
            [0, 1, 2, 3, 4, 5],
            0,
            () => {},
            [
                from(SHOW_INTRO).to(SHOW_TASK)
                    .on("Enter")
                    .do((i:string) => {
                        this.measurement.start_measurement(this.current_task());
                    }),

                // STATE 1=Task is shown, 2=Input correct
                from(SHOW_TASK).to(TASK_FINISHED)
                    .on_any(this.measurement.accepted_responses())
                    .if((i:string) =>   this.current_task().accepts_answer(i) &&
                                this.current_task_index < this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.measurement.stop_measurement(i, this.current_task());
                    }),

                // Task Shown - Incorrect input => Remain in Task
                from(SHOW_TASK).to(SHOW_TASK)
                    .on_any(this.measurement.accepted_responses())
                    .if((i:string) =>   !this.current_task().accepts_answer(i) )
                    .do((i:string) => {
                        this.measurement.incorrect_response(i, this.current_task());
                    }),

                // Between Tasks to next task
                from(TASK_FINISHED).to(SHOW_TASK)
                    .on("Enter")
                    .if((i:string) => this.current_task_index < this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.inc_current_experiment();
                        this.measurement.start_measurement(this.current_task());
                    }),

                from(SHOW_TASK).to(TASKS_DONE) // State=3: Experiment done - just the message afterwards shown
                    .on_any(this.measurement.accepted_responses())
                    .if((i:string) => this.current_task().accepts_answer(i) &&
                              this.current_task_index == this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.measurement.stop_measurement(i, this.current_task());
                    }),
                //
                // from(4).to(5)
                //     .on("Enter")
                //     .do(() => {
                //         // @ts-ignore
                //         n_of_1_page.clear_screen(); // TODO: THIS SHOULD NOT BE HERE!!! The automata does not know the webpage!
                //     }),
            ],
            [TASKS_DONE]
        );

        this.automata.initialize();
    }

    private set_experiment_index(index:number) {
        this.current_task_index = index;
        this.output_writer().print_string_to_page_number("" + (this.current_task_index + 1) + " / " + this.experiment_definition.tasks.length);
    }
    private inc_current_experiment() {
        this.set_experiment_index(++this.current_task_index);
    }

}