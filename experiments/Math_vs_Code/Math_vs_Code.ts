import {
    do_random_array_sort,
    Experiment_Output_Writer, random_array_element,
    text_input_experiment,
    Time_to_finish
} from "../../modules/Experimentation/Experimentation.js";
import {Task} from "../../modules/Experimentation/Task.js";
import {BROWSER_EXPERIMENT} from "../../modules/Experimentation/Browser_Output_Writer.js";
import {Alternatives, Freetext} from "../../modules/Automata_Forwarders/Questionnaire_Forwarder.js";
import {
    BinaryOperatorTree
} from "./Operator_Tree/BinaryOperatorTree.js";
import {BinaryTree, create_catalan_graphs} from "../../modules/CatalanGraphs.js";
import {create_operator_tree_on_num_divisions} from "./GraphCreation.js";
import {convert_string_to_html_string} from "../../modules/Utils.js";
import {Treatment} from "../../modules/Experimentation/Treatment.js";


    let NUMBER_OF_INNER_NODES_IN_CATALAN_GRAPHS = 7;
    let CATALAN_GRAPHS = create_catalan_graphs(NUMBER_OF_INNER_NODES_IN_CATALAN_GRAPHS);
    let RANDOM_CATALAN_GRAPHS = do_random_array_sort(CATALAN_GRAPHS);

    let graph_counter = 0;

function create_testable_tree(tree: BinaryTree):BinaryTree {
    tree = tree.clone();
    tree.push_leaves();
    tree.set_all_operator_values("^");
    tree.set_all_leave_values("X");
    let order = tree.call_by_value_order();
    let operations = order.filter(e => !e.is_leave());
    return tree;
}

function call_by_value_order(tree: BinaryTree) {
    let order = tree.call_by_value_order();
    let operations = order.filter(e => !e.is_leave());
    return operations;
}

function operator_order_string(tree:BinaryTree) {
    let arr = [];
    let source_string:string = tree.source_string();
    let counter = 1;
    for(let i=0; i < source_string.length; i++) {
        if(source_string[i]=="^")
            arr.push(counter++);
        else
            arr.push(" ");
    }
    return arr.join("");
}

function call_by_value_sequence_string(tree:BinaryTree):string {
    let inorder = tree.as_in_order_array().filter((e)=>!e.is_leave());
    let call_by_value_order = tree.call_by_value_order().filter((e)=>!e.is_leave());
    let arr = [];
    for(let t of call_by_value_order) {
        arr.push(inorder.indexOf(t) + 1);
    }
    return arr.join("");
}

    let experiment_configuration_function = (writer: Experiment_Output_Writer) => { return {

        experiment_name: "TestExperiment",
        seed: "42",

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
            { variable: "Representation",  treatments: ["Code"]},
            { variable: "Graph",  treatments: ["Dummy"]},
        ],
        repetitions: 2, //CATALAN_GRAPHS.length,

        measurement: Time_to_finish(text_input_experiment),

        task_configuration:    (t: Task) => {

            if(graph_counter>=429)
                graph_counter = 0;

            let this_graph:BinaryTree = RANDOM_CATALAN_GRAPHS[graph_counter];
            let term:BinaryTree = create_testable_tree(this_graph);
            t.treatment_combination[1] = new Treatment(t.treatment_combination[1].variable, term.source_string());
            //s.value = term.source_string();

            t.do_print_task = () => {
                writer.clear_stage();
                writer.print_html_on_stage("<div class='sourcecode'>" + convert_string_to_html_string(term.source_string()) + "</div>");
                writer.print_html_on_stage("<div class='sourcecode'>" + convert_string_to_html_string(operator_order_string(term))  + "</div>")
            };

            t.expected_answer = call_by_value_sequence_string(term);

            t.accepts_answer_function = (given_answer: string) => {
                return given_answer===t.expected_answer;
            };

            t.do_print_error_message = (given_answer: string) => {
                writer.clear_error();
                writer.print_on_input_response(given_answer);
                writer.print_html_on_error("<h1>Invalid answer: " + given_answer + "</h1>");
                writer.set_focus_on_input();
            };

            t.do_print_after_task_information = () => {
                let next_task_kind = (t.next_task()!=null)?"The next task is shown as " + t.next_task().treatment_combination[0].value + ".":"";
                writer.clear_stage();
                writer.print_string_on_stage(writer.convert_string_to_html_string(
                    "Correct.\n\n" +
                    "Please, take a short break of at least 5 seconds.\n\n" +
                    "Press [Enter] to go on. " + next_task_kind));
            }
            graph_counter++;
        }
    }};

    BROWSER_EXPERIMENT(experiment_configuration_function);
