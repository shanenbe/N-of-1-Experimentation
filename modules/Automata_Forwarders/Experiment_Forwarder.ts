import {Experimentation_Forwarder} from "./Experimentation_Forwarder.js";
import {Measurement_Type, Output_Command} from "../Experimentation/Experimentation.js";
import {Experiment_Definition} from "../Experimentation/Experiment_Definition.js";

export class Experiment_Forwarder extends  Experimentation_Forwarder{
    constructor(pre_run_instructions: Output_Command,
                experiment_definition: Experiment_Definition,
                measurement: Measurement_Type)
    {
        super(
            "Main Experiment",
            ()=> {
                pre_run_instructions();
                measurement.output_writer().print_html_on_stage("<hr>" +
                    "Press [Enter] to start the experiment.");
            },
            ()=> {
                measurement.output_writer().print_html_on_stage(
                    "You finished the experiment phase.<hr>" +
                    "Please, press [Enter] to go to the next phase.<br>"
                )},
            experiment_definition,
            measurement);
    }
}