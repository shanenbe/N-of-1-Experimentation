import {Task} from "./Task.js";
import {create_automata} from "../Automata/Automata_Configurator.js";
import {from} from "../Automata/Transitions.js";
import {Experiment_Definition} from "./Experiment_Definition.js";
import { Automata_With_Output_Forwarder } from "../Books/Automata_With_Output_Forwarder.js";
import {Measurement_Type, new_random_integer, Output_Command} from "./Experimentation.js";


export class Training_Experiment_Execution_Forwarder extends  Automata_With_Output_Forwarder{

    current_task_index = 0;
    experiment_definition: Experiment_Definition;

    current_task():Task {
        return this.experiment_definition.tasks[this.current_task_index] ;
    };

    start_time = new Date().getTime().valueOf();
    end_time = new Date().getTime().valueOf();
    show_task_function: (t:Task)=>void;


    constructor(
                experiment_automata_name:string,
                pre_run_instructions: Output_Command,
                experiment_definition: Experiment_Definition,
                // output_writer: Automata_IO,
                measurement: Measurement_Type
    ) {

        super(experiment_automata_name, measurement, pre_run_instructions);
        this.experiment_definition = experiment_definition;

        this.show_task_function = (t:Task) => {
            t.do_print_task();
            // output_writer.cls();
            // t.print_task(output_writer)
            // this.start_time = new Date().getTime().valueOf();
        }

        this.create_automata();
        this.set_active();

    }

    private clean_task_in_output() {
        this.output_writer().clear_stage();
    }

    private print_finish_training_session_text() {
        this.output_writer().clear_stage();
        this.output_writer().print_string_on_stage(
                                                    "You finished this training session.\n\n " +
                                                    "Press [E] (capital E!) if you want to start the experiment.\n\n" +
                                                    "Press [Enter] if you want to do another training session."
                                                  );
    }

    private print_cancel_text() {
        this.output_writer().clear_stage();
        this.output_writer().print_string_on_stage(
            "You cancelled this training session.\n\n " +
            "Press [E] (capital E!) if you want to start with the experiment.\n\n" +
            "Press [Enter] if you want to start with another training session."
        );
    }

    set_active() {
        console.log("set active was called");
        super.set_active();
        this.experiment_definition.init_experiment("" + new_random_integer(123456789));
        this.current_task_index = 0;
        this.automata.initialize();

        this.output_writer().clear_stage();
        this.output_writer().print_string_on_stage(
                            "The training can be cancelled by pressing [Esc].\n\n" +
                                                    "The training starts when you press [Return]."
                                                  );
    }

    create_automata() {

        this.automata = create_automata(
            [0, 1, 2, 3, 4, 5, 6],
            0,
            () => {},
            [
                from(0).to(1)
                    .on("Enter")
                    .do((i:string) => {
                        // TODO: Print prerun instructions
                        // this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE,
                        //     AUTOMATA_OUTPUT_WRITER_TAGS.STAGE,this.pre_run_instructions);
                    }),


                from(1).to(2)
                    .on("Enter")
                    .if(() => true)
                    .do((i:string) => {
                        this.current_task().do_print_task()
                    }),

                from(1).to(5)
                    .on("Escape")
                    .if(() => true)
                    .do((i:string) => {
                        this.print_cancel_text();
                    }),

                from(2).to(3)
                    .on_any(this.measurement.accepted_responses())
                    .if((i:string) =>   this.current_task().accepts_answer(i) &&
                                this.current_task_index < this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.current_task().given_answer = i;
                        this.current_task().do_print_after_task_information();
                    }),

                from(2).to(2)
                    .on_any(this.measurement.accepted_responses())
                    .if((i:string) =>   !this.current_task().accepts_answer(i) )
                    .do((i:string) => {
                        this.current_task().do_print_error_message(i);
                    }),

                from(2).to(5)
                    .on("Escape")
                    .if(() => this.current_task_index < this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.print_cancel_text();
                    }),

                from(3).to(2)
                    .on("Enter")
                    .if(() => this.current_task_index < this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.current_task_index++;
                        this.current_task().do_print_task();
                    }),

                from(3).to(5)
                    .on("Escape")
                    .if(() => this.current_task_index < this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.print_cancel_text()
                    }),

                from(2).to(4)
                    .on_any(this.measurement.accepted_responses())
                    .if((i:string) => this.current_task().accepts_answer(i) &&
                              this.current_task_index == this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.current_task().given_answer = i;
                        this.current_task().do_print_after_task_information();
                    }),

                from(4).to(6).on("Enter").do(() => {
                    this.print_finish_training_session_text();}
                ),

                from(6).to(7).on("E").do(() => {}),

                from(6).to(0).on("Enter").do(() => {this.set_active()}),

                from(4).to(5).on("Escape").do(() => {
                    this.print_cancel_text();
                }),

                from(5).to(7).on("E").do(() => {}),

                from(5).to(0).on("Enter").do(() => {this.set_active()}),
            ],
            [7]
        );

        this.automata.initialize();

    }

}