import {is_true} from './Testing.js';

export class Catalan_Node {
    content = null;
    left: Catalan_Node = null;
    right: Catalan_Node = null;
    constructor(left: Catalan_Node, right: Catalan_Node) {
        this.left = left;
        this.right = right;
    }

    number_of_nodes() {
        return 1 + (this.left!=null? this.left.number_of_nodes(): 0) + (this.right!=null? this.right.number_of_nodes(): 0);
    }


}

export function create_catalan_graphs(number_of_nodes) {
    let nodes: Catalan_Node[] = [];
    _catalan_graphs(number_of_nodes, nodes);
    return nodes;
}
function _catalan_graphs(number_of_nodes, results): Catalan_Node[] {
    if (number_of_nodes==0) {
        results.push(null);
        return;
    } else if (number_of_nodes==1) {
        results.push(new Catalan_Node( null, null));
        return;
    } else {
        for(let left_counter= 0; left_counter < number_of_nodes; left_counter++) {
            let diff = number_of_nodes - left_counter - 1;
            let left_children = [];
            let right_children = [];
            _catalan_graphs(left_counter, left_children);
            _catalan_graphs(diff, right_children);
            for(let then_branch=  0;  then_branch < left_children.length; then_branch++) {
                for(let else_branch=0;  else_branch < right_children.length; else_branch++) {
                    results.push(new Catalan_Node(left_children[then_branch], right_children[else_branch]));
                }
            }
        }
    }
}

function catalan_number(number_of_nodes:number) {

}
function test_catalan_graphs() {
    let nodes: Catalan_Node[] = [];

    nodes = create_catalan_graphs(1);
    is_true(nodes.length==1, "Catalan number 1 = 1");

    nodes = create_catalan_graphs(2);
    is_true(nodes.length==2, "Catalan number 2 = 2");

    nodes = create_catalan_graphs(3);
    is_true(nodes.length==5, "Catalan number 3 = 5");

    nodes = create_catalan_graphs(4);
    is_true(nodes.length==14, "Catalan number 4 = 14");

    nodes = create_catalan_graphs(5);
    is_true(nodes.length==42, "Catalan number");

    nodes = create_catalan_graphs(6);
    is_true(nodes.length==132, "Catalan number");

    nodes = create_catalan_graphs(7);
    is_true(nodes.length==429, "Catalan number");

    nodes = create_catalan_graphs(8);
    is_true(nodes.length==1430, "Catalan number");

    nodes = create_catalan_graphs(9);
    is_true(nodes.length==4862, "Incorrect Catalan number");

    console.log("Catalan numbers seem ok.")
}

test_catalan_graphs();