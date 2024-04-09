import {Division} from "./Operator_Tree/Division.js";
import {
    do_random_array_sort, random_array_element
} from "../../modules/Experimentation/Experimentation.js";
import {BinaryTree, create_catalan_graphs} from "../../modules/CatalanGraphs.js";
import {
    BinaryOperatorTree
} from "./Operator_Tree/BinaryOperatorTree.js";
import {Multiplication} from "./Operator_Tree/Multiplication.js";
import {Sum} from "./Operator_Tree/Sum.js";
import {Literal} from "./Operator_Tree/Literal.js";


export function push_operations_into_tree(operations:any[], graph:BinaryTree) {
    let this_operator = operations.shift();
    let node: BinaryOperatorTree = new this_operator(graph);
    graph.content = node;
    add_operations_to_tree_children(node, operations);
    return node;
};


function add_operations_to_tree_children(tree:BinaryOperatorTree, operations: any[]):void {

    for(let child of [tree.catalan_node.left, tree.catalan_node.right]) {
        if (child != null) {
                if(operations.length<=0)
                    console.log("strange");
                let this_operator = operations.shift();
                let node:BinaryOperatorTree=null;

            try {
                node  = new this_operator(child);
            } catch (ex) {
                throw ex;
            }

                child.content = node;
                add_operations_to_tree_children(node, operations)
        }
    }
}

function create_random_term_list (number_of_nodes, number_of_divisions: number) {
    let operation_list = [];

    for(let i = 1; i <= number_of_divisions; i++) {
        operation_list.push(Division);
    };


    for(let i = 1; i <= number_of_nodes - number_of_divisions; i++) {
        operation_list.push(random_array_element([Sum, /*Difference, */Multiplication]));
    }
    operation_list = do_random_array_sort(operation_list);
    return operation_list;
};

function set_operator_numbers(tree:BinaryOperatorTree) {
    let preorder_list = tree.preorder_list();
    let operators = preorder_list.filter((e) => !e.is_literal());
    let num_array = [];
    operators = do_random_array_sort(operators);
    for(let c = 1; c <= operators.length; c++) {
        operators[c-1].operator_number = c;
    }
}

function set_letters(tree:BinaryOperatorTree) {
    let preorder_list:BinaryOperatorTree[] = tree.preorder_list();
    let dead_nodes = (preorder_list.filter((e:BinaryOperatorTree) => e.left_term()==null || e.right_term()==null) as Literal[]);

    for(let n of dead_nodes ) {
        if(n.left_term()==null) {
            let catalan_node = new BinaryTree(null, null)
            n.catalan_node.left = catalan_node;
            new Literal(catalan_node);
        }
        if(n.right_term()==null) {
            let catalan_node = new BinaryTree(null, null)
            n.catalan_node.right = catalan_node;
            new Literal(catalan_node);
        }
    }

    let literals = (tree.preorder_list().filter((e:BinaryOperatorTree) => e.is_literal()) as Literal[]);

    // let start_letter:number = 'A'.charCodeAt(0);
    for(let l of literals) {
        // l.literal = String.fromCharCode(start_letter++);
        l.literal = "X";

    }
}

export function create_operator_tree_on_num_divisions(number_of_nodes:number, number_of_divisions:number, catalan_graphs: BinaryTree[]):BinaryOperatorTree {
    let random_tree = (random_array_element(catalan_graphs) as BinaryTree).clone();
    let num_nodes = random_tree.number_of_nodes();
    let random_term_list:any[] = create_random_term_list(number_of_nodes, number_of_divisions);
    let num_operations = random_term_list.length;
    let operation_tree:BinaryOperatorTree = create_operation_tree_on_graph(random_term_list, random_tree);
    set_operator_numbers(operation_tree);
    set_letters(operation_tree);
    return operation_tree;
}

function create_operation_tree_on_graph(operator_list:any[], catalan_graph: BinaryTree) {
    let result_tree:BinaryOperatorTree =
        push_operations_into_tree(
            [...operator_list],
            catalan_graph
        );

    return result_tree;
}

export function print_create_graph_strings(number_of_nodes: number, number_of_divisons: number, catalan_graphs: BinaryTree[]) {
            for(let c = 1; c<=2000; c++)
                for(let i = 2; i<=5; i++)
                    console.log(create_operator_tree_on_num_divisions(number_of_nodes, i, catalan_graphs).tree_string());
            console.log("done");
}



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