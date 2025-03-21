export function init() { }
var Experiment_Definition = /** @class */ (function () {
    function Experiment_Definition(experiment_name, is_training, treatments_combinator, variables, repetitions, measurement, task_creator) {
        this.questionnaires = [];
        this.tasks = [];
        this.experiment_name = experiment_name;
        this.is_training = is_training;
        this.template = { experiment_name: experiment_name, variables: variables, repetitions: repetitions, task_creator: task_creator };
        this.treatments_combinator = treatments_combinator;
        this.variables = variables;
        this.measurement = measurement;
        this.experiment_definition_task_creator = task_creator;
    }
    Experiment_Definition.prototype.init_experiment = function (is_training) {
        this.tasks = this.treatments_combinator.create_tasks(this);
    };
    Experiment_Definition.prototype.all_independent_variables = function () {
        return this.variables.independent_variables;
    };
    Experiment_Definition.prototype.generate_csv_data = function () {
        var result = [];
        // let questionnaire_variables = this.questionnaire_responses = cfg.questionnaire.filter((e: Input_Object)=> !(e instanceof Information)).map((e: Input_Object)=>e.variable);
        for (var _i = 0, _a = this.questionnaires; _i < _a.length; _i++) {
            var questionnaire = _a[_i];
            for (var _b = 0, _c = questionnaire.questions; _b < _c.length; _b++) {
                var question = _c[_b];
                result.push("\"" + question.variable_name + "\"" + ";");
            }
        }
        this.variables.print_to_array(result);
        result.push("number_of_given_answers;expected_answer;given_answer;is_correct;time_in_milliseconds;\n");
        for (var _d = 0, _e = this.tasks; _d < _e.length; _d++) {
            var task = _e[_d];
            for (var _f = 0, _g = this.questionnaires; _f < _g.length; _f++) {
                var questionnaire = _g[_f];
                for (var _h = 0, _j = questionnaire.questions; _h < _j.length; _h++) {
                    var question = _j[_h];
                    result.push("\"" + question.answer + "\"" + ";");
                }
            }
            for (var _k = 0, _l = task.treatment_combination.treatment_combination; _k < _l.length; _k++) {
                var treatment_combination = _l[_k];
                result.push(treatment_combination.value + ";");
            }
            result.push((task.invalid_answers.length + 1) + ";");
            result.push(task.expected_answer + ";");
            result.push(task.given_answer + ";");
            result.push("" + (task.given_answer == task.expected_answer) + ";");
            result.push(task.required_milliseconds + ";");
            task.invalid_answers.forEach(function (a) { return result.push(a[0] + ";" + a[1] + ";"); });
            result.push("\n");
        }
        return result;
    };
    return Experiment_Definition;
}());
export { Experiment_Definition };
