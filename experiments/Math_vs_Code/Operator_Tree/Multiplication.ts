import {BinaryOperatorTree} from "./BinaryOperatorTree.js";
import {Operator} from "./Operator.js";

export class Multiplication extends Operator {

    operation_symbol = "*";
    type_name(): string {
        return "Multiplication";
    }

    is_associative(): boolean {return true;}

    source_code_string_construction(result:string[]):void {
        this.source_code_child_with_no_brackets_on_kind(this.left_term(), result, ["Literal", "Multiplication"]);
        result.push("<small><small><div style='line-height: 50%'> *<br><small style=\"color:red;\">[" + this.operator_number + "]</small></div></small></small> ");
        this.source_code_child_with_no_brackets_on_kind(this.right_term(), result, ["Literal", "Multiplication"]);
    }

    source_code_position_string_construction(result:string[]):void {
        this.source_code_position_child_with_no_brackets_on_kind(this.left_term(), result, ["Literal", "Multiplication"]);
        result.push("[" + this.operator_number+ "]");
        this.source_code_position_child_with_no_brackets_on_kind(this.right_term(), result, ["Literal", "Multiplication"]);
    }

    mathjax_string_construction(result:string[]):void {
        this.mathjax_child_construction_with_no_brackets_on_kind(this.left_term(), result, ["Literal", "Multiplication", "Division"]);
        result.push(" \\cdot{\\color{red} \\framebox{" + this.operator_number + "} } ");
        this.mathjax_child_construction_with_no_brackets_on_kind(this.right_term(), result, ["Literal", "Multiplication", "Division"]);
    }

}