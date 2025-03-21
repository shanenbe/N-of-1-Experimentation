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
import { Experiment_Output_Writer, SET_SEED } from "./Experimentation";
import { key_event_string, save_file_in_html } from "../utils/Utils";
import { create_code_experiment_execution } from "./functions/create_code_experiment_execution";
var Browser_Output_Writer = /** @class */ (function (_super) {
    __extends(Browser_Output_Writer, _super);
    function Browser_Output_Writer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Browser_Output_Writer.prototype.print_experiment_name = function (s) {
        this.get_html_element_by_id("STATE").innerHTML = s;
    };
    Browser_Output_Writer.prototype.clear_error = function () {
        var element_id = [
            "STAGE_ERROR"
        ];
        for (var _i = 0, element_id_1 = element_id; _i < element_id_1.length; _i++) {
            var e = element_id_1[_i];
            var parent_1 = document.getElementById(e);
            while (parent_1.firstChild) {
                parent_1.removeChild(parent_1.firstChild);
            }
        }
    };
    Browser_Output_Writer.prototype.clear_stage = function () {
        var element_id = [
            "STAGE",
            "STAGE_MSG",
            "STAGE_ERROR"
        ];
        for (var _i = 0, element_id_2 = element_id; _i < element_id_2.length; _i++) {
            var e = element_id_2[_i];
            var parent_2 = document.getElementById(e);
            while (parent_2.firstChild) {
                parent_2.removeChild(parent_2.firstChild);
            }
        }
    };
    Browser_Output_Writer.prototype.clear_state = function () {
        var element_id = [
            "STATE",
            "TASK"
        ];
        for (var _i = 0, element_id_3 = element_id; _i < element_id_3.length; _i++) {
            var e = element_id_3[_i];
            var parent_3 = document.getElementById(e);
            while (parent_3.firstChild) {
                parent_3.removeChild(parent_3.firstChild);
            }
        }
    };
    Browser_Output_Writer.prototype.print_error_string_on_stage = function (s) {
        var e = this.get_html_element_by_id("STAGE_ERROR");
        e.innerHTML = s;
    };
    Browser_Output_Writer.prototype.get_html_element_by_id = function (s) {
        // @ts-ignore
        return document.getElementById(s);
    };
    Browser_Output_Writer.prototype.print_string_to_state = function (s) {
        this.get_html_element_by_id("STATE").innerHTML = s;
    };
    Browser_Output_Writer.prototype.print_string_on_stage = function (s) {
        this.print_html_on_stage("<p>" + s + "</p>");
    };
    Browser_Output_Writer.prototype.ask_for_input = function () {
        // @ts-ignore
        var p = document.createElement("p");
        var l = document.createElement("label");
        l.setAttribute('type', 'text');
        p.textContent = "Answer: ";
        p.appendChild(l);
        // @ts-ignore
        var i = document.createElement("input");
        i.setAttribute('type', 'text');
        i.setAttribute('class', 'input');
        p.appendChild(i);
        i.id = "INPUT";
        this.get_html_element_by_id("STAGE").appendChild(p);
        i.focus();
    };
    Browser_Output_Writer.prototype.set_focus_on_input = function () {
        var i = this.get_html_element_by_id("INPUT");
        i.focus();
    };
    Browser_Output_Writer.prototype.print_string_to_page_number = function (s) {
        this.get_html_element_by_id("TASK").innerHTML = s;
    };
    Browser_Output_Writer.prototype.get_given_answer = function () {
        return this.get_html_element_by_id("INPUT").value;
    };
    Browser_Output_Writer.prototype.print_on_input_response = function (given_answer) {
        this.get_html_element_by_id("INPUT").value = given_answer;
    };
    Browser_Output_Writer.prototype.create_html_element_from_string = function (s) {
        var parser = new DOMParser();
        var elements = parser.parseFromString(s, "text/html").body;
        return elements;
    };
    Browser_Output_Writer.prototype.print_html_on_stage = function (s) {
        // for(let e of this.create_html_element_from_string(s)) {
        this.get_html_element_by_id("STAGE")
            .appendChild(this.create_html_element_from_string(s));
        // }
    };
    Browser_Output_Writer.prototype.print_html_on_error = function (s) {
        // for(let e of this.create_html_element_from_string(s)) {
        //     this.get_html_element_by_id("STAGE_ERROR")
        //         .appendChild(e);
        // }
        this.get_html_element_by_id("STAGE_ERROR")
            .appendChild(this.create_html_element_from_string(s));
    };
    return Browser_Output_Writer;
}(Experiment_Output_Writer));
export { Browser_Output_Writer };
export function BROWSER_EXPERIMENT(creator) {
    var browser_output = new Browser_Output_Writer();
    var cfg = creator(browser_output);
    SET_SEED(cfg.seed);
    var this_measurement = cfg.measurement(browser_output);
    var experiment_automata = create_code_experiment_execution({
        experiment_name: cfg.experiment_name,
        seed: cfg.seed,
        introduction_pages: cfg.introduction_pages,
        post_questionnaire: cfg.post_questionnaire,
        pre_run_training_output: cfg.pre_run_training_instructions,
        training_configuration: cfg.training_configuration,
        pre_run_experiment_output: cfg.pre_run_experiment_instructions,
        finish_pages: cfg.finish_pages,
        layout: cfg.layout,
        repetitions: cfg.repetitions,
        task_configuration: cfg.task_configuration,
        measurement: this_measurement,
        finish_function: function (exp) {
            // @ts-ignore
            document.removeEventListener("keydown", key_forwarder);
            save_file_in_html("experimentdata.csv", exp.generate_csv_data());
        }
    });
    var key_forwarder = function (e) {
        var key_string = key_event_string(e);
        experiment_automata.input(key_string);
    };
    // @ts-ignore
    document.addEventListener("keydown", key_forwarder, false);
    experiment_automata.set_active();
}
