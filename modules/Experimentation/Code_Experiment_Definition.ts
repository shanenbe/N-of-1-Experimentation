import {Treatment} from "./Treatment";
import {Code_Task} from "./Task";
import {Experiment_Definition} from "./Experiment_Definition";
import {Book} from "../Books/Book";
import {Experiment_Execution_Forwarder} from "./Experiment_Execution_Forwarder";
import {Sequential_Forwarder_Forwarder} from "../Books/Sequential_Forwarder_Forwarder";
import {Variable} from "./Variable";
import {IO_Object, text_line} from "../Books/IO_Object";
import {Training_Experiment_Execution_Forwarder} from "./Training_Experiment_Execution_Forwarder";
import {
    Automata_IO,
    AUTOMATA_OUTPUT_WRITER_ACTION,
    AUTOMATA_OUTPUT_WRITER_TAGS
} from "../Books/Automata_IO";
import {new_random_integer, SET_SEED} from "./Experimentation";

export function init(){}
export class Code_Experiment_Definition extends Experiment_Definition<Code_Task> {



    create_code_experiment_execution(
                                        introduction_texts:IO_Object[],
                                        seed: string,
                                        pre_run_instructions: IO_Object,
                                        finish_texts: IO_Object[],
                                        output_writer: Automata_IO,
                                        accepted_experiment_responses: string[],
                                        finish_function: (experiment:Experiment_Definition<Code_Task>) => void)
    :Sequential_Forwarder_Forwarder
    {
        let introduction_book = new Book("introduction", introduction_texts, output_writer);

        introduction_book.add_activation_function(()=> {
            output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.TASK, text_line(""));
            output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(""));
        });

        let ending_book = new Book("finish", finish_texts, output_writer);

        ending_book.add_activation_function(()=>{
            output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.TASK, text_line(""));
            output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(""));
        });

        ending_book.automata.add_finish_action(()=>finish_function(experiment_execution_forwarder.experiment_definition));

        let training = new Training_Experiment_Execution_Forwarder<Code_Task>(
                                                     "Training",
                                                                            pre_run_instructions,
                                                                            this.clone(),
                                                                            output_writer,
                                                                            accepted_experiment_responses
                                                                        );



        let experiment_execution_forwarder = new Experiment_Execution_Forwarder<Code_Task>(
                                                                    "Experiment",
                                                                                           seed,
                                                                                           pre_run_instructions,
                                                                                           this,
                                                                                           output_writer,
                                                                                           accepted_experiment_responses
                                                                                          );

        let forwarder = new Sequential_Forwarder_Forwarder(
                                                    [
                                                                introduction_book,
                                                                training,
                                                                experiment_execution_forwarder,
                                                                ending_book
                                                              ]
                                                        );


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

    let experiment_definition = new Code_Experiment_Definition(
                                                                    cfg.experiment_name,
                                                                    cfg.seed,
                                                                    variables,
                                                                    cfg.repetitions,
                                                                    cfg.task_configuration
                                                              );

    let experiment_execution = experiment_definition.create_code_experiment_execution(
                                                                                        cfg.introduction_pages,
                                                                                        cfg.seed,
                                                                                        cfg.pre_run_instructions,
                                                                                        cfg.finish_pages,
                                                                                        cfg.output_object,
                                                                                        cfg.accepted_responses,
                                                                                        cfg.finish_function
                                                                                     );

    return experiment_execution;
}