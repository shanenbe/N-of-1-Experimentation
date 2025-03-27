import { Automata_Configurator } from "../Automata/Automata_Configurator";
import { Experimentation_Forwarder } from "./Experimentation_Forwarder";
import { Measurement_Type, Output_Command } from "../Experimentation/Experimentation";
import { Experiment_Definition } from "../Experimentation/Experiment_Definition";
import { Training_Configuration } from "../Experimentation/Training_Configuration";
export declare class Training_Execution_Forwarder extends Experimentation_Forwarder {
    training_configuration: Training_Configuration;
    constructor(pre_run_instructions: Output_Command, training_configuration: Training_Configuration, experiment_definition: Experiment_Definition, measurement: Measurement_Type);
    print_cancel_text(): void;
    automata_configurator(): Automata_Configurator;
    transitions(): import("../Automata/Transitions").Transition[];
    input(s: string): void;
    init_experiment(): void;
}
