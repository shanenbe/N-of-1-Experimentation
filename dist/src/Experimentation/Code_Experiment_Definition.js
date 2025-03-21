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
import { Experiment_Definition } from "./Experiment_Definition";
import { Book_Forwarder } from "../Automata_Forwarders/Book_Forwarder";
import { Sequential_Forwarder_Forwarder } from "../Books/Sequential_Forwarder_Forwarder";
import { Training_Execution_Forwarder } from "../Automata_Forwarders/Training_Execution_Forwarder";
import { Experiment_Forwarder } from "../Automata_Forwarders/Experiment_Forwarder";
import { Questionnaire_Forwarder } from "../Automata_Forwarders/Questionnaire_Forwarder";
export function init() { }
// TODO: Both classes should be one!!!
// ASAP!!!!
var Code_Experiment_Definition = /** @class */ (function (_super) {
    __extends(Code_Experiment_Definition, _super);
    function Code_Experiment_Definition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Code_Experiment_Definition.prototype.create_code_all_experiment_automatas = function (cfg) {
        var output_writer = cfg.measurement.output_writer();
        var introduction_book = new Book_Forwarder("Introduction", cfg.introduction_texts, cfg.measurement);
        var ending_book = new Book_Forwarder("Finish", cfg.finish_texts, cfg.measurement);
        ending_book.automata.add_finish_action(function () { return cfg.finish_function(experiment_execution_forwarder.experiment_definition); });
        var experiment_execution_forwarder = new Experiment_Forwarder(cfg.pre_run_experiment_output, this, cfg.measurement);
        experiment_execution_forwarder.init_experiment();
        var cloned_experiment_definition = this.clone();
        var training_forwarder = new Training_Execution_Forwarder(cfg.pre_run_training_output, cfg.training_configuration, cloned_experiment_definition, cfg.measurement);
        training_forwarder.init_experiment();
        var post_questionnaire = null;
        if (cfg.post_questionnaire != undefined) {
            post_questionnaire = new Questionnaire_Forwarder(cfg.post_questionnaire, cfg.measurement);
        }
        var forwarders = [];
        if (introduction_book != null) {
            forwarders.push(introduction_book);
        }
        if (training_forwarder.experiment_definition.tasks.length != 0)
            forwarders.push(training_forwarder);
        forwarders.push(experiment_execution_forwarder);
        if (post_questionnaire != null) {
            forwarders.push(post_questionnaire);
            experiment_execution_forwarder.experiment_definition.questionnaires.push(post_questionnaire);
        }
        forwarders.push(ending_book);
        var forwarder = new Sequential_Forwarder_Forwarder(forwarders);
        return forwarder;
    };
    // WHATEVER HAPPENS ON EARTH - THIS SHOULD ONLY BE USED FOR TRAINING!
    Code_Experiment_Definition.prototype.clone = function () {
        var clone = new Code_Experiment_Definition(this.template.experiment_name, this.is_training, this.treatments_combinator.clone(), this.template.variables, this.template.repetitions, this.measurement, this.template.task_creator);
        return clone;
    };
    return Code_Experiment_Definition;
}(Experiment_Definition));
export { Code_Experiment_Definition };
