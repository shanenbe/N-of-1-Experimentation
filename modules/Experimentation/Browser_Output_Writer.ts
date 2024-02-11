import {Experiment_Output_Writer, Measurement_Type} from "./Experimentation.js";
import {Task} from "./Task.js";
import {Input_Object, IO_Object} from "../Books/IO_Object.js";
import {key_event_string, save_file_in_html} from "../Utils.js";
import {Code_Experiment_Definition, create_code_experiment_execution} from "./Code_Experiment_Definition.js";
import {AUTOMATA_OUTPUT_OBJECT_FORMAT, Browser_IO} from "../Books/Automata_IO.js";

export class Browser_Output_Writer extends Experiment_Output_Writer {
    print_experiment_name() {
    }

    clear_stage() {
    }

    print_error_on_stage(pleaseAnswerTheQuestion: string) {
    }

    print_state(forwarder_name: string) {
    }

    print_string_on_stage(youCanGoOnByPressingEnter: string) {
    }

    set_task() {
    }

}


export function BROWSER_EXPERIMENT(creator: (writer:Experiment_Output_Writer) => {
                                                                                    experiment_name     :string,
                                                                                    seed                :string,
                                                                                    introduction_pages  :string[],
                                                                                    questionnaire?      : Input_Object[],
                                                                                    pre_run_instructions:string,
                                                                                    finish_pages        :string[],
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
            introduction_pages: cfg.introduction_pages.map((t:string)=> new IO_Object([{text:t, format:AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT}])),
            questionnaire: cfg.questionnaire,
            pre_run_instructions: new IO_Object([{text:cfg.pre_run_instructions, format:AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT}]),
            finish_pages: cfg.finish_pages.map((t:string)=> new IO_Object([{text:t, format:AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT}])),
            layout: cfg.layout,
            repetitions: cfg.repetitions,
            task_configuration: cfg.task_configuration,
            output_object: new Browser_IO(),
            measurement: this_measurement,
            finish_function:  (exp: Code_Experiment_Definition) => {
                document.removeEventListener("keydown", key_forwarder);
                save_file_in_html("experimentdata", exp.generate_csv_data());
            }
        }
    );

    let key_forwarder = (e)=> {
        let key_string = key_event_string(e);
        experiment_automata.input(key_string);
    }

    document.addEventListener("keydown", key_forwarder, false);

}
