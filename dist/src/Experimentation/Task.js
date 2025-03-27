var Task = /** @class */ (function () {
    function Task(tc, experiment_definition, text) {
        this.expected_answer = "";
        this.given_answer = "";
        this.required_milliseconds = null;
        this.task_number_in_execution = -1;
        this.invalid_answers = [];
        this.is_training = false;
        this.has_pre_task_description = false;
        this.do_print_task = function () {
            throw new Error("Method not implemented.");
        };
        this.do_print_pre_task = function () {
            throw new Error("Method not implemented.");
        };
        this.do_print_error_message = function () {
            throw new Error("Method not implemented.");
        };
        this.accepts_answer_function = function (answer) { return true; };
        this.do_print_after_task_information = function () {
            throw new Error("Method not implemented.");
        };
        this.treatment_combination = tc;
        this.experiment_definition = experiment_definition;
        // this.code_string(text);
    }
    Task.prototype.accepts_answer = function (input) {
        var answer = this.experiment_definition.measurement.get_given_answer(input);
        return this.accepts_answer_function(answer);
    };
    Task.prototype.next_task = function () {
        if (this.task_number_in_execution < this.experiment_definition.tasks.length)
            return this.experiment_definition.tasks[this.task_number_in_execution];
        else
            return null;
    };
    Task.prototype.html_string_with_cmd = function (html_string, cmd) {
        // this.write_action = (writer: Automata_IO) => {
        //     writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_line(html_string));
        //     cmd();
        // }
    };
    Task.prototype.html_node_with_cmd = function (element, cmd) {
        // this.write_action = (writer: Automata_IO) => {
        //     writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_node(element));
        //     cmd();
        // }
    };
    Task.prototype.after_task_string_constructor = function (a_string_constructor) {
        // this.after_task_write_action = () => (writer: Automata_IO) =>writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(a_string_constructor()));
    };
    Task.prototype.print_task = function () {
        this.do_print_task();
        this.print_input_request();
    };
    Task.prototype.print_pre_task_info = function () {
        this.do_print_pre_task();
    };
    Task.prototype.print_input_request = function () {
        this.experiment_definition.measurement.input_type.print_input_request();
    };
    Task.prototype.treatment_value = function (treatment_name) {
        for (var _i = 0, _a = this.treatment_combination.treatment_combination; _i < _a.length; _i++) {
            var treatment = _a[_i];
            if (treatment.variable.name === treatment_name)
                return treatment.value;
        }
        throw "Unknown treatment: " + treatment_name;
    };
    Task.prototype.set_computed_variable_value = function (variable_name, value) {
        for (var _i = 0, _a = this.treatment_combination.treatment_combination; _i < _a.length; _i++) {
            var treatment = _a[_i];
            if (treatment.variable.name === variable_name) {
                treatment.value = value;
                return;
            }
        }
        throw "Unknown treatment: " + variable_name;
    };
    return Task;
}());
export { Task };
