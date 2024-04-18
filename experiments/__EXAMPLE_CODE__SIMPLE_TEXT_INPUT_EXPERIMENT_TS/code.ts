import {
    do_random_array_sort,
    Experiment_Output_Writer, keys, random_array_element, Reaction_Time, Reaction_Time_With_Penalty, SET_SEED,
    text_input_experiment,
    Time_to_finish
} from "../../modules/Experimentation/Experimentation.js";
import {Task} from "../../modules/Experimentation/Task.js";
import {BROWSER_EXPERIMENT} from "../../modules/Experimentation/Browser_Output_Writer.js";
import {Alternatives, Freetext} from "../../modules/Automata_Forwarders/Questionnaire_Forwarder.js";
import {BinaryTree, create_catalan_graphs} from "../../modules/CatalanGraphs.js";
import {convert_string_to_html_string} from "../../modules/Utils.js";
import {Treatment} from "../../modules/Experimentation/Treatment.js";

let SEED = "666";
SET_SEED(SEED);


    let experiment_configuration_function = (writer: Experiment_Output_Writer) => { return {

        experiment_name: "TestExperiment",
        seed: SEED,

        introduction_pages: writer.stage_string_pages_commands([
            writer.convert_string_to_html_string(
                "Please, just do this experiment only, when you have enough time, are concentrated enough, and motivated enough.\n\nPlease, open the browser in fullscreen mode (probably by pressing [F11])."),
            writer.convert_string_to_html_string(
                "In this experiment, you will be asked to manually compute the result of an mathematical term.\n\nDon't worry, the terms are not too complex.")
        ]),

        pre_run_training_instructions: writer.string_page_command(
            writer.convert_string_to_html_string(
                "You entered the training phase."
            )),

        pre_run_experiment_instructions: writer.string_page_command(
            writer.convert_string_to_html_string(
                "You entered the experiment phase.\n\n"
        )),

        finish_pages: [
            writer.string_page_command(
                writer.convert_string_to_html_string(
                "Almost done. Next, the experiment data will be downloaded. Please, send the " +
                "downloaded file to the experimenter.\n\nAfter sending your email, you can close this window.\n\nMany thanks for participating in the experiment."
                )
            )
        ],

        post_questionnaire: [
            new Freetext("Name","What's your name?"),
            new Freetext("Age","How old are you?"),
            new Alternatives("Status","What is your current working status?",
                ["Undergraduate student (BSc not yet finished)", "Graduate student (at least BSc finished)", "PhD student", "Professional software developer", "Teacher", "Other"]),
            new Freetext("Experience","How many years of working experience in software industry to you have?"),
            new Freetext("LoC","How many lines of code do you think you write each day on average?"),
        ],

        layout: [
            { variable: "Dummy",  treatments: ["X"]},
        ],

        repetitions: 1, //CATALAN_GRAPHS.length,

        measurement: Time_to_finish(text_input_experiment),

        task_configuration:    (t: Task) => {


            t.do_print_task = () => {
                writer.clear_stage();
                writer.print_html_on_stage("<div class='sourcecode'> This is some code. Write abc </div>");
            };

            t.expected_answer = "abc";

            t.accepts_answer_function = (given_answer: string) => {
                return given_answer===t.expected_answer;
            };

            t.do_print_error_message = (given_answer: string) => {
                writer.clear_stage();
                writer.clear_error();
                writer.print_html_on_error("<h1>Invalid answer: " + given_answer + "</h1>");
            };

            t.do_print_after_task_information = () => {
                writer.clear_error();
                writer.print_string_on_stage(writer.convert_string_to_html_string(
                    "Correct.\n\n" +
                    "In case, you feel not concentrated enough, make a short break.\n\n" +
                    "Press [Enter] to go on. "));
            }
        }
    }};

    BROWSER_EXPERIMENT(experiment_configuration_function);
