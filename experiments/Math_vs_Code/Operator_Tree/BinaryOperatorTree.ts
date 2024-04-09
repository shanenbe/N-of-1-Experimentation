import {BinaryTree} from "../../../modules/CatalanGraphs.js";
import {AssociativeTree, AssociativeTreeLeaf, AssociativeTreeOperation} from "./AssociativeTree.js";

export abstract class BinaryOperatorTree {
    catalan_node: BinaryTree;

    abstract type_name():string;

    number_of_source_code_brackets():number {
        return this.number_of_source_code_brackets_with_operation(this.type_name());
    }

    as_associative_tree():AssociativeTree {
        let operator = new AssociativeTreeOperation("Dummy");
        this.into_associative_tree(operator);
        return operator.children[0];
    }

    abstract into_associative_tree(tree: AssociativeTreeOperation);

    number_of_source_code_switches_with_direction(from_left: boolean):number {
        let left_switches = this.left_term().number_of_source_code_switches_with_direction(true);
        let right_switches = this.right_term().number_of_source_code_switches_with_direction(false);

        if(from_left)

        return left_switches;
    }

    number_of_math_brackets():number {
        return this.number_of_math_brackets_with_operation(this.type_name());
    }

    abstract number_of_source_code_brackets_with_operation(operation:string):number;
    abstract number_of_math_brackets_with_operation(operation:string):number;

    is_of_type(name: string) {
        return name == this.type_name();
    }

    has_node_id(id:number) {
        return false;
    }

    is_operator():boolean {
        return false;
    }

    is_right_reduced(operator:string) { return true;}
    is_left_reduced(operator:string):boolean { return true;}

    do_reduce() {
        return false;
    }

    set_unreduced() {}

    reduce(operator_numbers: number[]):boolean {
        let preorder_list:BinaryOperatorTree[] = this.preorder_list();

        while(operator_numbers.length>0) {
            let next_node_no_to_reduce = operator_numbers.splice(0, 1)[0];
            let next_node_to_reduce:BinaryOperatorTree[] = preorder_list.filter((e) => e.is_operator() && e.has_node_id(next_node_no_to_reduce))

            if(next_node_to_reduce.length!=1) {
                this.set_unreduced();
                return false;
            }

            let done = next_node_to_reduce[0].do_reduce();

            if(!done) {
                this.set_unreduced();
                return false;
            }
        }
        return this.is_reduced();
    }

    is_reduced() {
        return true;
    }

    preorder_list() {
        let list = [];
        this.create_preorder_list(list);
        return list;
    }
    create_preorder_list(list:BinaryOperatorTree[]) {
        if(this.left_term()!=null) {
            this.left_term().create_preorder_list(list);
        }

        list.push(this);

        if(this.right_term()!=null) {
            this.right_term().create_preorder_list(list);
        }
    }

    abstract is_literal(): boolean;

    number_of_divisions():number {
        let divisons = 0;
        if (this.is_of_type("Division"))
            divisons++;

        divisons += this.left_term().number_of_divisions();
        divisons += this.right_term().number_of_divisions();

        return divisons;
    }

    tree_string() {
        let arr=[];
        this.tree_string_to_array(arr);
        return arr.join("");
    }
    tree_string_to_array(arr:string[]) {
        let constr_name = "";
        if (this.is_of_type("Multiplication"))
            constr_name = "RMult";
        if (this.is_of_type("Division"))
            constr_name = "RDiv";
        if (this.is_of_type("Difference"))
            constr_name = "RDif";
        if (this.is_of_type("Sum"))
            constr_name = "RSum";

        arr.push(constr_name + "(");

        if(this.left_term()!=null)
            this.left_term().tree_string_to_array(arr);
        else
            arr.push("L");

        arr.push(",")
        if(this.right_term()!=null)
            this.right_term().tree_string_to_array(arr);
        else
            arr.push("L");

        arr.push(")");
    }

    constructor(catalan_node: BinaryTree) {
        this.catalan_node = catalan_node;
        catalan_node.content = this;
    }

    left_term(): BinaryOperatorTree {
        if (this.catalan_node==null)
            console.log("strange");
        if((this.catalan_node).left===null)
            return null;
        return ((this.catalan_node).left).content as BinaryOperatorTree;
    }

    right_term(): BinaryOperatorTree {
        if((this.catalan_node).right===null)
            return null;
        return ((this.catalan_node).right).content as BinaryOperatorTree;
    }

    source_code_string():string {
        let arr = [];
        this.source_code_string_construction(arr);
        return arr.join("");
    }

    mathjax_string():string {
        let arr = [];
        this.mathjax_string_construction(arr);
        return arr.join("");
    }

    source_code_position():string {
        let arr = [];
        this.source_code_position_string_construction(arr);
        return arr.join("");
    }

    abstract source_code_string_construction(result:string[]):void;
    abstract source_code_position_string_construction(result:string[]):void;

    abstract mathjax_string_construction(result:string[]):void;

    source_code_string_construction_with_brackets(arr:string[]) {
        arr.push("(");
        this.source_code_string_construction(arr);
        arr.push(")");
    }

    source_code_position_string_with_brackets(arr:string[]) {
        arr.push(" ");
        this.source_code_position_string_construction(arr);
        arr.push(" ");
    }

    mathjax_string_construction_with_brackets(arr:string[]) {
        arr.push("\\left(");
        this.mathjax_string_construction(arr);
        arr.push("\\right)");
    }

    source_code_child_with_no_brackets_on_kind(child: BinaryOperatorTree, result:string[], kinds: string[]) {
        if(child.is_of_one_kind(kinds)) {
            child.source_code_string_construction(result);
        } else {
            child.source_code_string_construction_with_brackets(result);
        }
    }

    source_code_position_child_with_no_brackets_on_kind(child: BinaryOperatorTree, result:string[], kinds: string[]) {
        if(child.is_of_one_kind(kinds)) {
            child.source_code_position_string_construction(result);
        } else {
            child.source_code_position_string_with_brackets(result);
        }
    }


    mathjax_child_construction_with_no_brackets_on_kind(child: BinaryOperatorTree, result:string[], kinds:string[]) {
        if(child==null)
            console.log("strange");
        if(child.is_of_one_kind(kinds))
            child.mathjax_string_construction(result);
        else
            child.mathjax_string_construction_with_brackets(result);
    }

    is_of_one_kind(kinds:string[]) {
        for(let kind of kinds) {
            if(this.is_kind(kind))
                return true;
        }
        return false;
    }

    is_kind(kind:string):boolean {
        return this.constructor.name==kind;
    }

}


