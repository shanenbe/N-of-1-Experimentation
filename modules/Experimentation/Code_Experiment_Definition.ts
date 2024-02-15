import {Treatment} from "./Treatment.js";
import {Task} from "./Task.js";
import {Experiment_Definition} from "./Experiment_Definition.js";
import {Book} from "../Automat_Forwarders/Book.js";
import {Experiment_Execution_Forwarder} from "../Automat_Forwarders/Experiment_Execution_Forwarder.js";
import {Sequential_Forwarder_Forwarder} from "../Books/Sequential_Forwarder_Forwarder.js";
import {Variable} from "./Variable.js";
// import {Information, Input_Object, Output_Command, text_line} from "../Books/Output_Command.js";
import {Training_Execution_Forwarder} from "../Automat_Forwarders/Training_Execution_Forwarder.js";
// import {
//     Automata_IO,
//     AUTOMATA_OUTPUT_WRITER_ACTION,
//     AUTOMATA_OUTPUT_WRITER_TAGS
// } from "../Books/Automata_IO.js";
import {Measurement_Type, new_random_integer, Output_Command, SET_SEED} from "./Experimentation.js";

export function init(){}
// TODO: Both classes should be one
export class Code_Experiment_Definition extends Experiment_Definition {


    create_code_all_experiment_automatas(cfg: {
                                                seed: string,
                                                introduction_texts:Output_Command[],
                                                // questionnaire?: Input_Object[],
                                                pre_run_training_output: Output_Command,
                                                post_run_training_output: Output_Command,
                                                pre_run_experiment_output: Output_Command,
                                                post_run_experiment_output: Output_Command,
                                                finish_texts: Output_Command[],
                                                measurement: Measurement_Type,
                                                finish_function: (experiment:Experiment_Definition) => void
                                            }
    ) : Sequential_Forwarder_Forwarder
    {

        let output_writer = cfg.measurement.output_writer();

        let introduction_book = new Book("introduction", cfg.introduction_texts, cfg.measurement);

        // introduction_book.add_activation_function(()=> {
            // TODO: Clean screen
            // cfg.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.TASK, text_line(""));
            // cfg.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(""));
        // });

        // let ending_book = new Book("finish", cfg.finish_texts, cfg.measurement);


        // ending_book.add_activation_function(()=>{
        //     // TODO: Clean screen
        //     // cfg.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.TASK, text_line(""));
        //     // cfg.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(""));
        // });


        let experiment_execution_forwarder = new Experiment_Execution_Forwarder(
            this.experiment_name,
            cfg.pre_run_experiment_output,
            cfg.post_run_experiment_output,
            this,
            cfg.measurement
        );

        SET_SEED(cfg.seed);
        experiment_execution_forwarder.init_experiment();

        experiment_execution_forwarder.automata.add_finish_action(()=>cfg.finish_function(experiment_execution_forwarder.experiment_definition));

        let cloned_experiment_definition = this.clone();

        let training = new Training_Execution_Forwarder(
                                                     "Training",
                                                                            cfg.pre_run_training_output,
                                                                            cfg.post_run_training_output,
                                                                            cloned_experiment_definition,
                                                                            cfg.measurement
                                                                        );

        training.experiment_definition.init_experiment();

        let forwarder = undefined;
        // let output_writer = cfg.measurement.output_writer();
        // if (cfg.questionnaire!=undefined) {
        //     let questionnaire_book = new Questionnaire("questionnaire", cfg.questionnaire, cfg.measurement);
        //
        //     // add questionnaire to experiment.
        //     this.questionnaire_responses = cfg.questionnaire.filter((e: Input_Object)=> !(e instanceof Information)).map((e: Input_Object)=>e.variable);
        //
        //     questionnaire_book.add_activation_function(()=>{
        //         output_writer.clear_stage();
        //         output_writer.set_task();
        //
        //     });
        //
        //     forwarder = new Sequential_Forwarder_Forwarder(
        //         [
        //             introduction_book,
        //             training,
        //             questionnaire_book,
        //             experiment_execution_forwarder,
        //             ending_book
        //         ]
        //     );
        // } else {
            forwarder = new Sequential_Forwarder_Forwarder(
                [
                    introduction_book,
                    training,
                    experiment_execution_forwarder,
                    // ending_book
                ]
            );

        // }
        return forwarder;

    }

    // WHATEVER HAPPENS ON EARTH - THIS SHOULD ONLY BE USED FOR TRAINING!
    private clone():Code_Experiment_Definition {

        let clone = new Code_Experiment_Definition  (
                                                        this.template.experiment_name,
                                                        this.template.variables,
                                                        this.template.repetitions,
                                                        this.measurement,
                                                        this.template.task_creator
                                                    );

        return clone;

    }

    create_Task(
        treatment_combination: Treatment[]
    )
        : Task
    {
        return new Task(treatment_combination, this, "");
    }

}

export function create_code_experiment_execution(cfg:
                                                    {
                                                        experiment_name     :string,
                                                        seed                :string,
                                                        introduction_pages  :Output_Command[],
                                                        // questionnaire?: Input_Object[],
                                                        pre_run_training_output: Output_Command,
                                                        post_run_training_output: Output_Command,
                                                        pre_run_experiment_output: Output_Command,
                                                        post_run_experiment_output: Output_Command,
                                                        finish_pages        :Output_Command[],
                                                        layout              :{
                                                                                variable: string,
                                                                                treatments: string[]
                                                                             }[],
                                                        repetitions         :number,
                                                        task_configuration  :(task:Task) =>void,
                                                        measurement         :Measurement_Type,
                                                        finish_function     :(experiment:Experiment_Definition)=>void
                                                    }
                                                 )
:Sequential_Forwarder_Forwarder
{
    let variables: Variable[] = [];
    for(let aVar of cfg.layout) {
        variables.push(new Variable(aVar.variable, aVar.treatments))
    }

    let experiment_definition = new Code_Experiment_Definition(
                                                                    cfg.experiment_name,
                                                                    variables,
                                                                    cfg.repetitions,
                                                                    cfg.measurement,
                                                                    cfg.task_configuration,
                                                              );

    let experiment_execution = experiment_definition.create_code_all_experiment_automatas(
                                                                                    {
                                                                                            seed: cfg.seed,
                                                                                            introduction_texts: cfg.introduction_pages,
                                                                                            // questionnaire: cfg.questionnaire,
                                                                                            pre_run_training_output: cfg.pre_run_training_output,
                                                                                            post_run_training_output: cfg.post_run_training_output,
                                                                                            pre_run_experiment_output: cfg.pre_run_experiment_output,
                                                                                            post_run_experiment_output: cfg.post_run_experiment_output,
                                                                                            finish_texts: cfg.finish_pages,
                                                                                            measurement: cfg.measurement,
                                                                                            finish_function: cfg.finish_function
                                                                                        }
                                                                                     );

    return experiment_execution;
}