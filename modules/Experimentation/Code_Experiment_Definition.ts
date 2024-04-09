import {Treatment} from "./Treatment.js";
import {Task} from "./Task.js";
import {Experiment_Definition} from "./Experiment_Definition.js";
import {Book_Forwarder} from "../Automata_Forwarders/Book_Forwarder.js";
import {Sequential_Forwarder_Forwarder} from "../Books/Sequential_Forwarder_Forwarder.js";
import {Variable} from "./Variable.js";
import {Training_Execution_Forwarder} from "../Automata_Forwarders/Training_Execution_Forwarder.js";
import {Measurement_Type, new_random_integer, Output_Command, SET_SEED} from "./Experimentation.js";
import {Experiment_Forwarder} from "../Automata_Forwarders/Experiment_Forwarder.js";
import {Question, Questionnaire_Forwarder} from "../Automata_Forwarders/Questionnaire_Forwarder.js";

export function init(){}
// TODO: Both classes should be one!!!
export class Code_Experiment_Definition extends Experiment_Definition {


    create_code_all_experiment_automatas(cfg: {
                                                seed: string,
                                                introduction_texts:Output_Command[],
                                                post_questionnaire?: Question[],
                                                pre_run_training_output: Output_Command,
                                                pre_run_experiment_output: Output_Command,
                                                finish_texts: Output_Command[],
                                                measurement: Measurement_Type,
                                                finish_function: (experiment:Experiment_Definition) => void
                                            }
    ) : Sequential_Forwarder_Forwarder
    {

        let output_writer = cfg.measurement.output_writer();

        let introduction_book = new Book_Forwarder("Introduction", cfg.introduction_texts, cfg.measurement);
        let ending_book = new Book_Forwarder("Finish", cfg.finish_texts, cfg.measurement);
        ending_book.automata.add_finish_action(()=>cfg.finish_function(experiment_execution_forwarder.experiment_definition));

        let experiment_execution_forwarder = new Experiment_Forwarder(
            cfg.pre_run_experiment_output,
            this,
            cfg.measurement
        );

        SET_SEED(cfg.seed);
        experiment_execution_forwarder.init_experiment();
        let cloned_experiment_definition = this.clone();

        let training = new Training_Execution_Forwarder(
                                                            cfg.pre_run_training_output,
                                                            cloned_experiment_definition,
                                                            cfg.measurement
                                                       );

        training.experiment_definition.init_experiment();

        let post_questionnaire = null;
        if (cfg.post_questionnaire!=undefined) {
            post_questionnaire = new Questionnaire_Forwarder(cfg.post_questionnaire, cfg.measurement);
        }

        let forwarders = [];
        if (introduction_book != null) {
            forwarders.push(introduction_book);
        }

        forwarders.push(training);
        forwarders.push(experiment_execution_forwarder);

        if (post_questionnaire != null) {
            forwarders.push(post_questionnaire);
            experiment_execution_forwarder.experiment_definition.questionnaires.push(post_questionnaire);
        }
        forwarders.push(ending_book);

        let forwarder = new Sequential_Forwarder_Forwarder(forwarders);
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
                                                        post_questionnaire?: Question[],
                                                        pre_run_training_output: Output_Command,
                                                        pre_run_experiment_output: Output_Command,
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
                                                                                            post_questionnaire: cfg.post_questionnaire,
                                                                                            pre_run_training_output: cfg.pre_run_training_output,
                                                                                            // post_run_training_output: cfg.post_run_training_output,
                                                                                            pre_run_experiment_output: cfg.pre_run_experiment_output,
                                                                                            // post_run_experiment_output: cfg.post_run_experiment_output,
                                                                                            finish_texts: cfg.finish_pages,
                                                                                            measurement: cfg.measurement,
                                                                                            finish_function: cfg.finish_function
                                                                                        }
                                                                                     );

    return experiment_execution;
}