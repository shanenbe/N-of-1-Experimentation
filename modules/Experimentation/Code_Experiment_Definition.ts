import {Treatment} from "./Treatment.js";
import {Code_Task} from "./Task.js";
import {Experiment_Definition} from "./Experiment_Definition.js";
import {Book} from "../Books/Book.js";
import {Experiment_Execution_Forwarder} from "./Experiment_Execution_Forwarder.js";
import {Sequential_Forwarder_Forwarder} from "../Books/Sequential_Forwarder_Forwarder.js";
import {Variable} from "./Variable.js";
import {Input_Object, IO_Object, text_line} from "../Books/IO_Object.js";
import {Training_Experiment_Execution_Forwarder} from "./Training_Experiment_Execution_Forwarder.js";
import {
    Automata_IO,
    AUTOMATA_OUTPUT_WRITER_ACTION,
    AUTOMATA_OUTPUT_WRITER_TAGS
} from "../Books/Automata_IO.js";
import {new_random_integer, SET_SEED} from "./Experimentation.js";
import {create_browser_questionnaire} from "./functions/Browser_Questionnaire";
import {Questionnaire} from "../Books/Questionnaire.js";

export function init(){}
export class Code_Experiment_Definition extends Experiment_Definition<Code_Task> {


    create_code_experiment_execution( cfg: {
                                                seed: string,
                                                introduction_texts:IO_Object[],
                                                questionnaire?: Input_Object[],
                                                pre_run_instructions: IO_Object,
                                                finish_texts: IO_Object[],
                                                output_writer: Automata_IO,
                                                accepted_experiment_responses: string[],
                                                finish_function: (experiment:Experiment_Definition<Code_Task>) => void
                                            }
    ) : Sequential_Forwarder_Forwarder
    {
        let introduction_book = new Book("introduction", cfg.introduction_texts, cfg.output_writer);

        introduction_book.add_activation_function(()=> {
            cfg.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.TASK, text_line(""));
            cfg.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(""));
        });

        let ending_book = new Book("finish", cfg.finish_texts, cfg.output_writer);


        ending_book.add_activation_function(()=>{
            cfg.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.TASK, text_line(""));
            cfg.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(""));
        });


        let experiment_execution_forwarder = new Experiment_Execution_Forwarder<Code_Task>(
            "Experiment",
            cfg.seed,
            cfg.pre_run_instructions,
            this,
            cfg.output_writer,
            cfg.accepted_experiment_responses
        );

        ending_book.automata.add_finish_action(()=>cfg.finish_function(experiment_execution_forwarder.experiment_definition));

        let training = new Training_Experiment_Execution_Forwarder<Code_Task>(
                                                     "Training",
                                                                            cfg.pre_run_instructions,
                                                                            this.clone(),
                                                                            cfg.output_writer,
                                                                            cfg. accepted_experiment_responses
                                                                        );
        let forwarder = undefined;

        if (cfg.questionnaire!=undefined) {
            let questionnaire_book = new Questionnaire("questionnaire", cfg.questionnaire, cfg.output_writer);
            questionnaire_book.add_activation_function(()=>{
                cfg.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.TASK, text_line(""));
                cfg.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(""));
            });

            forwarder = new Sequential_Forwarder_Forwarder(
                [
                    introduction_book,
                    training,
                    questionnaire_book,
                    experiment_execution_forwarder,
                    ending_book
                ]
            );
        } else {
            forwarder = new Sequential_Forwarder_Forwarder(
                [
                    introduction_book,
                    training,
                    experiment_execution_forwarder,
                    ending_book
                ]
            );

        }
        return forwarder;

    }

    // WHATEVER HAPPENS ON EARTH - THIS SHOULD ONLY BE USED FOR TRAINING!
    private clone():Code_Experiment_Definition {

        let clone = new Code_Experiment_Definition  (
                                                        this.template.experiment_name,
                                                "" + new_random_integer(123456789),
                                                        this.template.variables,
                                                        this.template.repetitions,
                                                        this.template.task_creator
                                                    );

        return clone;

    }

    create_Task(
        treatment_combination: Treatment[]
    )
        : Code_Task
    {
        return new Code_Task(treatment_combination, this, "");
    }

}

export function create_code_experiment_execution(cfg:
                                                    {
                                                        experiment_name     :string,
                                                        seed                :string,
                                                        introduction_pages  :IO_Object[],
                                                        questionnaire?: Input_Object[],
                                                        pre_run_instructions: IO_Object,
                                                        finish_pages        :IO_Object[],
                                                        layout              :{
                                                                                variable: string,
                                                                                treatments: string[]
                                                                             }[],
                                                        repetitions         :number,
                                                        task_configuration  :(task:Code_Task) =>void,
                                                        output_object       :Automata_IO
                                                        accepted_responses  :string[]
                                                        finish_function     :(experiment:Experiment_Definition<Code_Task>)=>void
                                                    }
                                                 )
:Sequential_Forwarder_Forwarder
{
    let variables: Variable[] = [];
    for(let aVar of cfg.layout) {
        variables.push(new Variable(aVar.variable, aVar.treatments))
    }

    // if (cfg.questionnaire != undefined) {
    //     for(let aVar of cfg.questionnaire) {
    //         variables.push(new Variable(aVar.))
    //     }
    // }
    //
    let experiment_definition = new Code_Experiment_Definition(
                                                                    cfg.experiment_name,
                                                                    cfg.seed,
                                                                    variables,
                                                                    cfg.repetitions,
                                                                    cfg.task_configuration
                                                              );

    let experiment_execution = experiment_definition.create_code_experiment_execution(
                                                                                    {
                                                                                            seed: cfg.seed,
                                                                                            introduction_texts: cfg.introduction_pages,
                                                                                            questionnaire: cfg.questionnaire,
                                                                                            pre_run_instructions: cfg.pre_run_instructions,
                                                                                            finish_texts: cfg.finish_pages,
                                                                                            output_writer: cfg.output_object,
                                                                                            accepted_experiment_responses: cfg.accepted_responses,
                                                                                            finish_function: cfg.finish_function
                                                                                        }
                                                                                     );

    return experiment_execution;
}