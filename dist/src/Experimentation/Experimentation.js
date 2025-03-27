var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import seedrandom from "seedrandom/seedrandom.min.js";
import { convert_string_to_html_string } from "../utils/Utils";
import { Alternatives, Freetext, Information } from "../Automata_Forwarders/Questionnaire_Forwarder";
export function init() { }
export var VARIABLE_TYPE;
(function (VARIABLE_TYPE) {
    VARIABLE_TYPE[VARIABLE_TYPE["STRING"] = 1] = "STRING";
    VARIABLE_TYPE[VARIABLE_TYPE["NUMBER"] = 2] = "NUMBER";
})(VARIABLE_TYPE || (VARIABLE_TYPE = {}));
export function Reaction_Time(input) {
    return function (writer) { return new Reaction_Time_Measurement(input(writer)); };
}
;
export function Reaction_Time_With_Penalty(input, penalty_seconds) {
    return function (writer) { return new Reaction_Time_Penalty_Measurement(input(writer), penalty_seconds); };
}
;
export function Time_to_finish(input) {
    return function (writer) { return new Time_To_Finish_Measurement(input(writer)); };
}
export function Time_to_finish_with_Penalty(input, penalty_seconds) {
    return function (writer) { return new Time_To_Finish_With_Time_Penalty_Measurement(input(writer), penalty_seconds); };
}
export function keys(key_list) {
    return function (writer) { return new Key_Pressing(key_list, writer); };
}
export function keys_0_to_9() {
    return function (writer) { return new Key_Pressing(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], writer); };
}
export function text_input_experiment(output_writer) {
    return new Free_Text_User_Input_Experiment(output_writer);
}
export function text_input_experiment_with_pre_post_label(pre, post) {
    return function (output_writer) { return new Free_Text_User_Input_Experiment_With_PrePost(output_writer, pre, post); };
}
export function information(question) {
    return new Information(question);
}
export function free_text(var_name, question) {
    return new Freetext(var_name, question);
}
export function alternatives(var_name, question, alternatives) {
    return new Alternatives(var_name, question, alternatives);
}
var Experiment_Output_Writer = /** @class */ (function () {
    function Experiment_Output_Writer() {
    }
    Experiment_Output_Writer.prototype.convert_string_to_html_string = function (s) {
        return convert_string_to_html_string(s);
    };
    Experiment_Output_Writer.prototype.string_page_command = function (s) {
        var _this = this;
        return function () { return _this.print_string_on_stage(s); };
    };
    Experiment_Output_Writer.prototype.stage_string_pages_commands = function (pages) {
        var ret = [];
        for (var _i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
            var a = pages_1[_i];
            ret.push(this.string_page_command(a));
        }
        return ret;
    };
    Experiment_Output_Writer.prototype.get_given_answer = function (input) {
        return input;
    };
    Experiment_Output_Writer.prototype.print_on_input_response = function (given_answer) { };
    Experiment_Output_Writer.prototype.set_focus_on_input = function () { };
    Experiment_Output_Writer.prototype.clear_all = function () {
        this.clear_state();
        this.clear_stage();
    };
    return Experiment_Output_Writer;
}());
export { Experiment_Output_Writer };
var Measurement_Type = /** @class */ (function () {
    function Measurement_Type(input_type) {
        this.input_type = input_type;
    }
    Measurement_Type.prototype.accepted_responses = function () {
        return this.input_type.accepted_responses();
    };
    Measurement_Type.prototype.given_answer = function (i) {
        return this.input_type.given_answer(i);
    };
    Measurement_Type.prototype.start_measurement = function (task) {
        this.start_time = new Date().getTime().valueOf();
        task.print_task();
    };
    Measurement_Type.prototype.stop_measurement = function (input, task) {
        var end_time = new Date().getTime().valueOf();
        task.given_answer = this.input_type.get_given_answer(input);
        task.required_milliseconds = end_time - this.start_time;
        task.do_print_after_task_information();
    };
    Measurement_Type.prototype.incorrect_response = function (i, task) {
        var end_time = new Date().getTime().valueOf();
        var given_answer = task.experiment_definition.measurement.get_given_answer(i);
        task.invalid_answers.push([given_answer, end_time - this.start_time]);
        task.do_print_error_message(this.input_type.get_given_answer(i));
    };
    Measurement_Type.prototype.output_writer = function () {
        return this.input_type.output_writer;
    };
    Measurement_Type.prototype.get_given_answer = function (input) {
        return this.input_type.get_given_answer(input);
    };
    Measurement_Type.prototype.demands_penalty = function () {
        return false;
    };
    Measurement_Type.prototype.penalty_is_over = function () {
        return true;
    };
    return Measurement_Type;
}());
export { Measurement_Type };
var Reaction_Time_Measurement = /** @class */ (function (_super) {
    __extends(Reaction_Time_Measurement, _super);
    function Reaction_Time_Measurement(input_type) {
        return _super.call(this, input_type) || this;
    }
    return Reaction_Time_Measurement;
}(Measurement_Type));
export { Reaction_Time_Measurement };
var Reaction_Time_Penalty_Measurement = /** @class */ (function (_super) {
    __extends(Reaction_Time_Penalty_Measurement, _super);
    function Reaction_Time_Penalty_Measurement(input_type, penalty_seconds) {
        var _this = _super.call(this, input_type) || this;
        _this.penalty_started = false;
        _this.penalty_start_point = null;
        _this.penalty_miliseconds = penalty_seconds * 1000;
        return _this;
    }
    Reaction_Time_Penalty_Measurement.prototype.demands_penalty = function () {
        return true;
    };
    Reaction_Time_Penalty_Measurement.prototype.incorrect_response = function (i, task) {
        _super.prototype.incorrect_response.call(this, i, task);
        this.penalty_started = true;
        this.penalty_start_point = new Date().getTime().valueOf();
        task.do_print_error_message(this.input_type.get_given_answer(i));
    };
    Reaction_Time_Penalty_Measurement.prototype.delete_penalty = function () {
        this.penalty_started = false;
        this.penalty_start_point = null;
    };
    Reaction_Time_Penalty_Measurement.prototype.penalty_is_over = function () {
        var diff = (new Date().getTime().valueOf()) - this.start_time;
        return !this.penalty_started || diff >= this.penalty_miliseconds;
    };
    Reaction_Time_Penalty_Measurement.prototype.start_measurement = function (task) {
        _super.prototype.start_measurement.call(this, task);
        this.delete_penalty();
    };
    return Reaction_Time_Penalty_Measurement;
}(Measurement_Type));
export { Reaction_Time_Penalty_Measurement };
var Time_To_Finish_Measurement = /** @class */ (function (_super) {
    __extends(Time_To_Finish_Measurement, _super);
    function Time_To_Finish_Measurement(input_type) {
        return _super.call(this, input_type) || this;
    }
    return Time_To_Finish_Measurement;
}(Measurement_Type));
export { Time_To_Finish_Measurement };
var Time_To_Finish_With_Time_Penalty_Measurement = /** @class */ (function (_super) {
    __extends(Time_To_Finish_With_Time_Penalty_Measurement, _super);
    function Time_To_Finish_With_Time_Penalty_Measurement(input_type, penalty_seconds) {
        var _this = _super.call(this, input_type) || this;
        _this.penalty_started = false;
        _this.penalty_start_point = null;
        _this.penalty_miliseconds = penalty_seconds * 1000;
        return _this;
    }
    Time_To_Finish_With_Time_Penalty_Measurement.prototype.demands_penalty = function () {
        return true;
    };
    Time_To_Finish_With_Time_Penalty_Measurement.prototype.incorrect_response = function (i, task) {
        _super.prototype.incorrect_response.call(this, i, task);
        this.penalty_started = true;
        this.penalty_start_point = new Date().getTime().valueOf();
        task.do_print_error_message(this.input_type.get_given_answer(i));
    };
    Time_To_Finish_With_Time_Penalty_Measurement.prototype.delete_penalty = function () {
        this.penalty_started = false;
        this.penalty_start_point = null;
    };
    Time_To_Finish_With_Time_Penalty_Measurement.prototype.penalty_is_over = function () {
        var diff = (new Date().getTime().valueOf()) - this.start_time;
        return !this.penalty_started || diff >= this.penalty_miliseconds;
    };
    Time_To_Finish_With_Time_Penalty_Measurement.prototype.start_measurement = function (task) {
        _super.prototype.start_measurement.call(this, task);
        this.delete_penalty();
    };
    return Time_To_Finish_With_Time_Penalty_Measurement;
}(Time_To_Finish_Measurement));
export { Time_To_Finish_With_Time_Penalty_Measurement };
var Experiment_Input_Type = /** @class */ (function () {
    function Experiment_Input_Type(output_writer) {
        this.output_writer = output_writer;
    }
    Experiment_Input_Type.prototype.print_input_request = function () {
        this.output_writer.ask_for_input();
    };
    Experiment_Input_Type.prototype.get_given_answer = function (input_string) {
        var value = this.output_writer.get_given_answer(input_string);
        return value;
    };
    return Experiment_Input_Type;
}());
export { Experiment_Input_Type };
var Key_Pressing = /** @class */ (function (_super) {
    __extends(Key_Pressing, _super);
    function Key_Pressing(accepted_keys, output_writer) {
        var _this = _super.call(this, output_writer) || this;
        _this.accepted_keys = accepted_keys;
        return _this;
    }
    Key_Pressing.prototype.accepted_responses = function () {
        return this.accepted_keys;
    };
    Key_Pressing.prototype.given_answer = function (key_pressed) {
        return key_pressed;
    };
    Key_Pressing.prototype.print_input_request = function () {
        // I am a key....no need for input fields
    };
    Key_Pressing.prototype.get_given_answer = function (input_string) {
        return input_string;
    };
    return Key_Pressing;
}(Experiment_Input_Type));
export { Key_Pressing };
var Free_Text_User_Input_Experiment = /** @class */ (function (_super) {
    __extends(Free_Text_User_Input_Experiment, _super);
    function Free_Text_User_Input_Experiment(output_writer) {
        return _super.call(this, output_writer) || this;
    }
    Free_Text_User_Input_Experiment.prototype.accepted_responses = function () {
        return ["Enter"];
    };
    Free_Text_User_Input_Experiment.prototype.given_answer = function (key_pressed) { };
    Free_Text_User_Input_Experiment.prototype.print_input_request = function () {
        this.output_writer.ask_for_input();
    };
    return Free_Text_User_Input_Experiment;
}(Experiment_Input_Type));
export { Free_Text_User_Input_Experiment };
var Free_Text_User_Input_Experiment_With_PrePost = /** @class */ (function (_super) {
    __extends(Free_Text_User_Input_Experiment_With_PrePost, _super);
    function Free_Text_User_Input_Experiment_With_PrePost(output_writer, pre, post) {
        return _super.call(this, output_writer) || this;
    }
    Free_Text_User_Input_Experiment_With_PrePost.prototype.accepted_responses = function () {
        return ["Enter"];
    };
    Free_Text_User_Input_Experiment_With_PrePost.prototype.given_answer = function (key_pressed) { };
    Free_Text_User_Input_Experiment_With_PrePost.prototype.print_input_request = function () {
        this.output_writer.ask_for_input();
    };
    return Free_Text_User_Input_Experiment_With_PrePost;
}(Experiment_Input_Type));
export { Free_Text_User_Input_Experiment_With_PrePost };
var _Random = /** @class */ (function () {
    function _Random() {
        seedrandom('1234567890', { global: true });
    }
    _Random.prototype.new_random_integer = function (upper_limit) {
        return Math.trunc(upper_limit * Math.random());
    };
    _Random.prototype.set_seed = function (seed) {
        seedrandom(seed, { global: true });
    };
    return _Random;
}());
export var Random = new _Random();
export function SET_SEED(seed) {
    Random.set_seed(seed);
}
export function random_integer_up_to_excluding(upper_limit) {
    return Random.new_random_integer(upper_limit);
}
export function do_random_array_sort(array) {
    var copy = __spreadArray([], array, true);
    var result = [];
    while (copy.length > 0) {
        result.push(copy.splice(random_integer_up_to_excluding(copy.length), 1)[0]);
    }
    return result;
}
export function random_array_element_and_remove(array) {
    var position = random_integer_up_to_excluding(array.length);
    var ret = array[position];
    array.splice(position, 1);
    return ret;
}
export function random_array_element(array) {
    return array[random_integer_up_to_excluding(array.length)];
}
export function random_array_element_without(array, exceptions) {
    var copy = array.filter(function (e) { return !exceptions.includes(e); });
    return random_array_element(copy);
}
export function random_array_elements_without_repetitions(array, number_of_elements_to_chose) {
    var randomly_sorted_array = do_random_array_sort(array);
    return randomly_sorted_array.slice(0, number_of_elements_to_chose);
}
export function random_lower_case_letter() {
    return String.fromCharCode(97 + random_integer_up_to_excluding(26));
}
export function random_lower_case_letter_except(letters) {
    while (true) {
        var ret = String.fromCharCode(97 + random_integer_up_to_excluding(26));
        if (!letters.includes(ret))
            return ret;
    }
}
export function random_upper_case_letter_except(letters) {
    while (true) {
        var ret = String.fromCharCode(97 + random_integer_up_to_excluding(26)).toUpperCase();
        if (!letters.includes(ret))
            return ret;
    }
}
// This invocation just makes sure that RANDOM is loaded
seedrandom();
