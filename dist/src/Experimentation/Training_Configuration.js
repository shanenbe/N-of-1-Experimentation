import { Treatment } from "./treatments/Treatment";
import { iterate_both } from "../utils/loops/loop";
import { Task } from "./Task";
import { Treatment_Combination } from "./treatments/Treatment_Combination";
var Training_Configuration = /** @class */ (function () {
    function Training_Configuration(training_configuration) {
        this.can_be_cancelled = true;
        this.can_be_repeated = true;
        if (training_configuration === undefined)
            return;
        if (training_configuration.fixed_treatments != undefined)
            this.fixed_treatments = training_configuration.fixed_treatments;
        this.can_be_cancelled = training_configuration.can_be_cancelled;
        this.can_be_repeated = training_configuration.can_be_repeated;
    }
    Training_Configuration.prototype.init_experiment = function (experiment_definition) {
        experiment_definition.tasks = [];
        if (this.fixed_treatments != undefined) {
            var _loop_1 = function (a_treatment_combination) {
                var treatment_combination = new Treatment_Combination([]);
                iterate_both(experiment_definition.all_independent_variables(), a_treatment_combination, function (variable, value) {
                    treatment_combination.treatment_combination.push(new Treatment(variable, value));
                });
                var task = new Task(treatment_combination, experiment_definition, "");
                task.is_training = true;
                experiment_definition.experiment_definition_task_creator(task);
                experiment_definition.tasks.push(task);
            };
            for (var _i = 0, _a = this.fixed_treatments; _i < _a.length; _i++) {
                var a_treatment_combination = _a[_i];
                _loop_1(a_treatment_combination);
            }
        }
        else {
            experiment_definition.init_experiment(true);
        }
    };
    return Training_Configuration;
}());
export { Training_Configuration };
