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
import { Experimentation_Forwarder } from "./Experimentation_Forwarder";
var SHOW_INTRO = 0;
var SHOW_PRE_TASK_INFO = 1;
var SHOW_TASK = 2;
var SHOW_PENALTY = 3;
var TASK_FINISHED = 4;
var SHOW_OUTRO = 5;
var EVERYTHING_DONE = 6;
var ESCAPED = 7;
var Training_Execution_Forwarder = /** @class */ (function (_super) {
    __extends(Training_Execution_Forwarder, _super);
    function Training_Execution_Forwarder(pre_run_instructions, training_configuration, experiment_definition, measurement) {
        var _this = _super.call(this, "Training", function () {
            pre_run_instructions();
            measurement.output_writer().print_html_on_stage("<hr>" +
                "Press [Enter] to start training.");
        }, function () {
            measurement.output_writer().print_html_on_stage("You finished the training phase.<hr>" +
                (training_configuration.can_be_repeated ? "Please, press [Enter] to run again a training session.<br>" : "") +
                "Please, press [E] (capital E, i.e., [shift] + [e]) to enter the experiment phase.");
        }, experiment_definition, measurement) || this;
        _this.training_configuration = training_configuration;
        return _this;
    }
    Training_Execution_Forwarder.prototype.print_cancel_text = function () {
        this.output_writer().clear_stage();
        this.output_writer().print_string_to_page_number("Cancelled");
        var navigation_string = "You cancelled this training session.<hr>" +
            "Press [Enter] if you want to start another training session.<br>" +
            "Press [E] (capital E!) if you want to start with the experiment.";
        this.output_writer().print_html_on_stage(navigation_string);
    };
    Training_Execution_Forwarder.prototype.automata_configurator = function () {
        return new Automata_Configurator([SHOW_INTRO, SHOW_PRE_TASK_INFO, SHOW_TASK, SHOW_PENALTY, TASK_FINISHED, SHOW_OUTRO, EVERYTHING_DONE, ESCAPED], SHOW_INTRO, function () { }, this.transitions(), [EVERYTHING_DONE]);
    };
    Training_Execution_Forwarder.prototype.transitions = function () {
        var _this = this;
        var experiment_transitions = _super.prototype.transitions.call(this);
        var this_transitions = [
            from(SHOW_INTRO).to(ESCAPED)
                .on("Escape")
                .if(function () { return _this.training_configuration.can_be_cancelled; })
                .do(function (i) {
                _this.print_cancel_text();
            }),
            from(SHOW_TASK).to(ESCAPED)
                .on("Escape")
                .if(function () { return _this.training_configuration.can_be_cancelled; })
                .do(function (i) {
                _this.print_cancel_text();
            }),
            from(TASK_FINISHED).to(ESCAPED)
                .on("Escape")
                .if(function () { return _this.current_page_index < _this.experiment_definition.tasks.length - 1 && _this.training_configuration.can_be_cancelled; })
                .do(function (i) {
                _this.print_cancel_text();
            }),
            from(ESCAPED).to(EVERYTHING_DONE)
                .on("E").do(function () {
                var dummy = 1;
            }),
            from(ESCAPED).to(SHOW_INTRO)
                .on("Enter").do(function () {
                _this.experiment_definition.init_experiment(true);
                _this.show_intro();
            }),
            from(SHOW_OUTRO).to(SHOW_INTRO)
                .on("Enter")
                .if(function () { return _this.training_configuration.can_be_repeated; })
                .do(function () {
                _this.experiment_definition.init_experiment(true);
                _this.show_intro();
            }),
            from(SHOW_OUTRO).to(EVERYTHING_DONE)
                .on("E")
                .do(function (i) {
                var dummy = 1;
            })
        ];
        experiment_transitions.splice(experiment_transitions.length - 1);
        this_transitions.forEach(function (e) { return experiment_transitions.push(e); });
        return experiment_transitions;
    };
    Training_Execution_Forwarder.prototype.input = function (s) {
        if (!["a", "b", "c"].includes(s) && this.automata.current_state != 0)
            return _super.prototype.input.call(this, s);
        _super.prototype.input.call(this, s);
    };
    Training_Execution_Forwarder.prototype.init_experiment = function () {
        this.training_configuration.init_experiment(this.experiment_definition);
    };
    return Training_Execution_Forwarder;
}(Experimentation_Forwarder));
export { Training_Execution_Forwarder };
