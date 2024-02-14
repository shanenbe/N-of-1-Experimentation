"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Experimentation_js_1 = require("../modules/Experimentation/Experimentation.js");
var Browser_Output_Writer_js_1 = require("../modules/Experimentation/Browser_Output_Writer.js");
var Nouns_1 = require("../modules/Words/Nouns");
var Verbs_1 = require("../modules/Words/Verbs");
function set_nof1(map) {
    map['SET_SEED'] = Experimentation_js_1.SET_SEED;
    map['text_input'] = Experimentation_js_1.text_input;
    map['new_random_integer'] = Experimentation_js_1.new_random_integer;
    map['BROWSER_EXPERIMENT'] = Browser_Output_Writer_js_1.BROWSER_EXPERIMENT;
    map['text_input'] = Experimentation_js_1.text_input;
    map['new_random_integer'] = Experimentation_js_1.new_random_integer;
    map['Time_to_finish'] = Experimentation_js_1.Time_to_finish;
    map['Reaction_time'] = Experimentation_js_1.Reaction_Time;
    map['Nouns'] = Nouns_1.Nouns;
    map['Verbs'] = Verbs_1.Verbs;
} // @ts-ignore
set_nof1(Nof1);
