import {Experiment_Output_Writer, Measurement_Type, Output_Command} from "./Experimentation.js";
import {Task} from "./Task.js";
import {key_event_string, save_file_in_html} from "../Utils.js";
import {Code_Experiment_Definition, create_code_experiment_execution} from "./Code_Experiment_Definition.js";
import {Startup} from "mathjax-full/js/components/startup";

export class Browser_Output_Writer extends Experiment_Output_Writer {
    print_experiment_name() {
    }

    clear_stage() {
        let element_id = [
            "STAGE",
            "STAGE_MSG",
            "STAGE_ERROR"
        ];
        for(let e of element_id) {
            let parent = document.getElementById(e);
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    }

    print_error_string_on_stage(s: string) {
        let e = this.get_html_element_by_id("STAGE_ERROR");
        e.innerHTML  = s;
    }

    get_html_element_by_id(s: string):HTMLElement {
        // @ts-ignore
        return document.getElementById(s);
    }
    print_string_to_state(s: string) {
        this.get_html_element_by_id("STATE").innerHTML  = s;
    }

    print_string_on_stage(s: string) {
        this.get_html_element_by_id("STAGE").innerHTML  = s;
    }

    ask_for_input() {
        console.log("request input");
        // @ts-ignore
        let p = document.createElement("p") as HTMLParagraphElement;
        // @ts-ignore
        let i = document.createElement("input");
        i.setAttribute('type', 'text');
        p.appendChild(i);
        i.id = "INPUT";
        this.get_html_element_by_id("STAGE").appendChild(p);
        i.focus();
    }

    set_focus_on_input() {
        let i = this.get_html_element_by_id("INPUT")
        i.focus();
    }

    print_string_to_page_number(s:string) {
        this.get_html_element_by_id("TASK").innerHTML  = s;
    }

    get_given_answer() {
        return (this.get_html_element_by_id("INPUT") as HTMLInputElement).value;
    }

    print_on_input_response(given_answer: string) {
        (this.get_html_element_by_id("INPUT") as HTMLInputElement).value = given_answer;
    }

    private create_html_element_from_string(s:string) {
        let parser = new DOMParser();
        return parser.parseFromString(s, "text/html").body;
    }

    print_html_on_stage(s: string) {
        this.get_html_element_by_id("STAGE")
            .appendChild(this.create_html_element_from_string(s));
    }

    print_html_on_error(s: string) {
        this.get_html_element_by_id("STAGE_ERROR")
            .appendChild(this.create_html_element_from_string(s));
    }

}


export function BROWSER_EXPERIMENT(creator: (writer:Experiment_Output_Writer) => {
                                                                                    experiment_name     :string,
                                                                                    seed                :string,
                                                                                    introduction_pages  :Output_Command[],
                                                                                    // questionnaire?      : Input_Object[],
                                                                                    pre_run_instructions:Output_Command,
                                                                                    finish_pages        :Output_Command[],
                                                                                    layout              :{
                                                                                                            variable: string,
                                                                                                                treatments: string[]
                                                                                                         }[],
                                                                                    repetitions         :number,
                                                                                    measurement         : (Experiment_Output_Writer)=>Measurement_Type,
                                                                                    task_configuration  :(task:Task) =>void,
                                                                              }
) {

    let browser_output = new Browser_Output_Writer();
    let cfg = creator(browser_output);
    let this_measurement:Measurement_Type = cfg.measurement(browser_output);

    let experiment_automata = create_code_experiment_execution(
        {
            experiment_name: cfg.experiment_name,
            seed: cfg.seed,
            introduction_pages: cfg.introduction_pages,
            // questionnaire: cfg.questionnaire,
            pre_run_instructions: cfg.pre_run_instructions,
            finish_pages: cfg.finish_pages,
            layout: cfg.layout,
            repetitions: cfg.repetitions,
            task_configuration: cfg.task_configuration,
            measurement: this_measurement,
            finish_function:  (exp: Code_Experiment_Definition) => {
                // @ts-ignore
                document.removeEventListener("keydown", key_forwarder);
                save_file_in_html("experimentdata", exp.generate_csv_data());
            }
        }
    );

    let key_forwarder = (e)=> {
        let key_string = key_event_string(e);
        experiment_automata.input(key_string);
    }

    // @ts-ignore
    document.addEventListener("keydown", key_forwarder, false);

    experiment_automata.set_active();

}