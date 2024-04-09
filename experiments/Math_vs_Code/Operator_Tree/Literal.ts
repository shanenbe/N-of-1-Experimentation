import {BinaryOperatorTree} from "./BinaryOperatorTree.js";
import {BinaryTree} from "../../../modules/CatalanGraphs";
import {AssociativeTree, AssociativeTreeLeaf, AssociativeTreeOperation} from "./AssociativeTree.js";

export class Literal extends BinaryOperatorTree {

    into_associative_tree(tree: AssociativeTreeOperation) {
        tree.children.push(new AssociativeTreeLeaf(this));
    }


    type_name(): string { return "Literal"; }

    literal = "X";

    constructor(catalan_node: BinaryTree) {
        super(catalan_node);
    }

    number_of_source_code_brackets_with_operation(operation:string):number {
        return 0;
    }

    number_of_math_brackets_with_operation(operation:string):number {
        return 0
    }

    is_literal(): boolean { return true; }

    math_readability_value(depth: number): number {
        return 0;
    }

    mathjax_string_construction(result: string[]): void {
        result.push(this.literal);
    }

    source_code_position_string_construction(result: string[]): void {
        result.push(" ");
    }

    source_code_readability_value(depth: number): number {
        return 0;
    }

    source_code_string_construction(result: string[]): void {
        result.push(this.literal);
    }

    number_of_source_code_brackets():number {
        return 0;
    }

}