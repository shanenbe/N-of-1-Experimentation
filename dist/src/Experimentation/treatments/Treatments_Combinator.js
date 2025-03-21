import { Task } from "../Task";
import { do_random_array_sort } from "../Experimentation";
/**
 * All experiment definitions contain the treatment combinations (including repetitions)
 */
var Treatments_Combinator = /** @class */ (function () {
    function Treatments_Combinator(variables, repetitions) {
        this.variables = variables;
        this.repetitions = repetitions;
    }
    Treatments_Combinator.prototype.clone = function () {
        return new Treatments_Combinator(this.variables, this.repetitions);
    };
    Treatments_Combinator.prototype.create_treatment_combinations = function () {
        var treatment_combinations = [];
        for (var r = 0; r < this.repetitions; r++) {
            treatment_combinations = treatment_combinations.concat(this.variables.create_treatment_combinations());
        }
        return treatment_combinations;
    };
    Treatments_Combinator.prototype.create_tasks = function (experiment_definition) {
        var tasks = [];
        for (var _i = 0, _a = this.create_treatment_combinations(); _i < _a.length; _i++) {
            var treatment_combination = _a[_i];
            var task = new Task(treatment_combination.clone(), experiment_definition, "");
            try {
                experiment_definition.experiment_definition_task_creator(task);
            }
            catch (ex) {
                console.log("halt");
                experiment_definition.experiment_definition_task_creator(task);
            }
            task.is_training = experiment_definition.is_training;
            tasks.push(task);
        }
        return do_random_array_sort(tasks);
    };
    Treatments_Combinator.prototype.get_variable_named = function (var_name) {
        return this.variables.get_variable_named(var_name);
    };
    return Treatments_Combinator;
}());
export { Treatments_Combinator };
