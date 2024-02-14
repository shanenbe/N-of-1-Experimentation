import {
    Experiment_Output_Writer, new_random_integer, Random, Reaction_Time,
    SET_SEED,
    text_input,
    Time_to_finish
} from "../modules/Experimentation/Experimentation.js";
import {Task} from "../modules/Experimentation/Task.js";
import {BROWSER_EXPERIMENT} from "../modules/Experimentation/Browser_Output_Writer.js";
import {Nouns} from "../modules/Words/Nouns";
import {Verbs} from "../modules/Words/Verbs";

function set_nof1(map) {
    map['SET_SEED'] = SET_SEED;
    map['text_input'] = text_input;
    map['new_random_integer'] = new_random_integer;
    map['BROWSER_EXPERIMENT'] = BROWSER_EXPERIMENT;
    map['text_input'] = text_input;
    map['new_random_integer'] = new_random_integer;
    map['Time_to_finish'] = Time_to_finish;
    map['Reaction_time'] = Reaction_Time;
    map['Nouns'] = Nouns;
    map['Verbs'] = Verbs;
} // @ts-ignore
set_nof1(Nof1);

