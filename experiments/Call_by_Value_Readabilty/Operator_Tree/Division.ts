import {BinaryOperatorTree} from "./BinaryOperatorTree.js";
import {Operator} from "./Operator.js";


export class Division extends Operator {
    is_associative(): boolean {return false;}
    operation_symbol = "/";

    type_name():string { return "Division";};

    number_of_math_brackets_with_operation(operation:string):number {
        let number_of_required_brackets = 0;

        let left_brackets = this.left_term().number_of_math_brackets_with_operation(this.type_name());
        let right_brackets = this.right_term().number_of_math_brackets_with_operation(this.type_name());

        return number_of_required_brackets + left_brackets + right_brackets;
    }


    source_code_string_construction(result:string[]):void {
        this.source_code_child_with_no_brackets_on_kind(this.left_term(), result, ["Literal"]);
        result.push(" /<small style=\"color:red;\"><small><small>[" + this.operator_number + "]</small></small></small> ");
        this.source_code_child_with_no_brackets_on_kind(this.right_term(), result, ["Literal"]);
    }

    source_code_position_string_construction(result:string[]):void {
        this.source_code_position_child_with_no_brackets_on_kind(this.left_term(), result, ["Literal"]);
        result.push("[" + this.operator_number+ "]");
        this.source_code_position_child_with_no_brackets_on_kind(this.right_term(), result, ["Literal"]);
    }

    mathjax_string_construction(result:string[]):void {
        result.push("\\frac{");
        this.mathjax_child_construction_with_no_brackets_on_kind(this.left_term(), result, ["Literal", "Multiplication", "Sum", "Difference"]);
        result.push("}{");
        this.mathjax_child_construction_with_no_brackets_on_kind(this.right_term(), result, ["Literal", "Multiplication", "Sum", "Difference"]);
        result.push("}{" + "\\color{red} \\framebox{" + this.operator_number + "}}");
    }

}
