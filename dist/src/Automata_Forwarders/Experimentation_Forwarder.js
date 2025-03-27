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
import { Automata_Configurator } from "../Automata/Automata_Configurator";
import { from } from "../Automata/Transitions";
import { Automata_With_Output_Forwarder } from "./Automata_With_Output_Forwarder";
var SHOW_INTRO = 0;
var SHOW_PRE_TASK_INFO = 1;
var SHOW_TASK = 2;
var SHOW_PENALTY = 3;
var TASK_FINISHED = 4;
var SHOW_OUTRO = 5;
var EVERYTHING_DONE = 6;
var Experimentation_Forwarder = /** @class */ (function (_super) {
    __extends(Experimentation_Forwarder, _super);
    function Experimentation_Forwarder(experiment_automata_name, pre_run_instructions, post_run_instructions, experiment_definition, measurement) {
        var _this = _super.call(this, experiment_automata_name, measurement, pre_run_instructions, post_run_instructions) || this;
        _this.current_page_index = -1;
        _this.experiment_definition = experiment_definition;
        return _this;
    }
    Experimentation_Forwarder.prototype.show_intro = function () {
        this.empty_screen_and_show_instructions(this.pre_run_instructions);
        this.output_writer().print_experiment_name(this.forwarder_name);
    };
    Experimentation_Forwarder.prototype.show_outro = function () {
        this.empty_screen_and_show_instructions(this.post_run_instructions);
    };
    Experimentation_Forwarder.prototype.automata_configurator = function () {
        return new Automata_Configurator([SHOW_INTRO, SHOW_PRE_TASK_INFO, SHOW_TASK, TASK_FINISHED, SHOW_OUTRO, EVERYTHING_DONE], SHOW_INTRO, function () { }, this.transitions(), [EVERYTHING_DONE]);
    };
    Experimentation_Forwarder.prototype.current_task = function () {
        return this.experiment_definition.tasks[this.current_page_index];
    };
    ;
    Experimentation_Forwarder.prototype.automata_configuration = function () {
        return new Automata_Configurator([SHOW_INTRO, SHOW_PRE_TASK_INFO, SHOW_TASK, TASK_FINISHED, SHOW_OUTRO, EVERYTHING_DONE], SHOW_INTRO, function () { }, this.transitions(), [EVERYTHING_DONE]);
    };
    Experimentation_Forwarder.prototype.transitions = function () {
        var _this = this;
        return [
            from(SHOW_INTRO).to(SHOW_TASK)
                .on("Enter")
                .if(function (i) { return !_this.first_task().has_pre_task_description; })
                .do(function (i) {
                _this.set_experiment_index(0);
                _this.measurement.start_measurement(_this.current_task());
            }),
            from(SHOW_INTRO).to(SHOW_PRE_TASK_INFO)
                .on("Enter")
                .if(function (i) { return _this.first_task().has_pre_task_description; })
                .do(function (i) {
                _this.set_experiment_index(0);
                _this.show_pre_task_info();
            }),
            from(SHOW_INTRO).to(SHOW_OUTRO) // State=3: Experiment done - just the message afterwards shown
                .on("Delete")
                .do(function (i) {
                _this.show_outro();
            }),
            from(SHOW_PRE_TASK_INFO).to(SHOW_TASK)
                .on("Enter")
                .do(function (i) {
                _this.measurement.start_measurement(_this.current_task());
            }),
            // Task Shown - Incorrect input => Remain in Task
            from(SHOW_TASK).to(SHOW_TASK)
                .on_any(this.measurement.accepted_responses())
                .if(function (i) {
                return !_this.current_task().accepts_answer(i) && !_this.measurement.demands_penalty();
            })
                .do(function (i) {
                _this.measurement.incorrect_response(i, _this.current_task());
            }),
            from(SHOW_TASK).to(SHOW_OUTRO)
                .on("?+Control")
                .if(function (i) { return true; })
                .do(function (i) {
                _this.measurement.stop_measurement(i, _this.current_task());
                _this.show_outro();
            }),
            // STATE 1=Task is shown, 2=Input correct
            from(SHOW_TASK).to(TASK_FINISHED)
                .on_any(this.measurement.accepted_responses())
                .if(function (i) { return _this.current_task().accepts_answer(i) &&
                _this.current_page_index < _this.experiment_definition.tasks.length - 1; })
                .do(function (i) {
                _this.measurement.stop_measurement(i, _this.current_task());
            }),
            from(SHOW_TASK).to(SHOW_PENALTY)
                .on_any(this.measurement.accepted_responses())
                .if(function (i) {
                return !_this.current_task().accepts_answer(i) && _this.measurement.demands_penalty();
            })
                .do(function (i) {
                _this.measurement.incorrect_response(i, _this.current_task());
            }),
            from(SHOW_PENALTY).to(SHOW_TASK)
                .on("Enter")
                .if(function (i) {
                return _this.measurement.penalty_is_over();
            })
                .do(function (i) {
                _this.measurement.start_measurement(_this.current_task());
            }),
            // Between Tasks to next task
            from(TASK_FINISHED).to(SHOW_PRE_TASK_INFO)
                .on("Enter")
                .if(function (i) { return _this.current_page_index < _this.experiment_definition.tasks.length - 1 && _this.next_task().has_pre_task_description; })
                .do(function (i) {
                _this.inc_current_experiment();
                _this.show_pre_task_info();
            }),
            from(TASK_FINISHED).to(SHOW_TASK)
                .on("Enter")
                .if(function (i) { return _this.current_page_index < _this.experiment_definition.tasks.length - 1 && !_this.next_task().has_pre_task_description; })
                .do(function (i) {
                _this.inc_current_experiment();
                _this.measurement.start_measurement(_this.current_task());
            }),
            from(SHOW_TASK).to(SHOW_OUTRO) // State=3: Experiment done - just the message afterwards shown
                .on_any(this.measurement.accepted_responses())
                .if(function (i) { return _this.current_task().accepts_answer(i) &&
                _this.current_page_index == _this.experiment_definition.tasks.length - 1; })
                .do(function (i) {
                _this.measurement.stop_measurement(i, _this.current_task());
                _this.show_outro();
            }),
            from(SHOW_OUTRO).to(EVERYTHING_DONE)
                .on("Enter")
                .do(function (i) {
                var a = 1;
            })
        ];
    };
    Experimentation_Forwarder.prototype.set_experiment_index = function (index) {
        this.current_page_index = index;
        this.output_writer().print_string_to_page_number("Task " + (this.current_page_index + 1) + " / " + this.experiment_definition.tasks.length);
    };
    Experimentation_Forwarder.prototype.inc_current_experiment = function () {
        this.set_experiment_index(++this.current_page_index);
    };
    Experimentation_Forwarder.prototype.init_experiment = function () {
        this.experiment_definition.init_experiment(false);
    };
    Experimentation_Forwarder.prototype.show_pre_task_info = function () {
        this.output_writer().clear_stage();
        this.output_writer().clear_error();
        this.current_task().print_pre_task_info();
    };
    Experimentation_Forwarder.prototype.next_task = function () {
        return this.experiment_definition.tasks[this.current_page_index + 1];
    };
    Experimentation_Forwarder.prototype.first_task = function () {
        return this.experiment_definition.tasks[0];
    };
    return Experimentation_Forwarder;
}(Automata_With_Output_Forwarder));
export { Experimentation_Forwarder };
