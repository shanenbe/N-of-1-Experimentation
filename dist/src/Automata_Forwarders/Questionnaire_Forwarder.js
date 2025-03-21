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
import { Automata_With_Output_Forwarder } from "./Automata_With_Output_Forwarder";
import { Automata_Configurator } from "../Automata/Automata_Configurator";
import { from } from "../Automata/Transitions";
var SHOW_INTRO = 0;
var SHOW_QUESTION = 1;
var ANSWERED_INCOMPLETE = 2;
var ANSWERES_COMPLETE = 3;
var EVERYTHING_DONE = 4;
var Question = /** @class */ (function () {
    function Question(variable_name, question_text) {
        this.answer = null;
        this.variable_name = variable_name;
        this.question_text = question_text;
    }
    Question.prototype.store_answer = function () {
        var element = document.getElementById(this.variable_name);
        // @ts-ignore
        this.answer = element.value;
    };
    return Question;
}());
export { Question };
var Alternatives = /** @class */ (function (_super) {
    __extends(Alternatives, _super);
    function Alternatives(variable_name, question_text, alternatives) {
        var _this = _super.call(this, variable_name, question_text) || this;
        _this.alternatives = alternatives;
        return _this;
    }
    Alternatives.prototype.input_html = function () {
        var html_string = "<select id=\"" + this.variable_name + "\">";
        html_string += "<option disabled selected value> -- select an option -- </option>";
        var index = 0;
        this.alternatives.forEach(function (a) {
            return html_string += "<option value=" + index++ + ">" + a + "</option>";
        });
        html_string += ("</select>");
        return html_string;
    };
    Alternatives.prototype.store_answer = function () {
        var element = document.getElementById(this.variable_name);
        // @ts-ignore
        this.answer = this.alternatives[element.value];
    };
    return Alternatives;
}(Question));
export { Alternatives };
var Information = /** @class */ (function (_super) {
    __extends(Information, _super);
    function Information(question_text) {
        return _super.call(this, null, question_text) || this;
    }
    Information.prototype.html_string = function () {
        var html_string = "<p>We have one question to you.</p>";
        return html_string;
    };
    Information.prototype.input_html = function () {
        var html_string = "<input type=\"text\" id=\"" + this.variable_name + "\">";
        return html_string;
    };
    return Information;
}(Question));
export { Information };
var Freetext = /** @class */ (function (_super) {
    __extends(Freetext, _super);
    function Freetext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Freetext.prototype.html_string = function () {
    };
    Freetext.prototype.input_html = function () {
        var html_string = "<input type=\"text\" id=\"" + this.variable_name + "\">";
        return html_string;
    };
    return Freetext;
}(Question));
export { Freetext };
var Questionnaire_Forwarder = /** @class */ (function (_super) {
    __extends(Questionnaire_Forwarder, _super);
    function Questionnaire_Forwarder(questions, measurement) {
        var _this = _super.call(this, "Questionnaire", measurement, function () { return measurement.output_writer().print_html_on_stage("Please, answer the following questions.<br>"); }, function () { return measurement.output_writer().print_html_on_stage("Thank you for answering the questions."); }) || this;
        _this.current_question_number = -1;
        _this.questions = questions;
        return _this;
    }
    Questionnaire_Forwarder.prototype.automata_configurator = function () {
        return new Automata_Configurator([SHOW_INTRO, SHOW_QUESTION, ANSWERED_INCOMPLETE, ANSWERES_COMPLETE, EVERYTHING_DONE], SHOW_INTRO, function () { }, this.transitions(), [EVERYTHING_DONE]);
    };
    Questionnaire_Forwarder.prototype.transitions = function () {
        var _this = this;
        return [
            from(SHOW_INTRO).to(EVERYTHING_DONE)
                .on("DONE")
                .if(function (i) {
                return true;
            })
                .do(function (i) {
                _this.add_result_to_question();
                console.log("dummy");
            }),
        ];
    };
    Questionnaire_Forwarder.prototype.show_intro = function () {
        var _this = this;
        _super.prototype.show_intro.call(this);
        var html_string = this.create_questionnaire_html_string();
        this.output_writer().print_html_on_stage(html_string);
        document.getElementById("DONE").onclick = function () {
            return _this.input("DONE");
        };
        ;
    };
    Questionnaire_Forwarder.prototype.show_outro = function () {
    };
    Questionnaire_Forwarder.prototype.create_questionnaire_html_string = function () {
        var html_string = "<fieldset><legend>Questionnaire</legend><div display: inline-block;><table>";
        this.questions.forEach(function (q) {
            return html_string += "<tr><td>" + q.question_text + "</td>" +
                "<td>" + q.input_html() + "</td></tr>";
        });
        html_string += "</table></div></fieldset><br><button id='DONE'>Ok - all questions answered</button>";
        return html_string;
    };
    Questionnaire_Forwarder.prototype.add_result_to_question = function () {
        for (var _i = 0, _a = this.questions; _i < _a.length; _i++) {
            var question = _a[_i];
            question.store_answer();
        }
    };
    return Questionnaire_Forwarder;
}(Automata_With_Output_Forwarder));
export { Questionnaire_Forwarder };
