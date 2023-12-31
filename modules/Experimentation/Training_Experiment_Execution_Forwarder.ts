import {Task} from "./Task.js";
import {create_automata} from "../Automata/Automata_Configurator.js";
import {from} from "../Automata/Transitions.js";
import {Experiment_Definition} from "./Experiment_Definition.js";
import {IO_Object, text_line} from "../Books/IO_Object.js";
import {Automata_IO, AUTOMATA_OUTPUT_WRITER_ACTION, AUTOMATA_OUTPUT_WRITER_TAGS} from "../Books/Automata_IO.js";
import { Automata_With_Output_Forwarder } from "../Books/Automata_With_Output_Forwarder.js";
import {new_random_integer} from "./Experimentation.js";


export class Training_Experiment_Execution_Forwarder<TaskType extends Task> extends  Automata_With_Output_Forwarder{

    current_task_index = 0;
    experiment_definition: Experiment_Definition<TaskType>;

    current_task():TaskType {
        return this.experiment_definition.tasks[this.current_task_index] ;
    };

    start_time = new Date().getTime().valueOf();
    end_time = new Date().getTime().valueOf();
    show_task_function: (t:TaskType)=>void;
    accepted_experiment_responses: string[];

    constructor(
                experiment_automata_name:string,
                pre_run_instructions: IO_Object,
                experiment_definition: Experiment_Definition<TaskType>,
                output_writer: Automata_IO,
                accepted_experiment_responses: string[]
    ) {

        super(experiment_automata_name, output_writer, accepted_experiment_responses, pre_run_instructions);
        this.accepted_experiment_responses = accepted_experiment_responses;
        this.experiment_definition = experiment_definition;

        this.show_task_function = (t:TaskType) => {
            // output_writer.cls();
            t.print_task_on(output_writer)
            this.start_time = new Date().getTime().valueOf();
        }

        this.create_and_init_automata();
        this.set_active();

    }

    private clean_task_in_output() {
        this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE,
            AUTOMATA_OUTPUT_WRITER_TAGS.TASK,
            text_line("")
        );
    }

    private print_finish_training_session_text() {
        this.clean_task_in_output();
        this.output_writer.write(
            AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE,
            AUTOMATA_OUTPUT_WRITER_TAGS.STAGE,
            text_line(
                "You finished this training session.\n\n " +
                "Press [E] (capital E!) if you want to start the experiment.\n\n" +
                "Press [Enter] if you want to do another training session."));
    }

    private print_cancel_text() {
        this.clean_task_in_output();
        this.output_writer.write(
            AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE,
            AUTOMATA_OUTPUT_WRITER_TAGS.STAGE,
            text_line(
                "You cancelled this training session.\n\n " +
                "Press [E] (capital E!) if you want to start with the experiment.\n\n" +
                "Press [Enter] if you want to start with another training session."));
    }

    set_active() {
        console.log("set active was called");
        super.set_active();
        this.experiment_definition.init_experiment("" + new_random_integer(123456789));
        this.current_task_index = 0;
        this.automata.initialize();

        this.output_writer.write(    AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE,
            AUTOMATA_OUTPUT_WRITER_TAGS.STAGE,
            text_line(
                            "The training can be cancelled by pressing [Esc].\n\n" +
                            "The training starts when you press [Return].")
        );

    }

    create_and_init_automata() {

        this.automata = create_automata(
            [0, 1, 2, 3, 4, 5, 6],
            0,
            () => {},
            [
                from(0).to(1)
                    .on("Enter")
                    .do((i:string) => {
                        this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE,
                            AUTOMATA_OUTPUT_WRITER_TAGS.STAGE,this.pre_run_instructions);
                    }),


                from(1).to(2)
                    .on("Enter")
                    .if(() => true)
                    .do((i:string) => {
                        this.current_task().print_task_on(this.output_writer);
                    }),

                from(1).to(5)
                    .on("Escape")
                    .if(() => true)
                    .do((i:string) => {
                        this.print_cancel_text();
                    }),

                from(2).to(3)
                    .on_any(this.accepted_experiment_responses)
                    .if(() => this.current_task_index < this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.current_task().given_answer = i;
                        this.current_task().print_between_tasks(this.output_writer);
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
                        this.current_task().print_task_on(this.output_writer);
                    }),

                from(3).to(5)
                    .on("Escape")
                    .if(() => this.current_task_index < this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.print_cancel_text()
                    }),

                from(2).to(4)
                    .on_any(this.accepted_experiment_responses)
                    .if(() => this.current_task_index == this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.current_task().given_answer = i;
                        this.current_task().print_between_tasks(this.output_writer);
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