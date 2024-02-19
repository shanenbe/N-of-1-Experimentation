import {Catalan_Node, create_catalan_graphs} from "../../modules/CatalanGraphs.js";
import {array_of_values_to_logical_result, Logical_Results} from "../../modules/LogicProgramming.js";
import {do_random_array_sort, random_array_element} from "../../modules/Experimentation/Experimentation.js";


export function create_random_term_list(number_of_occurances: number):any[] {
    let operation_list = [];
    for(let i = 1; i <= number_of_occurances; i++) {
        operation_list.push(random_array_element([Sum, Difference, Multiplication]));
        operation_list.push(Division);
    }
    operation_list = do_random_array_sort(operation_list);
    return operation_list;
}


export function create_operation_tree_on_graph(operator_list:any[], catalan_graph: Catalan_Node): BinaryOperatorTree {
    let result_tree:BinaryOperatorTree =
        push_operations_into_tree(
            [...operator_list],
            catalan_graph
        );

    if (result_tree.is_solvable() && result_tree.is_valid())
        return result_tree;
    else
        return null;
}

function push_operations_into_tree(operations:any[], graph:Catalan_Node):BinaryOperatorTree {
    let this_operator = operations.shift();
    let node:BinaryOperatorTree = new this_operator(graph);
    graph.content = node;
    node.add_operations_to_tree(operations);
    return node;
}


export class SolutionOnBinaryOperatorTree {
    result:number=null;
    math_node: BinaryOperatorTree = null;

    constructor(math_node: BinaryOperatorTree, result: number) {
        this.math_node = math_node;
        this.result = result;
    }

    children:SolutionOnBinaryOperatorTree[] = [];

    generate_source_code_string() {
        let result = [];
        this.source_code_string(result);
        return result.join("");
    }

    generate_mathjax_code_string() {
        let result = [];
        this.mathjax_code_string(result);
        return result.join("");
    }

    source_code_string_with_brackets(arr:string[]) {
        arr.push("(");
        this.source_code_string(arr);
        arr.push(")");
    }

    mathjax_string_with_brackets(arr:string[]) {
        arr.push("(");
        this.mathjax_code_string(arr);
        arr.push(")");
    }

    source_code_string(arr:string[]) {
        if(this.math_node==null)
            arr.push(" " + this.result + " ");
        else {
            this.math_node.source_code_representation(this, arr);
        }
    }

    mathjax_code_string(arr:string[]) {
        if(this.math_node==null)
            arr.push(" " + this.result + " ");
        else {
            this.math_node.mathjax_string_representation(this, arr);
        }
    }

    is_kind(kind:string):boolean {
        if(kind=="Literal")
            return this.math_node==null;
        else
            return this.math_node.constructor.name==kind;
    }

    //
    // dispatch(typeDispatcher, invoker) {
    //     if(typeDispatcher[this.math_node.constructor.name]!=null)
    //         invoker(typeDispatcher[this.math_node.constructor.name], invoker);
    //     else
    //         invoker(typeDispatcher["NONE"], invoker);
    // }
    //
    // functional_code_string() {
    //     let arr = [];
    //     this.functional_code(arr);
    //     return arr.join("");
    // }
    //
    //
    // functional_code_on_simple_operator(arr, operator_string) {
    //     this.functional_code_on_child_with_possible_braces(arr, this.children[0]);
    //     arr.push(" " + operator_string + " ");
    //     this.functional_code_on_child_with_possible_braces(arr, this.children[1]);
    // }
    //
    //
    // functional_code_on_child_with_possible_braces(arr, child:SolutionOnBinaryOperatorTree) {
    //     if(child.children.length!=0) {
    //         arr.push("(");
    //     }
    //     child.functional_code(arr);
    //     if(child.children.length!=0) {
    //         arr.push(")");
    //     }
    // }
    //
    // functional_code(arr) {
    //     let type_name:string =
    //         this.math_node != null ?
    //             this.math_node.constructor.name:
    //             "NONE";
    //     let target_method = "functional_code_" + type_name.toLowerCase();
    //     this[target_method](arr);
    // }
    //
    //
    // functional_code_on_non_simple_binary_operator(arr, operator_string) {
    //     arr.push(operator_string + "(");
    //     this.functional_code_on_child_with_possible_braces(arr, this.children[0]);
    //     arr.push(", ");
    //     this.functional_code_on_child_with_possible_braces(arr, this.children[1]);
    //     arr.push(")");
    // }
    //
    //
    // functional_code_nthroot(arr) {
    //     this.functional_code_on_non_simple_binary_operator(arr, "root");
    // }
    //
    //
    //
    // functional_code_power(arr) {
    //     this.functional_code_on_non_simple_binary_operator(arr, "power");
    // }
    //
    //
    // functional_code_multiplication(arr) {
    //     this.functional_code_on_simple_operator(arr, "*");
    // }
    //
    //
    // functional_code_division(arr) {
    //     this.functional_code_on_simple_operator(arr, "/");
    // }
    //
    //
    // functional_code_sum(arr) {
    //     this.functional_code_on_simple_operator(arr, "+");
    // }
    //
    //
    // functional_code_none(arr) {
    //     arr.push(this.result);
    // }
    //
    // mathjax_code_string() {
    //     let arr = [];
    //     this.mathjax_code(arr);
    //     return arr.join("");
    // }
    //
    // mathjax_code(arr) {
    //     let type_name:string =
    //         this.math_node != null ?
    //             this.math_node.constructor.name:
    //             "NONE";
    //     let target_method = "mathjax_code_" + type_name.toLowerCase();
    //     this[target_method](arr);
    // }
    //
    // mathjax_code_on_simple_operator(arr, operator_string) {
    //     this.mathjax_code_on_child_with_possible_braces_on_different_type(arr, this.children[0]);
    //     arr.push(" " + operator_string + " ");
    //     this.mathjax_code_on_child_with_possible_braces_on_different_type(arr, this.children[1]);
    // }
    //
    //
    // mathjax_code_on_child_with_possible_braces(arr, child:SolutionOnBinaryOperatorTree) {
    //     if(child.children.length!=0) {
    //         arr.push("{");
    //     }
    //     child.mathjax_code(arr);
    //     if(child.children.length!=0) {
    //         arr.push("}");
    //     }
    // }
    //
    // requires_brackets(child: SolutionOnBinaryOperatorTree) {
    //     if (child.math_node == null)
    //         return false;
    //
    //     return ["Sum", "Difference", "Multiplication"].includes(child.math_node.constructor.name) && this.math_node.constructor.name != child.math_node.constructor.name;
    // }
    //
    // mathjax_code_on_child_with_possible_braces_on_different_type(arr, child:SolutionOnBinaryOperatorTree) {
    //
    //     let needs_curly_brackets =
    //         child.children.length!=0;
    //
    //     let needs_round_brackets:boolean =
    //         needs_curly_brackets && (this.requires_brackets(child));
    //
    //     if(needs_curly_brackets) {
    //         arr.push("{");
    //     }
    //
    //     if(needs_round_brackets) {
    //         arr.push("(");
    //     }
    //
    //
    //     child.mathjax_code(arr);
    //
    //     if(needs_round_brackets) {
    //         arr.push(")");
    //     }
    //
    //     if(needs_curly_brackets) {
    //         arr.push("}");
    //     }
    //
    // }
    //
    //
    // mathjax_code_power(arr) {
    //     let basis = this.children[0];
    //
    //     if(basis.children.length!=0) {
    //         arr.push("{");
    //     }
    //
    //     if(this.requires_brackets(basis) ) {
    //         arr.push("(");
    //     }
    //
    //     basis.mathjax_code(arr);
    //
    //     if(this.requires_brackets(basis)) {
    //         arr.push(")");
    //     }
    //
    //     if(basis.children.length!=0) {
    //         arr.push("}");
    //     }
    //
    //     arr.push("^");
    //
    //     let exponent = this.children[1];
    //
    //     if(exponent.children.length!=0) {
    //         arr.push("{(");
    //     }
    //
    //     exponent.mathjax_code(arr);
    //
    //     if(exponent.children.length!=0) {
    //         arr.push(")}");
    //     }
    // }
    //
    // mathjax_code_nthroot(arr) {
    //     arr.push("\\sqrt[");
    //     this.mathjax_code_on_child_with_possible_braces(arr, this.children[1]);
    //     arr.push("\\;]{");
    //     this.mathjax_code_on_child_with_possible_braces(arr, this.children[0]);
    //     arr.push("\\;}");
    // }
    //
    // mathjax_code_multiplication(arr) {
    //     this.mathjax_code_on_simple_operator(arr, "\\times");
    // }
    //
    // mathjax_code_division(arr) {
    //     arr.push("\\frac{");
    //     let numerator = this.children[0];
    //
    //     if(numerator.math_node != null && numerator.math_node.constructor.name == "Division")
    //         arr.push("(");
    //
    //     numerator.mathjax_code(arr);
    //
    //     if(numerator.math_node != null && numerator.math_node.constructor.name == "Division")
    //         arr.push(")");
    //
    //     arr.push("}{");
    //
    //     let denumerator = this.children[1];
    //     if(denumerator.math_node != null && denumerator.math_node.constructor.name == "Division")
    //         arr.push("(");
    //
    //     denumerator.mathjax_code(arr);
    //
    //     if(denumerator.math_node != null && denumerator.math_node.constructor.name == "Division")
    //         arr.push(")");
    //
    //     arr.push("}");
    //
    // }
    //
    //
    // mathjax_code_sum(arr) {
    //     this.mathjax_code_on_simple_operator(arr, "+");
    // }
    //
    // functional_code_difference(arr) {
    //     this.functional_code_on_simple_operator(arr, "-");
    // }
    //
    // mathjax_code_difference(arr) {
    //     this.mathjax_code_on_simple_operator(arr, "-");
    // }
    //
    // mathjax_code_none(arr) {
    //     arr.push(this.result);
    // }

}


abstract class BinaryOperatorTree {
    catalan_node: Catalan_Node;

    constructor(catalan_node: Catalan_Node) {
        this.catalan_node = catalan_node;
    }

    left_math_term(): BinaryOperatorTree {
        if((this.catalan_node).left===null)
            return null;
        return ((this.catalan_node).left).content as BinaryOperatorTree;
    }

    right_math_term(): BinaryOperatorTree {
        if((this.catalan_node).right===null)
            return null;
        return ((this.catalan_node).right).content as BinaryOperatorTree;
    }

    abstract results(bindings_basis_exponent_result: Logical_Results);

    solve_child(child: BinaryOperatorTree):Logical_Results {
        if(child === null) {
            return new Logical_Results(3);
        } else {
            let ret = new Logical_Results(3);
            child.results(ret);
            return ret;
        }
    }

    is_solvable():boolean {
        let r = new Logical_Results(3);
        this.results(r);
        return r.rows.length > 0;
    }

    add_operations_to_tree(operations: any[]):void {

        for(let child of [this.catalan_node.left, this.catalan_node.right]) {
            if (child != null) {
                let this_operator = operations.shift();
                let node: BinaryOperatorTree = new this_operator(child);
                child.content = node;
                node.add_operations_to_tree(operations)
            }
        }
    }

    create_random_solution_tree(): SolutionOnBinaryOperatorTree {
        let result = new Logical_Results(3);
        this.results(result);

        let new_result = result.random_result_for_column(2);

        return this.create_random_solution_tree_with_results(new_result);
    }

    create_random_solution_tree_with_results(result:Logical_Results): SolutionOnBinaryOperatorTree {
        if(result.rows.length==0) {
            throw "You want a random solution - but the given results do not have any solution at all!";
        }

        let left_solution = this.solve_child(this.left_math_term());
        let right_solution = this.solve_child(this.right_math_term());

        result.unify_results(left_solution, [0], [2]);
        result.unify_results(right_solution, [1], [2]);

        let left_child = this.create_random_child_solution_node(this.left_math_term(), left_solution);
        let right_child = this.create_random_child_solution_node(this.right_math_term(), right_solution);

        let ret = new SolutionOnBinaryOperatorTree(this, result.rows[0].values[2]);
        ret.children = [left_child, right_child];

        return ret;

        // let left_random_result: Logical_Results = left_solution.random_result_for_column(2);
        // let right_random_result: Logical_Results = right_solution.random_result_for_column(2);

        // let left_child = this.create_random_child_solution_node(this.left_math_term(), left_solution);
        // if(this.left_math_term()!=null) {
        //     left_child = this.left_math_term().create_random_solution_tree_with_results(left_random_result);
        // } else {
        //     left_child = new SolutionTree(null, left_random_result.rows[0].values[2]);
        // }

        // let right_child = this.create_random_child_solution_node(this.right_math_term(), right_solution);

        // if(this.right_math_term()!=null)
        //     right_child = this.right_math_term().create_random_solution_tree_with_results(right_random_result);
        // else
        //     right_child = new SolutionTree(null, right_random_result.rows[0].values[2]);

    }

    create_random_child_solution_node(child: BinaryOperatorTree, child_result: Logical_Results): SolutionOnBinaryOperatorTree {
        let random_result: Logical_Results = child_result.random_result_for_column(2);
        let  solution_node = null;

        if(child!=null) {
            solution_node = child.create_random_solution_tree_with_results(random_result);
        } else {
            solution_node = new SolutionOnBinaryOperatorTree(null, random_result.rows[0].values[2]);
        }
        return solution_node;
    }

    is_valid():boolean {
        let left_correct = true;

        if( this.left_math_term() != null) {
            left_correct = this.left_math_term().is_valid();
        }

        let right_correct = true;

        if( this.right_math_term() != null)
            right_correct = this.right_math_term().is_valid();

        return left_correct && right_correct;
    }

    abstract source_code_representation(this_result: SolutionOnBinaryOperatorTree, result:string[]):void;
    abstract mathjax_string_representation(this_result: SolutionOnBinaryOperatorTree, result:string[]):void;

}
//
// export class Power extends BinaryOperatorTree {
//     static CONSTRAINTS =            [
//         [2, 2, 4],          [3, 2, 9],
//         [4, 2, 16],         [5, 2, 25],         [6, 2, 36],
//         [7, 2, 49],         [8, 2, 64],         [9, 2, 81],
//         [10, 2, 100],
//         [2, 3, 8],          [3, 3, 27],
//         [4, 3, 64],         [5, 3, 125],
//     ];
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
//
//     source_code_representation(solution_node: SolutionOnBinaryOperatorTree, result:string[]):void {
//
//     }
// }
//
// export class NthRoot extends Power {
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
//
// }


export class Sum extends BinaryOperatorTree {
    static CONSTRAINTS:any[] = (() => {
        let results = [];
        for (let left_counter = 1; left_counter < 30; left_counter++) {
            for (let right_counter = 1; left_counter + right_counter <= 30; right_counter++) {
                results.push([left_counter, right_counter, left_counter + right_counter]);
            }
        }
        return results;
    })();

    results(results: Logical_Results) {
        let all_results = Logical_Results.Logical_Results_FROM_SOLUTION_ARRAY(3, Sum.CONSTRAINTS);

        let left_results = this.solve_child(this.left_math_term());
        let right_results = this.solve_child(this.right_math_term());

        all_results.unify_results(left_results, [0], [2]);
        all_results.unify_results(right_results, [1], [2]);
        results.unify_results(all_results, [0,1,2], [0,1,2]);
    }

    source_code_representation(solution_node: SolutionOnBinaryOperatorTree, result:string[]):void {
        this.source_code_representation_child(solution_node.children[0], result);
        result.push(" + ");
        this.source_code_representation_child(solution_node.children[1], result);
    }

    source_code_representation_child(child: SolutionOnBinaryOperatorTree, result:string[]) {
        if(child.is_kind("Literal") || child.is_kind("Sum") ) {
            child.source_code_string(result);
        } else {
            child.source_code_string_with_brackets(result);
        }
    }

    mathjax_string_representation(solution_node: SolutionOnBinaryOperatorTree, result:string[]):void {
        this.mathjax_string_representation_child(solution_node.children[0], result);
        result.push(" + ");
        this.mathjax_string_representation_child(solution_node.children[1], result);
    }

    mathjax_string_representation_child(child: SolutionOnBinaryOperatorTree, result:string[]) {
        if(child.is_kind("Literal") || child.is_kind("Sum") ) {
            child.mathjax_code_string(result);
        } else {
            child.mathjax_string_with_brackets(result);
        }
    }

}

export class Difference extends Sum {
    results(results: Logical_Results) {
        let all_results = Logical_Results.Logical_Results_FROM_SOLUTION_ARRAY(3, Sum.CONSTRAINTS);

        let left_results = this.solve_child(this.left_math_term());
        let right_results = this.solve_child(this.right_math_term());

        all_results.unify_results(left_results, [2], [2]);
        all_results.unify_results(right_results, [1], [2]);
        results.unify_results(all_results, [0,1,2], [2,1,0]);
    }

    source_code_representation(solution_node: SolutionOnBinaryOperatorTree, result:string[]):void {
        this.source_code_representation_child(solution_node.children[0], result);
        result.push(" - ");
        this.source_code_representation_child(solution_node.children[1], result);
    }

    source_code_representation_child(child: SolutionOnBinaryOperatorTree, result:string[]) {
        if(child.is_kind("Literal") ) {
            child.source_code_string(result);
        } else {
            child.source_code_string_with_brackets(result);
        }
    }

    mathjax_string_representation(solution_node: SolutionOnBinaryOperatorTree, result:string[]):void {
        this.mathjax_string_representation_child(solution_node.children[0], result);
        result.push(" - ");
        this.mathjax_string_representation_child(solution_node.children[1], result);
    }

    mathjax_string_representation_child(child: SolutionOnBinaryOperatorTree, result:string[]) {
        if(child.is_kind("Literal")) {
            child.mathjax_code_string(result);
        } else {
            child.mathjax_string_with_brackets(result);
        }
    }

}




export class Multiplication extends BinaryOperatorTree {
    source_code_representation(solution_node: SolutionOnBinaryOperatorTree, result:string[]):void {
        this.source_code_representation_child(solution_node.children[0], result);
        result.push(" * ");
        this.source_code_representation_child(solution_node.children[1], result);
    }

    source_code_representation_child(child: SolutionOnBinaryOperatorTree, result:string[]) {
        if(child.is_kind("Literal") || child.is_kind("Multiplication") ) {
            child.source_code_string(result);
        } else {
            child.source_code_string_with_brackets(result);
        }
    }

    mathjax_string_representation(solution_node: SolutionOnBinaryOperatorTree, result:string[]):void {
        this.mathjax_string_representation_child(solution_node.children[0], result);
        result.push(" \\cdot ");
        this.mathjax_string_representation_child(solution_node.children[1], result);
    }

    mathjax_string_representation_child(child: SolutionOnBinaryOperatorTree, result:string[]) {
        if(child.is_kind("Literal") || child.is_kind("Multiplication")) {
            child.mathjax_code_string(result);
        } else {
            child.mathjax_string_with_brackets(result);
        }
    }

    static CONSTRAINTS:any[] = (() => {
        let results = [];
        for (let left_counter = 2; left_counter <= 9; left_counter++) {
            for (let right_counter = 2; right_counter <= 9; right_counter++) {
                results.push([left_counter, right_counter, left_counter * right_counter]);
            }
        }
        return results;
    })();

    results(results: Logical_Results) {
        let all_results = Logical_Results.Logical_Results_FROM_SOLUTION_ARRAY(3, Multiplication.CONSTRAINTS);

        let left_results = this.solve_child(this.left_math_term());
        let right_results = this.solve_child(this.right_math_term());

        all_results.unify_results(left_results, [0], [2]);
        all_results.unify_results(right_results, [1], [2]);
        results.unify_results(all_results, [0,1,2], [0,1,2]);
    }

}

export class Division extends Multiplication {

    source_code_representation(solution_node: SolutionOnBinaryOperatorTree, result:string[]):void {
        this.source_code_representation_child(solution_node.children[0], result);
        result.push(" / ");
        this.source_code_representation_child(solution_node.children[1], result);
    }

    source_code_representation_child(child: SolutionOnBinaryOperatorTree, result:string[]) {
        if(child.is_kind("Literal")) {
            child.source_code_string(result);
        } else {
            child.source_code_string_with_brackets(result);
        }
    }

    mathjax_string_representation(solution_node: SolutionOnBinaryOperatorTree, result:string[]):void {
        result.push("\\frac{");
        this.mathjax_string_representation_child(solution_node.children[0], result);
        result.push("}{");
        this.mathjax_string_representation_child(solution_node.children[1], result);
        result.push("}");
    }

    mathjax_string_representation_child(child: SolutionOnBinaryOperatorTree, result:string[]) {
        if(child.is_kind("Literal")) {
            child.mathjax_code_string(result);
        } else {
            child.mathjax_string_with_brackets(result);
        }
    }

    results(results: Logical_Results) {
        let all_results = Logical_Results.Logical_Results_FROM_SOLUTION_ARRAY(3, Multiplication.CONSTRAINTS);

        let left_results = this.solve_child(this.left_math_term());
        let right_results = this.solve_child(this.right_math_term());

        all_results.unify_results(left_results, [2], [2]);
        all_results.unify_results(right_results, [1], [2]);
        results.unify_results(all_results, [0,1,2], [2,1,0]);
    }
}
