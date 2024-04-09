import {BinaryOperatorTree} from "./BinaryOperatorTree.js";
import {BinaryTree} from "../../../modules/CatalanGraphs";
import {AssociativeTreeOperation} from "./AssociativeTree.js";

export abstract class Operator extends BinaryOperatorTree {

    operator_number:number;
    operation_symbol:string;
    _is_reduced = false;

    abstract is_associative():boolean;

    into_associative_tree(tree: AssociativeTreeOperation) {
        let target_tree;
        if(tree.operation_symbol == this.operation_symbol && this.is_associative()) {
            target_tree = tree;
        } else {
            target_tree = new AssociativeTreeOperation(this.operation_symbol);
            tree.children.push(target_tree);
        }
        if(this.left_term()!=null)
            this.left_term().into_associative_tree(target_tree);
        if(this.right_term()!=null)
            this.right_term().into_associative_tree(target_tree);
    }

    number_of_source_code_brackets_with_operation(operation:string):number {
        let number_of_required_brackets = 0;

        if(this.type_name()!==operation || !this.is_associative())
            number_of_required_brackets++;

        let left_brackets = this.left_term().number_of_source_code_brackets_with_operation(this.type_name());
        let right_brackets = this.right_term().number_of_source_code_brackets_with_operation(this.type_name());

        return number_of_required_brackets + left_brackets + right_brackets;
    }

    number_of_math_brackets_with_operation(operation:string):number {
        let number_of_required_brackets = 0;

        if(this.type_name()!==operation || !this.is_associative())
            number_of_required_brackets++;

        let left_brackets = this.left_term().number_of_math_brackets_with_operation(this.type_name());
        let right_brackets = this.right_term().number_of_math_brackets_with_operation(this.type_name());

        return number_of_required_brackets + left_brackets + right_brackets;
    }


    is_literal(): boolean {
        return false;
    }

    set_unreduced() {
        this._is_reduced = false;
        this.left_term().set_unreduced();
        this.right_term().set_unreduced();
    }


    is_operator():boolean {
        return true;
    }

    has_node_id(id:number) {
        return this.operator_number===id;
    }

    is_left_reduced(operator:string):boolean {
        if(this._is_reduced)
            return true;

        if(this.type_name()!==operator)
            return false;

        return this.left_term().is_reduced() || this.left_term().is_left_reduced(operator);
    }

    is_right_reduced(operator:string) {
        if(this._is_reduced)
            return true;

        if(this.type_name()!==operator)
            return false;

        return this.right_term().is_reduced() || this.right_term().is_right_reduced(operator);
    }


    is_reduced() {
        return this._is_reduced;
    }

    do_reduce():boolean {
        if(this.left_term().is_right_reduced(this.type_name()) && this.right_term().is_left_reduced(this.type_name())) {
            this._is_reduced = true;
            return true;
        }

        return false;
    }
}


