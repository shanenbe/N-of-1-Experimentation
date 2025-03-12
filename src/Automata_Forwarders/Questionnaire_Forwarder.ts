import {Automata_With_Output_Forwarder} from "./Automata_With_Output_Forwarder";
import {Automata_Configurator} from "../Automata/Automata_Configurator";
import {from} from "../Automata/Transitions";
import {Measurement_Type} from "../Experimentation/Experimentation";

let SHOW_INTRO=0;
let SHOW_QUESTION=1;
let ANSWERED_INCOMPLETE=2;
let ANSWERES_COMPLETE = 3
let EVERYTHING_DONE = 4;

export abstract class Question {
    variable_name: string;
    question_text: string;
    answer = null;

    constructor(variable_name: string, question_text: string) {
        this.variable_name = variable_name;
        this.question_text = question_text;
    }

    abstract input_html();

    store_answer() {
        let element = document.getElementById(this.variable_name);
        // @ts-ignore
        this.answer = element.value;
    }
}
export class Alternatives extends Question {
    alternatives:string[];

    constructor(variable_name: string, question_text: string, alternatives: string[]) {
        super(variable_name, question_text);
        this.alternatives = alternatives;
    }

    input_html() {
        let html_string = "<select id=\"" + this.variable_name + "\">";
        html_string +="<option disabled selected value> -- select an option -- </option>";
        let index = 0;
        this.alternatives.forEach((a) =>
            html_string += "<option value=" + index++ + ">" + a + "</option>"
        );
        html_string += ("</select>");
        return html_string;
    }

    store_answer() {
        let element = document.getElementById(this.variable_name);
        // @ts-ignore
        this.answer = this.alternatives[element.value];
    }

}

export class Information extends Question {
    html_string() {
        let html_string = "<p>We have one question to you.</p>";
        return html_string;
    }

    input_html() {
        let html_string = "<input type=\"text\" id=\"" + this.variable_name + "\">";
        return html_string;
    }

    constructor(question_text: string) {
        super(null, question_text);
    }
}

export class Freetext extends Question {
    html_string() {
    }

    input_html() {
        let html_string = "<input type=\"text\" id=\"" + this.variable_name + "\">";
        return html_string;
    }
}

export class Questionnaire_Forwarder extends Automata_With_Output_Forwarder {

    current_question_number = -1;
    questions: Question[];

    constructor(
        questions: Question[],
        measurement: Measurement_Type,
    ) {
        super(
                "Questionnaire",
                measurement,
                ()=>measurement.output_writer().print_html_on_stage(
                    "Please, answer the following questions.<br>"),
                ()=>measurement.output_writer().print_html_on_stage(
                    "Thank you for answering the questions.")
        );
        this.questions = questions;

    }

    automata_configurator()  {
        return new Automata_Configurator(
            [SHOW_INTRO, SHOW_QUESTION, ANSWERED_INCOMPLETE, ANSWERES_COMPLETE, EVERYTHING_DONE],
            SHOW_INTRO,
            ()=>{},
            this.transitions(),
            [EVERYTHING_DONE]
        );
    }

    transitions() {
        return [
            from(SHOW_INTRO).to(EVERYTHING_DONE)
                .on("DONE")
                .if((i:string) =>
                    true
                )
                .do((i:string) => {
                    this.add_result_to_question();
                    console.log("dummy");
                }),
        ];
    }

    show_intro() {
        super.show_intro();
        let html_string = this.create_questionnaire_html_string();
        this.output_writer().print_html_on_stage(html_string);
        document.getElementById("DONE").onclick = () =>
            this.input("DONE");
        ;
    }

    show_outro() {
    }

    create_questionnaire_html_string():string {
        let html_string = "<fieldset><legend>Questionnaire</legend><div display: inline-block;><table>";
        this.questions.forEach(
            (q)=>
                html_string += "<tr><td>" + q.question_text + "</td>" +
                                "<td>" + q.input_html() + "</td></tr>"
        );
        html_string += "</table></div></fieldset><br><button id='DONE'>Ok - all questions answered</button>";
        return html_string;
    }

    add_result_to_question() {
        for(let question of this.questions) {
            question.store_answer();
        }
    }
}
