import {BinaryOperatorTree} from "./BinaryOperatorTree.js";
import {Operator} from "./Operator.js";

export class Sum extends Operator {

    operation_symbol = "+";

    type_name():string { return "Sum"; }
    is_associative(): boolean {return true;}

    source_code_string_construction(result:string[]):void {
        this.source_code_child_with_no_brackets_on_kind(this.left_term(), result, ["Literal", "Sum"]);
        result.push(" +<small style=\"color:red;\"><small><small>[" + this.operator_number + "]</small></small></small> ");
        this.source_code_child_with_no_brackets_on_kind(this.right_term(), result, ["Literal", "Sum"]);
    }

    source_code_position_string_construction(result:string[]):void {
        this.source_code_position_child_with_no_brackets_on_kind(this.left_term(), result, ["Literal", "Sum"]);
        result.push("[" + this.operator_number+ "]");
        this.source_code_position_child_with_no_brackets_on_kind(this.right_term(), result, ["Literal", "Sum"]);
    }


    mathjax_string_construction(result:string[]):void {
        this.mathjax_child_construction_with_no_brackets_on_kind(this.left_term(), result, ["Literal", "Difference", "Sum", "Division"]);
        result.push("\\;+{\\color{red} \\framebox{" + this.operator_number + "} \\;}");
        this.mathjax_child_construction_with_no_brackets_on_kind(this.right_term(), result, ["Literal", "Difference", "Sum", "Division"]);
    }

    math_readability_value(depth: number): number {
        return 0;
    }

    source_code_readability_value(depth: number): number {
        return 0;
    }



}
