import {Literal} from "./Literal.js";

export abstract class AssociativeTree {
    children: AssociativeTree[] = [];

    to_code_string() {
        let arr:string[]= [];
        this.to_code_string_writer(arr);
        return arr.join("");
    }

    abstract to_code_string_writer(out:string[]);
    is_literal() {return false;}

    source_tree_value_root() {
        return this.source_tree_value(-1, 0);
    }
    math_tree_value_root() {
        return this.math_tree_value(-1, 0);
    }

    abstract source_tree_value(left_none_right:number, depth:number);
    abstract math_tree_value(left_none_right:number, depth: number);
}

export class AssociativeTreeOperation extends AssociativeTree{
    operation_symbol: string;

    constructor(operation_symbol: string) {
        super();
        this.operation_symbol = operation_symbol;
    }

    to_code_string_writer(out:string[]) {
        let counter = 0;
        for(let c of this.children) {
            if(counter>0) {
                out.push(this.operation_symbol);
            }
            counter++;

            if(!c.is_literal()) {
                out.push("(");
                c.to_code_string_writer(out);
                out.push(")");
            } else {
                c.to_code_string_writer(out);
            }
        }
    }

    source_tree_value(left_none_right:number, depth: number):number {
        if(this.children.length==2)
            if(this.children[0].is_literal() && this.children[1].is_literal())
                return 1;

        let left_value = this.children[0].source_tree_value(-1, depth+1) + depth;
        if(left_none_right == 1 && !this.children[0].is_literal())
            left_value++;

        let inner_values = 0;
        for(let c=1; c< this.children.length-1; c++) {
            inner_values += 1 + this.children[c].source_tree_value(0, depth+1) + depth;
        }

        let right_value = 1 + this.children[this.children.length-1].source_tree_value(1, depth+1) + depth;
        if(left_none_right == -1 && !this.children[this.children.length-1].is_literal()) {
            right_value++;
        }

        return left_value + inner_values + right_value;
    }

    math_tree_value(left_none_right:number, depth:number) {
        if(this.children.length==2)
            if(this.children[0].is_literal() && this.children[1].is_literal())
                return 1;

        if(this.operation_symbol=="/")
            return this.math_tree_division_value(depth);

        let left_value = this.children[0].math_tree_value(-1, depth + 1) + depth;
        if(left_none_right == 1)
            left_value++;

        let inner_values = 0;
        for(let c=1; c< this.children.length-1; c++) {
            inner_values += 1 + this.children[c].math_tree_value(0, depth + 1) + depth;
        }

        let right_value = 1 + this.children[this.children.length-1].math_tree_value(1, depth + 1) + depth;
        if(left_none_right == -1 && !this.children[this.children.length-1].is_literal())
            left_value++;

        return left_value + inner_values + right_value;
    }

    math_tree_division_value(depth:number):number {
        let left_value = this.children[0].math_tree_value(-1, 0);
        let right_value = this.children[1].math_tree_value(-1, 0);
        return 1 + left_value + right_value;
    }


}

export class AssociativeTreeLeaf extends AssociativeTree{
    literal: Literal;


    constructor(literal: Literal) {
        super();
        this.literal = literal;
    }

    is_literal() {return true;}

    to_code_string_writer(out:string[]) {
        out.push(this.literal.literal);
    }

    source_tree_value(left_none_right:number) {
        return 0;
    }
    math_tree_value(left_none_right:number) {
        return 0;
    }

}