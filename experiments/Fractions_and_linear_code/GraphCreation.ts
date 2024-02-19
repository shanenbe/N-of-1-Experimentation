import {
    do_random_array_sort, Experiment_Output_Writer, random_array_element
} from "../../modules/Experimentation/Experimentation.js";

import {Catalan_Node, create_catalan_graphs} from "../../modules/CatalanGraphs.js";
import {create_operation_tree_on_graph, create_random_term_list, Sum} from "./BinaryOperatorTrees.js";
import {
    array_of_values_to_logical_result,
    Logical_Results
} from "../../modules/LogicProgramming.js";

import {Task} from "../../modules/Experimentation/Task.js";
import {BROWSER_EXPERIMENT, Browser_Output_Writer} from "../../modules/Experimentation/Browser_Output_Writer.js";

let DEBUG = false;

// let catalan_graphs: Catalan_Node[] = create_catalan_graphs(6);
// for(let counter=1; counter <= 10; counter++) {
//     let random_tree = random_array_element(catalan_graphs);
//     let random_term_list = create_random_term_list(3);
//     let operation_tree = create_operation_tree_on_graph(random_term_list, random_tree);
//     let solution_tree = operation_tree.create_random_solution_tree();
//     let source = solution_tree.generate_source_code_string();
//     console.log(source + " = " + solution_tree.result);
// }
// console.log("done");

// function create_arithmetic_term(number_of_occurances_each_operation_type: number): SolutionTree {
//
//     let operation_list = [];
//     for(let i = 1; i <= number_of_occurances_each_operation_type; i++) {
//         operation_list.push(random_array_element([Sum, Difference, Multiplication]));
//         operation_list.push(Division);
//     }
//     operation_list = do_random_array_sort(operation_list);
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
//
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

//
// let LEAF = (nodeFct) => nodeFct(null, null);
// let POWER = MathNode_CreationFunction(Power);
// let ROOT = MathNode_CreationFunction(NthRoot);
// let SUM = MathNode_CreationFunction(Sum);
// let DIFF = MathNode_CreationFunction(Difference);
// let MULT = MathNode_CreationFunction(Multiplication);
// let DIV = MathNode_CreationFunction(Division);
//
//
// function test_result_generation() {
//     let results: Logical_Results = new Logical_Results(3);
//     // LEAF(POWER).results(results);
//     // is_true(results.solutions().length === MathPower.CONSTRAINTS.length, "All solutions for power")
//     //
//     // results = new Logical_Results(3);
//     // LEAF(ROOT).results(results);
//     // is_true(results.solutions().length === MathPower.CONSTRAINTS.length, "All solutions for root")
//
//
//     results = new Logical_Results(3);
//     DIFF(ROOT(LEAF(POWER), LEAF(SUM)), ROOT(LEAF(POWER), LEAF(SUM)))
//         .results(results);
//     results.do_print();
//
//     let node:SolutionTree = create_arithmetic_term(4);
//     console.log(node.functional_code_string());
//     console.log(node.mathjax_code_string());
//
//
// }
//



/*
// generate_expressions(results,accepted_results, 5);
// results.forEach((v) => v.print_on_console());

/** In case you care for it: Here is the Prolog program that shows how similar stuff can be done in Prolog

 power(Basis, Exponent, Result) :-
 between(2, 10, Basis),
 Exponent is 2,
 Result is Basis ** Exponent,
 Result =< 100.

 power(Basis, Exponent, Result) :-
 between(2, 5, Basis),
 Exponent is 3,
 Result is Basis ** Exponent,
 Result =< 125.

 route(Radikant, Exponent, Result) :-
 power(Result, Exponent, Radikant).

 addition(N1, N2, Sum) :-
 between(1, 30, N1),
 between(1, 30, N2),
 Sum is N1 + N2.

 ?-addition(A,B,C), power(D, E, A), route(F, G, B), addition(H, I, G).
 */