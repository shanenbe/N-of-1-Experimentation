import { Experimentation_Forwarder } from "./Experimentation_Forwarder";
import { Measurement_Type, Output_Command } from "../Experimentation/Experimentation";
import { Experiment_Definition } from "../Experimentation/Experiment_Definition";
export declare class Experiment_Forwarder extends Experimentation_Forwarder {
    constructor(pre_run_instructions: Output_Command, experiment_definition: Experiment_Definition, measurement: Measurement_Type);
}
