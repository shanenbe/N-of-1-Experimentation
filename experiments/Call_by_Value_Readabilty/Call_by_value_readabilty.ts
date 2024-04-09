import {
    do_random_array_sort,
    Experiment_Output_Writer, keys, random_array_element, Reaction_Time, SET_SEED,
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
let SEED = "666";
SET_SEED(SEED);

let NUMBER_OF_INNER_NODES_IN_CATALAN_GRAPHS = 7;
let CATALAN_GRAPHS = create_catalan_graphs(NUMBER_OF_INNER_NODES_IN_CATALAN_GRAPHS);
let RANDOM_CATALAN_GRAPHS = do_random_array_sort(CATALAN_GRAPHS);
let TEST_GRAPHS = [];

for(let t = 0; t < CATALAN_GRAPHS.length; t++) {
    for(let i = 1; i<= 7; i++) {
           let tree = create_testable_tree(RANDOM_CATALAN_GRAPHS[t]);
           TEST_GRAPHS.push([tree, i]);
    }
}


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

function next_call_by_value_operator(tree:BinaryTree, index:number):number {
    let inorder = tree.as_in_order_array().filter((e)=>!e.is_leave());
    let call_by_value_order = tree.call_by_value_order().filter((e)=>!e.is_leave());

    let source_node = inorder[index-1];

    let call_by_value_index = call_by_value_order.indexOf(source_node);

    let tree_string = tree.source_string();
    let result = -1;
    if(call_by_value_index==6)
        result = 0;
    else {
        result = inorder.indexOf(call_by_value_order[call_by_value_index + 1]) + 1;
    }

    return result;
}

function source_string_with_highlighted_element(tree:BinaryTree, num: number) {
    let str = convert_string_to_html_string(tree.source_string());
    let counter = 1;
    let result = [];
    for(let c = 0; c < str.length; c++) {
        if(str[c] == "^") {
            if(counter == num) {
                result.push("<span style='color:red'>^</span>");
                counter++;
            } else {
                result.push("^");
                counter++;
            }
        } else {
            result.push(str[c]);
        }
    }
   return result.join("");
}

function call_by_value_next_operator_distance_from_nodeNum(tree:BinaryTree, nodeNum: number):number {
    let call_by_value_order = tree.call_by_value_order().filter((e)=>!e.is_leave());
    let in_order = tree.as_in_order_array().filter((e)=>!e.is_leave());

    let source = in_order[nodeNum-1];
    let source_call_by_value_index = call_by_value_order.indexOf(source);
    let source_in_order_pos = in_order.indexOf(source);

    if(source_call_by_value_index + 1 >= call_by_value_order.length) {
        return -1;
    }

    let target_node = call_by_value_order[source_call_by_value_index + 1];


    let root = common_root(source, target_node);
    let root_in_order_pos = in_order.indexOf(root);
    let target_in_order_pos = in_order.indexOf(target_node);

    // console.log(root.source_string());
    // console.log(source.source_string());
    // console.log(target_node.source_string());

    let source_distance = left_child_distance(root, source);
    let target_distance = right_child_distance(root, target_node);

    return source_distance + target_distance;



}
function call_by_value_next_operator_distance(tree:BinaryTree, operator: BinaryTree):number {
    let call_by_value_order = tree.call_by_value_order().filter((e)=>!e.is_leave());
    let source_index = call_by_value_order.indexOf(operator);
    return call_by_value_next_operator_distance_from_nodeNum(tree, source_index);
}

function right_child_distance(root: BinaryTree, end: BinaryTree) {
    if(end===root)
        return 0;

    let distance = 0;

    while(end!=root) {
        distance++;
        end = end.parent;

    }

    return distance;
}

function left_child_distance(root: BinaryTree, start: BinaryTree): number {
    if(start===root)
        return 0;

    let distance = 1;

    while(start!=root) {
        // console.log(start.source_string());
            if(start.is_left_child())
                distance *= node_complexity(start.right) + 1;
            else
                distance *= node_complexity(start.left) + 1;
            start = start.parent;
    }

    return distance;
}



function node_complexity(node: BinaryTree):number {
    // console.log(node.source_string());
    if (node===null) {
        return 0;
    } else {
        return node.number_of_inner_nodes();
    }
}


function common_root(from: BinaryTree, to: BinaryTree):BinaryTree {

    let ret_node = from;
    while(!ret_node.has_child(to))
        ret_node = ret_node.parent;

    return ret_node;
}

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
            { variable: "Representation",  treatments: ["Code"]},
            { variable: "Position",  treatments: ["1", "2", "3", "4", "5", "6", "7"]},
            { variable: "Graph",  treatments: ["Dummy"]},
        ],

        repetitions: CATALAN_GRAPHS.length,

        measurement: Reaction_Time(keys(["1", "2", "3", "4", "5", "6", "7", "0"])),

        task_configuration:    (t: Task) => {

            if(graph_counter>=TEST_GRAPHS.length)
                graph_counter = 0;

            let this_graph:BinaryTree = TEST_GRAPHS[graph_counter];
            let term:BinaryTree = this_graph[0];
            t.treatment_combination[2] = new Treatment(t.treatment_combination[2].variable, term.source_string());
            let position =  parseInt(t.treatment_combination[1].value);

            console.log(term.source_string() + "\n" + operator_order_string(term) + "\n" + position + "\n" + call_by_value_next_operator_distance_from_nodeNum(term, position) + "");
            // console.log(operator_order_string(term));
            // console.log(call_by_value_next_operator_distance_from_nodeNum(term, position));

            t.do_print_task = () => {
                writer.clear_stage();
                writer.print_html_on_stage("<div class='sourcecode'>" + source_string_with_highlighted_element(term, position) + "</div>");
                writer.print_html_on_stage("<div class='sourcecode'>" + convert_string_to_html_string(operator_order_string(term))  + "</div>")
                writer.print_html_on_stage("<div class='sourcecode'>distance: " + call_by_value_next_operator_distance_from_nodeNum(term, position)  + "</div>")
            };

            t.expected_answer = "" + next_call_by_value_operator(this_graph[0], this_graph[1]);

            t.accepts_answer_function = (given_answer: string) => {
                return given_answer===t.expected_answer;
            };

            t.do_print_error_message = (given_answer: string) => {
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
            graph_counter++;
        }
    }};

    BROWSER_EXPERIMENT(experiment_configuration_function);
