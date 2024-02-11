// SET_SEED("42");
//
// import {create_browser_text_experiment} from "../../modules/Experimentation/functions/Browser_Server_Code_Experiment.js";
// import {
//     do_random_array_sort, Experiment_Output_Writer, Free_Text,
//     new_random_integer,
//     Random, random_array_element,
//     SET_SEED, text_input, Time_to_finish
// } from "../../modules/Experimentation/Experimentation.js";
// import collect from 'collect.js';
// import {information, alternatives, free_text, html_line} from "../modules/Books/IO_Object.js";
// import {Catalan_Node, create_catalan_graphs} from "../../modules/CatalanGraphs.js";
// import {
//     array_of_rows_to_logical_result,
//     array_of_values_to_logical_result,
//     Binding,
//     Logical_Results
// } from "../../modules/LogicProgramming.js";
// import {is_true} from "../../modules/Testing.js";
// import {Task} from "../../modules/Experimentation/Task.js";
// import {BROWSER_EXPERIMENT, Browser_Output_Writer} from "../../modules/Experimentation/Browser_Output_Writer.js";
//
// let DEBUG = false;
//
// let catalan_graphs = create_catalan_graphs(8);
//
// function create_arithmetic_term(number_of_occurances_each_operation_type: number): SolutionTree {
//
//     let operation_types = [
//                                 [Sum, Difference, Multiplication],
//                                 [Division]
//                           ];
//
//     let operators = [];
//     for(let counter = 0; counter < number_of_occurances_each_operation_type; counter++) {
//         for (let this_operation_type_array of operation_types) {
//             operators.push(random_array_element(this_operation_type_array));
//         }
//     }
//
//     let operation_tree = null;
//
//     while (operation_tree == null) {
//         operators = do_random_array_sort(operators);
//         operation_tree = create_operation_tree(operators);
//     }
//
//     return operation_tree.create_random_solution_tree();
// }
//
// function create_operation_tree(operator_list): MathBinaryOperator {
//     let result_tree:MathBinaryOperator =
//         push_operations_into_tree(
//                             [...operator_list],
//                                     random_array_element(catalan_graphs)
//                                   );
//
//     if (result_tree.is_solvable() && result_tree.is_valid())
//         return result_tree;
//     else
//         return null;
// }
//
// function push_operations_into_tree(operations:any[], graph:Catalan_Node):MathBinaryOperator {
//     let this_operator = operations.shift();
//     let node:MathBinaryOperator = new this_operator(graph);
//     graph.content = node;
//     node.add_operations_to_tree(operations);
//     return node;
// }
//
// abstract class MathBinaryOperator {
//     catalan_node: Catalan_Node;
//
//     constructor(catalan_node: Catalan_Node) {
//         this.catalan_node = catalan_node;
//     }
//
//     left_math_term(): MathBinaryOperator {
//         if((this.catalan_node).left===null)
//             return null;
//         return ((this.catalan_node).left).content as MathBinaryOperator;
//     }
//
//     right_math_term(): MathBinaryOperator {
//         if((this.catalan_node).right===null)
//             return null;
//         return ((this.catalan_node).right).content as MathBinaryOperator;
//     }
//
//     abstract results(bindings_basis_exponent_result: Logical_Results);
//
//     solve_child(child: MathBinaryOperator) {
//         if(child === null) {
//             return new Logical_Results(3);
//         } else {
//             let ret = new Logical_Results(3);
//             child.results(ret);
//             return ret;
//         }
//     }
//
//     is_solvable():boolean {
//         let r = new Logical_Results(3);
//         this.results(r);
//         return r.rows.length > 0;
//     }
//
//     add_operations_to_tree(operations: any[]):void {
//
//         for(let child of [this.catalan_node.left, this.catalan_node.right]) {
//             if (child != null) {
//                 let this_operator = operations.shift();
//                 let node: MathBinaryOperator = new this_operator(child);
//                 child.content = node;
//                 node.add_operations_to_tree(operations)
//             }
//         }
//     }
//
//     create_random_solution_tree(): SolutionTree {
//             let result = new Logical_Results(3);
//             this.results(result);
//             // if(result.rows.length==1 && result.rows[0]==undefined) {
//             //     this.results(result);
//             //     console.log("something is wrong");
//             // }
//             let new_result = result.random_result_for_column(2);
//             // if (new_result.rows.length==1 && new_result.rows[0]==undefined) {
//             //     new_result = result.random_result_for_column(2);
//             //     console.log("something is wrong");
//             // }
//             // try {
//                 return this.create_random_solution_tree_with_results(new_result);
//             // } catch (ex) {
//             //     let new_result = result.random_result_for_column(2);
//             //     return this.create_random_solution_tree_with_results(new_result);
//             //     throw ex;
//             // }
//     }
//     create_random_solution_tree_with_results(result:Logical_Results): SolutionTree {
//         if(result.rows.length==0) {
//             throw "bad error";
//         }
//         // if(result.rows.length==1 && result.rows[0]==undefined) {
//         //     throw "bad error";
//         // }
//         let left_solution = this.solve_child(this.left_math_term());
//         // if (left_solution.rows.length==0 ) {
//         //     left_solution = this.solve_child(this.left_math_term());
//         //     console.log("something is wrong");
//         // }
//
//         let right_solution = this.solve_child(this.right_math_term());
//         result.unify_results(left_solution, [0], [2]);
//         // if(result.rows.length==0) {
//         //     throw "bad error";
//         // }
//
//         result.unify_results(right_solution, [1], [2]);
//
//         let left_random_result: Logical_Results = left_solution.random_result_for_column(2);
//         // if(left_random_result.rows.length==1 && left_random_result.rows[0]==undefined) {
//         //     left_random_result = left_solution.random_result_for_column(2);
//         // }
//
//
//
//         let right_random_result: Logical_Results = right_solution.random_result_for_column(2);
//
//         let left_child = null;
//         if(this.left_math_term()!=null)
//             left_child = this.left_math_term().create_random_solution_tree_with_results(left_random_result);
//         else
//             left_child = new SolutionTree(null, left_random_result.rows[0].values[2]);
//
//         let right_child = null;
//         if(this.right_math_term()!=null)
//             right_child = this.right_math_term().create_random_solution_tree_with_results(right_random_result);
//         else
//             right_child = new SolutionTree(null, right_random_result.rows[0].values[2]);
//
//         let ret = new SolutionTree(this, result.rows[0].values[2]);
//         ret.children = [left_child, right_child];
//
//         return ret;
//
//     }
//
//     is_valid():boolean {
//         let left_correct = true;
//
//         if( this.left_math_term() != null) {
//             left_correct = this.left_math_term().is_valid();
//         }
//
//         let right_correct = true;
//
//         if( this.right_math_term() != null)
//             right_correct = this.right_math_term().is_valid();
//
//         return left_correct && right_correct;
//     }
//
// }
//
// class SolutionTree {
//     result:number=null;
//     math_node: MathBinaryOperator = null;
//
//     constructor(math_node: MathBinaryOperator, result: number) {
//         this.math_node = math_node;
//         this.result = result;
//
//     }
//
//     children:SolutionTree[] = [];
//
//     dispatch(typeDispatcher, invoker) {
//         if(typeDispatcher[this.math_node.constructor.name]!=null)
//             invoker(typeDispatcher[this.math_node.constructor.name], invoker);
//         else
//             invoker(typeDispatcher["NONE"], invoker);
//     }
//
//     functional_code_string() {
//         let arr = [];
//         this.functional_code(arr);
//         return arr.join("");
//     }
//
//
//     functional_code_on_simple_operator(arr, operator_string) {
//         this.functional_code_on_child_with_possible_braces(arr, this.children[0]);
//         arr.push(" " + operator_string + " ");
//         this.functional_code_on_child_with_possible_braces(arr, this.children[1]);
//     }
//
//
//     functional_code_on_child_with_possible_braces(arr, child:SolutionTree) {
//         if(child.children.length!=0) {
//             arr.push("(");
//         }
//         child.functional_code(arr);
//         if(child.children.length!=0) {
//             arr.push(")");
//         }
//     }
//
//     functional_code(arr) {
//         let type_name:string =
//             this.math_node != null ?
//                 this.math_node.constructor.name:
//                 "NONE";
//         let target_method = "functional_code_" + type_name.toLowerCase();
//         this[target_method](arr);
//     }
//
//
//     functional_code_on_non_simple_binary_operator(arr, operator_string) {
//         arr.push(operator_string + "(");
//         this.functional_code_on_child_with_possible_braces(arr, this.children[0]);
//         arr.push(", ");
//         this.functional_code_on_child_with_possible_braces(arr, this.children[1]);
//         arr.push(")");
//     }
//
//
//     functional_code_nthroot(arr) {
//         this.functional_code_on_non_simple_binary_operator(arr, "root");
//     }
//
//
//
//     functional_code_power(arr) {
//         this.functional_code_on_non_simple_binary_operator(arr, "power");
//     }
//
//
//     functional_code_multiplication(arr) {
//         this.functional_code_on_simple_operator(arr, "*");
//     }
//
//
//     functional_code_division(arr) {
//         this.functional_code_on_simple_operator(arr, "/");
//     }
//
//
//     functional_code_sum(arr) {
//         this.functional_code_on_simple_operator(arr, "+");
//     }
//
//
//     functional_code_none(arr) {
//         arr.push(this.result);
//     }
//
//
//
//
//     mathjax_code_string() {
//         let arr = [];
//         this.mathjax_code(arr);
//         return arr.join("");
//     }
//
//     mathjax_code(arr) {
//         let type_name:string =
//             this.math_node != null ?
//                 this.math_node.constructor.name:
//                 "NONE";
//         let target_method = "mathjax_code_" + type_name.toLowerCase();
//         this[target_method](arr);
//     }
//
//     mathjax_code_on_simple_operator(arr, operator_string) {
//         this.mathjax_code_on_child_with_possible_braces_on_different_type(arr, this.children[0]);
//         arr.push(" " + operator_string + " ");
//         this.mathjax_code_on_child_with_possible_braces_on_different_type(arr, this.children[1]);
//     }
//
//
//     mathjax_code_on_child_with_possible_braces(arr, child:SolutionTree) {
//         if(child.children.length!=0) {
//             arr.push("{");
//         }
//         child.mathjax_code(arr);
//         if(child.children.length!=0) {
//             arr.push("}");
//         }
//     }
//
//     requires_brackets(child: SolutionTree) {
//         if (child.math_node == null)
//             return false;
//
//         return ["Sum", "Difference", "Multiplication"].includes(child.math_node.constructor.name) && this.math_node.constructor.name != child.math_node.constructor.name;
//     }
//
//     mathjax_code_on_child_with_possible_braces_on_different_type(arr, child:SolutionTree) {
//
//         let needs_curly_brackets =
//             child.children.length!=0;
//
//         let needs_round_brackets:boolean =
//             needs_curly_brackets && (this.requires_brackets(child));
//
//         if(needs_curly_brackets) {
//             arr.push("{");
//         }
//
//         if(needs_round_brackets) {
//             arr.push("(");
//         }
//
//
//         child.mathjax_code(arr);
//
//         if(needs_round_brackets) {
//             arr.push(")");
//         }
//
//         if(needs_curly_brackets) {
//             arr.push("}");
//         }
//
//     }
//
//
//     mathjax_code_power(arr) {
//         let basis = this.children[0];
//
//         if(basis.children.length!=0) {
//             arr.push("{");
//         }
//
//         if(this.requires_brackets(basis) ) {
//             arr.push("(");
//         }
//
//         basis.mathjax_code(arr);
//
//         if(this.requires_brackets(basis)) {
//             arr.push(")");
//         }
//
//         if(basis.children.length!=0) {
//             arr.push("}");
//         }
//
//         arr.push("^");
//
//         let exponent = this.children[1];
//
//         if(exponent.children.length!=0) {
//             arr.push("{(");
//         }
//
//         exponent.mathjax_code(arr);
//
//         if(exponent.children.length!=0) {
//             arr.push(")}");
//         }
//     }
//
//     mathjax_code_nthroot(arr) {
//         arr.push("\\sqrt[");
//         this.mathjax_code_on_child_with_possible_braces(arr, this.children[1]);
//         arr.push("\\;]{");
//         this.mathjax_code_on_child_with_possible_braces(arr, this.children[0]);
//         arr.push("\\;}");
//     }
//
//     mathjax_code_multiplication(arr) {
//         this.mathjax_code_on_simple_operator(arr, "\\times");
//     }
//
//     mathjax_code_division(arr) {
//         arr.push("\\frac{");
//         let numerator = this.children[0];
//
//         if(numerator.math_node != null && numerator.math_node.constructor.name == "Division")
//             arr.push("(");
//
//         numerator.mathjax_code(arr);
//
//         if(numerator.math_node != null && numerator.math_node.constructor.name == "Division")
//             arr.push(")");
//
//         arr.push("}{");
//
//         let denumerator = this.children[1];
//         if(denumerator.math_node != null && denumerator.math_node.constructor.name == "Division")
//             arr.push("(");
//
//         denumerator.mathjax_code(arr);
//
//         if(denumerator.math_node != null && denumerator.math_node.constructor.name == "Division")
//             arr.push(")");
//
//         arr.push("}");
//
//     }
//
//
//     mathjax_code_sum(arr) {
//         this.mathjax_code_on_simple_operator(arr, "+");
//     }
//
//     functional_code_difference(arr) {
//         this.functional_code_on_simple_operator(arr, "-");
//     }
//
//     mathjax_code_difference(arr) {
//         this.mathjax_code_on_simple_operator(arr, "-");
//     }
//
//     mathjax_code_none(arr) {
//         arr.push(this.result);
//     }
//
// }
//
//
// class Power extends MathBinaryOperator {
//     static CONSTRAINTS =            [
//                                         [2, 2, 4],          [3, 2, 9],
//                                         [4, 2, 16],         [5, 2, 25],         [6, 2, 36],
//                                         [7, 2, 49],         [8, 2, 64],         [9, 2, 81],
//                                         [10, 2, 100],
//                                         [2, 3, 8],          [3, 3, 27],
//                                         [4, 3, 64],         [5, 3, 125],
//                                     ];
//     //[1, 2, 1],
//     //[1, 3, 1],
//
//     results(results: Logical_Results) {
//         let all_results:Logical_Results = array_of_values_to_logical_result(3, Power.CONSTRAINTS);
//
//         let basis_results = this.solve_child(this.left_math_term());
//         let exponent_results = this.solve_child(this.right_math_term());
//
//         all_results.unify_results(basis_results, [0], [2]);
//         all_results.unify_results(exponent_results, [1], [2]);
//         results.unify_results(all_results, [0,1,2], [0,1,2]);
//     }
//
//     is_valid(): boolean {
//         if(this.left_math_term() == null)
//             return false;
//         else
//             return super.is_valid();
//     }
// }
//
// class NthRoot extends Power {
//
//     results(results: Logical_Results) {
//         try {
//             let all_results: Logical_Results = array_of_values_to_logical_result(3, Power.CONSTRAINTS);
//
//             let basis_results = this.solve_child(this.left_math_term());
//             let exponent_results = this.solve_child(this.right_math_term());
//
//             all_results.unify_results(basis_results, [2], [2]);
//             all_results.unify_results(exponent_results, [1], [2]);
//             results.unify_results(all_results, [0, 1, 2], [2, 1, 0]);
//         } catch (ex) {
//             throw ex;
//         }
//     }
//
//     is_valid(): boolean {
//         if(this.left_math_term() == null)
//             return false;
//         else
//             return super.is_valid();
//     }
//
// }
//
// class Sum extends MathBinaryOperator {
//     static CONSTRAINTS:any[] = (() => {
//         let results = [];
//         for (let left_counter = 1; left_counter < 30; left_counter++) {
//             for (let right_counter = 1; left_counter + right_counter <= 30; right_counter++) {
//                 results.push([left_counter, right_counter, left_counter + right_counter]);
//             }
//         }
//         return results;
//     })();
//
//     results(results: Logical_Results) {
//         let all_results = Logical_Results.Logical_Results_FROM_SOLUTION_ARRAY(3, Sum.CONSTRAINTS);
//
//         let left_results = this.solve_child(this.left_math_term());
//         let right_results = this.solve_child(this.right_math_term());
//
//         all_results.unify_results(left_results, [0], [2]);
//         all_results.unify_results(right_results, [1], [2]);
//         results.unify_results(all_results, [0,1,2], [0,1,2]);
//     }
//
//
// }
//
// class Difference extends Sum {
//     results(results: Logical_Results) {
//         let all_results = Logical_Results.Logical_Results_FROM_SOLUTION_ARRAY(3, Sum.CONSTRAINTS);
//
//         let left_results = this.solve_child(this.left_math_term());
//         let right_results = this.solve_child(this.right_math_term());
//
//         all_results.unify_results(left_results, [2], [2]);
//         all_results.unify_results(right_results, [1], [2]);
//         results.unify_results(all_results, [0,1,2], [2,1,0]);
//     }
//
// }
//
//
//
//
// class Multiplication extends MathBinaryOperator {
//
//     static CONSTRAINTS:any[] = (() => {
//         let results = [];
//         for (let left_counter = 1; left_counter <= 10; left_counter++) {
//             for (let right_counter = 1; right_counter <= 10; right_counter++) {
//                 results.push([left_counter, right_counter, left_counter * right_counter]);
//             }
//         }
//         return results;
//     })();
//
//     results(results: Logical_Results) {
//         let all_results = Logical_Results.Logical_Results_FROM_SOLUTION_ARRAY(3, Multiplication.CONSTRAINTS);
//
//         let left_results = this.solve_child(this.left_math_term());
//         let right_results = this.solve_child(this.right_math_term());
//
//         all_results.unify_results(left_results, [0], [2]);
//         all_results.unify_results(right_results, [1], [2]);
//         results.unify_results(all_results, [0,1,2], [0,1,2]);
//     }
//
// }
//
// class Division extends Multiplication {
//
//     results(results: Logical_Results) {
//         let all_results = Logical_Results.Logical_Results_FROM_SOLUTION_ARRAY(3, Multiplication.CONSTRAINTS);
//
//         let left_results = this.solve_child(this.left_math_term());
//         let right_results = this.solve_child(this.right_math_term());
//
//         all_results.unify_results(left_results, [2], [2]);
//         all_results.unify_results(right_results, [1], [2]);
//         results.unify_results(all_results, [0,1,2], [2,1,0]);
//     }
// }
//
// function MathNode_CreationFunction(type) {
//     return (left:MathBinaryOperator, right:MathBinaryOperator) =>
// {
//     let l: Catalan_Node = (left === null) ? null : left.catalan_node;
//     let r: Catalan_Node = (right === null) ? null : right.catalan_node;
//     let ret = new Catalan_Node(l, r);
//     ret.content = new type(ret);
//     return ret.content;
// }
// }
// //
// // let LEAF = (nodeFct) => nodeFct(null, null);
// // let POWER = MathNode_CreationFunction(Power);
// // let ROOT = MathNode_CreationFunction(NthRoot);
// // let SUM = MathNode_CreationFunction(Sum);
// // let DIFF = MathNode_CreationFunction(Difference);
// // let MULT = MathNode_CreationFunction(Multiplication);
// // let DIV = MathNode_CreationFunction(Division);
// //
// //
// // function test_result_generation() {
// //     let results: Logical_Results = new Logical_Results(3);
// //     // LEAF(POWER).results(results);
// //     // is_true(results.solutions().length === MathPower.CONSTRAINTS.length, "All solutions for power")
// //     //
// //     // results = new Logical_Results(3);
// //     // LEAF(ROOT).results(results);
// //     // is_true(results.solutions().length === MathPower.CONSTRAINTS.length, "All solutions for root")
// //
// //
// //     results = new Logical_Results(3);
// //     DIFF(ROOT(LEAF(POWER), LEAF(SUM)), ROOT(LEAF(POWER), LEAF(SUM)))
// //         .results(results);
// //     results.do_print();
// //
// //     let node:SolutionTree = create_arithmetic_term(4);
// //     console.log(node.functional_code_string());
// //     console.log(node.mathjax_code_string());
// //
// //
// // }
// //
// // test_result_generation();
//
// // if(!DEBUG) {
//
//     let experiment_configuration_function = (writer: Experiment_Output_Writer) => { return {
//
//         experiment_name: "TestExperiment",
//         seed: "42",
//         introduction_pages: [
//             "Please, open the browser in fullscreen mode (probably by pressing [F11])."
//         ],
//         pre_run_instructions:
//             "When you press [Enter] the tasks directly start.",
//         finish_pages: [
//             "Almost done. When you press [Enter], the experiment's data will be downloaded."
//         ],
//         layout: [
//             {
//                 variable: "Representation",
//                 treatments: ["Code", "Math"]
//             }
//         ],
//         repetitions: 2,
//
//         measurement: Time_to_finish(text_input),
//
//         task_configuration:    (t: Task) => {
//         }
//     }};
//
//     BROWSER_EXPERIMENT(experiment_configuration_function);
//
//         // ()writer: Experiment_Output_Writer) =>
//         //     { return {
//             // experiment_name: "TestExperiment",
//                 // seed: "42",
//                 //
//                 // introduction_pages: [
//                 //     "Please, open the browser in fullscreen mode (probably by pressing [F11])."
//                 // ],
//                 // pre_run_instruction:
//                 //     "When you press [Enter] the tasks directly start.",
//                 //
//                 // finish_pages: [
//                 //     "Almost done. When you press [Enter], the experiment's data will be downloaded."
//                 // ],
//                 // layout: [
//                 //     {
//                 //         variable: "Representation",
//                 //         treatments: ["Code", "Math"]
//                 //     }
//                 // ],
//                 //
//                 // repetitions: 1,
//                 //
//                 // measurement: Time_to_finish(text_input),
//         //
//     //             task_configuration
//     //     :
//     //         (t: Task) => {
//     //
//     //             let term: SolutionTree = create_arithmetic_term(4);
//     //
//     //             t.do_print_task = () => {
//     //                 //
//     //                 //         // @ts-ignore
//     //                 //         document.n_of_1.clear_screen();
//     //                 //         if (t.treatment_combination[0].value == "Math") {
//     //                 //             // @ts-ignore
//     //                 //             document.n_of_1.add_node_to_stage(document.createTextNode("$$" + term.mathjax_code_string() + "  $$"));
//     //                 //
//     //                 //             // @ts-ignore
//     //                 //             MathJax.typeset();
//     //                 //         } else {
//     //                 //             // @ts-ignore
//     //                 //             document.n_of_1.print_string_on_stage(term.functional_code_string());
//     //                 //         }
//     //                 //         // @ts-ignore
//     //                 //         document.n_of_1.add_node_to_stage(document.createElement("br"));
//     //                 //         // @ts-ignore
//     //                 //         document.n_of_1.create_input();
//     //                 //     }
//     //                 //
//     //                 //     t.do_print_between_tasks = () => {
//     //                 //         // @ts-ignore
//     //                 //         document.n_of_1.clear_screen();
//     //                 //     };
//     //                 //
//     //                 //     t.accepts_answer_function = () => {
//     //                 //         return (document.getElementById("INPUT") as HTMLInputElement).value == "Stefan";
//     //                 //     };
//     //                 //
//     //                 //     t.do_print_error_message = () => {
//     //                 //         // @ts-ignore
//     //                 //         document.n_of_1.clear_screen();
//     //                 //         t.do_print_task();
//     //                 //         let text_node = document.createTextNode("My Error Message");
//     //                 //         // @ts-ignore
//     //                 //         document.n_of_1.add_node_to_error(text_node);
//     //             }
//     //         }
//     //     }
//     // });
// // }
//
//
// // generate_expressions(results,accepted_results, 5);
// // results.forEach((v) => v.print_on_console());
//
// /** In case you care for it: Here is the Prolog program that shows how similar stuff can be done in Prolog
//
//  power(Basis, Exponent, Result) :-
//  between(2, 10, Basis),
//  Exponent is 2,
//  Result is Basis ** Exponent,
//  Result =< 100.
//
//  power(Basis, Exponent, Result) :-
//  between(2, 5, Basis),
//  Exponent is 3,
//  Result is Basis ** Exponent,
//  Result =< 125.
//
//  route(Radikant, Exponent, Result) :-
//  power(Result, Exponent, Radikant).
//
//  addition(N1, N2, Sum) :-
//  between(1, 30, N1),
//  between(1, 30, N2),
//  Sum is N1 + N2.
//
//  ?-addition(A,B,C), power(D, E, A), route(F, G, B), addition(H, I, G).
//  */