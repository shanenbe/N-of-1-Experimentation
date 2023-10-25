import {Code_Task, Task} from "./Task";
import {create_automata} from "../Automata/Automata_Configurator";
import {from} from "../Automata/Transitions";
import {Experiment_Definition} from "./Experiment_Definition";
import {IO_Object, text_line} from "../Books/IO_Object";
import {Automata_IO, AUTOMATA_OUTPUT_WRITER_ACTION, AUTOMATA_OUTPUT_WRITER_TAGS} from "../Books/Automata_IO";
import { Automata_With_Output_Forwarder } from "../Books/Automata_With_Output_Forwarder";
import {SET_SEED} from "./Experimentation";


export class Experiment_Execution_Forwarder<TaskType extends Task> extends  Automata_With_Output_Forwarder{

    current_task_index = 0;
    experiment_definition: Experiment_Definition<TaskType>;
    seed: string;

    current_task():TaskType {
        return this.experiment_definition.tasks[this.current_task_index] ;
    };

    start_time = null;
    end_time = null;

    constructor(
                experiment_automata_name:string,
                seed: string,
                pre_run_instructions: IO_Object,
                experiment_definition: Experiment_Definition<TaskType>,
                output_writer: Automata_IO,
                accepted_experiment_responses: string[]
    ) {

        super(experiment_automata_name, output_writer, accepted_experiment_responses, pre_run_instructions);

        this.experiment_definition = experiment_definition;

        this.seed = seed;
        this.create_and_init_automata();
        this.set_active();

    }

    set_active() {
        this.current_task_index = 0;
        super.set_active();
        SET_SEED(this.seed);
        this.output_writer.write(
            AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE,
            AUTOMATA_OUTPUT_WRITER_TAGS.STAGE,
            this.pre_run_instructions
        );

    }

    create_and_init_automata() {
        this.automata = create_automata(
            [0, 1, 2, 3, 4],
            0,
            () => {},
            [
                from(0).to(1)
                    .on("Enter")
                    .do((i:string) => {
                        this.start_time = new Date().getTime().valueOf();
                        this.current_task().print_task_on(this.output_writer);
                    }),


                from(1).to(2)
                    .on_any(this.accepted_experiment_responses)
                    .if(() => this.current_task_index < this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.end_time = new Date().getTime().valueOf();
                        this.current_task().given_answer=i;
                        this.current_task().required_miliseconds = this.end_time - this.start_time;
                        this.current_task().print_between_tasks(this.output_writer);
                    }),

                from(2).to(1)
                    .on("Enter")
                    .if(() => this.current_task_index < this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.start_time = new Date().getTime().valueOf();
                        this.current_task_index++;
                        this.current_task().print_task_on(this.output_writer);
                    }),

                from(1).to(3)
                    .on_any(this.accepted_experiment_responses)
                    .if(() => this.current_task_index == this.experiment_definition.tasks.length-1)
                    .do((i:string) => {
                        this.end_time = new Date().getTime().valueOf();
                        this.current_task().given_answer=i;
                        this.current_task().required_miliseconds = this.end_time - this.start_time;
                        this.current_task().print_between_tasks(this.output_writer);
                    }),

                from(3).to(4)
                    .on("Enter")
                    .do(() => {
                        this.output_writer.write(    AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE,
                            AUTOMATA_OUTPUT_WRITER_TAGS.TASK,
                            text_line("")
                        );
                    }),
            ],
            [4]
        );

        this.automata.initialize();
    }


}