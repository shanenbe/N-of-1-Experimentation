import { Treatments_Combinator } from "../treatments/Treatments_Combinator";
import { Code_Experiment_Definition } from "../Code_Experiment_Definition";
import { Training_Configuration } from "../Training_Configuration";
import { Independent_Variables } from "../treatments/Independent_Variables";
export function create_code_experiment_execution(cfg) {
    var variables = Independent_Variables.from_layout(cfg.layout);
    var all_treatment_combinations = new Treatments_Combinator(variables, cfg.repetitions);
    var experiment_definition = new Code_Experiment_Definition(cfg.experiment_name, false, all_treatment_combinations, variables, cfg.repetitions, cfg.measurement, cfg.task_configuration);
    var training_configuration = new Training_Configuration(cfg.training_configuration);
    var experiment_execution = experiment_definition.create_code_all_experiment_automatas({
        seed: cfg.seed,
        introduction_texts: cfg.introduction_pages,
        post_questionnaire: cfg.post_questionnaire,
        pre_run_training_output: cfg.pre_run_training_output,
        training_configuration: training_configuration,
        // post_run_training_output: cfg.post_run_training_output,
        pre_run_experiment_output: cfg.pre_run_experiment_output,
        // post_run_experiment_output: cfg.post_run_experiment_output,
        finish_texts: cfg.finish_pages,
        measurement: cfg.measurement,
        finish_function: cfg.finish_function
    });
    return experiment_execution;
}
