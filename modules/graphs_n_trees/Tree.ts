import {integer_partition_function} from "../numeric/integer_partition.js";
import {all_array_combinations} from "../utils/arrays/all_array_combinations.js";
import {is_true} from "../utils/Testing.js";

class Tree {

    content;
    children:Tree[] = [];

    constructor(content, children) {
        this.children = [];
        this.content = content;
        this.children = children;
    }
    clone() {
        let child_clones = [];
        for (let child of this.children) {
            child_clones.push(child.clone());
        }
        return new Tree(this.content, child_clones);
    }

    distance_SH01(source, target):number {
        if(this == source)
            return this.left_distance_SH01(target) - 1;

        if(this == target)
            return this.right_distance_SH01(source) - 1;

        let source_child = null;
        let target_child = null;

        let distance = 1;

        for(let c of this.children) {
            if(c.contains_node(source))
                source_child = c;
            if(c.contains_node(target))
                target_child = c;
        }

        if(source_child===null || target_child===null)
            throw "should not be";

        let inner_nodes = this.children.slice(this.children.indexOf(source_child)+1, this.children.indexOf(target_child)-1);

        for(let n of inner_nodes) {
            distance += n.number_of_nodes();
        }

        distance += source_child.right_distance_SH01(source);
        distance += target_child.left_distance_SH01(target);

        return distance;

    }

    right_distance_SH01(node):number {
        let relevant_child = null;
        let right_distance = 1;

        if (node===this)
            return 0;

        for(let c of this.children) {
            if(c.contains_node(node)) {
                relevant_child = c;
                break;
            }
        }

        if (relevant_child===null)
            throw "should not be";

        let right_trees = this.children.slice(this.children.indexOf(relevant_child) + 1);

        for(let r of right_trees) {
            right_distance += r.number_of_nodes();
        }

        right_distance += relevant_child.right_distance_SH01(node);
        return right_distance;
    }

    left_distance_SH01(node):number {
        let relevant_child = null;
        let left_distance = 1;

        if (node===this)
            return 0;

        for(let c of this.children) {
            if(c.contains_node(node)) {
                relevant_child = c;
                break;
            }
        }

        if (relevant_child===null)
            throw "should not be";
        let relevant_child_index = this.children.indexOf(relevant_child);
        let left_trees = this.children.slice(0, relevant_child_index);

        for(let l of left_trees) {
            left_distance += l.number_of_nodes();
        }

        left_distance += relevant_child.left_distance_SH01(node);
        return left_distance;
    }

    path_length_from_this(n):number {

        if(this===n) return 0;

        let distance = 0;
        for(let c of this.children) {
            let d = c.path_length_from_this(n);
            if(d>0)
                return d + 1;
        }

        return -1;

    }

    number_of_nodes():number {

        let number = 1

        for(let c of this.children) {
            number += c.number_of_nodes();
        }

        return number;

    }


    contains_node(n) {
        if(this===n)
            return true;
        else {
            for(let c of this.children) {
                if(c.contains_node(n))
                    return true;
            }
        }
        return false;
    }

}

export function generate_trees(number_of_nodes) {
    if (number_of_nodes == 1) {
        return [new Tree(null, [])];
    }
    let ret = [];
    let partitions = integer_partition_function(number_of_nodes - 1);
    for (let p of partitions) {
        let this_partition = [];
        for (let child of p) {
            this_partition.push(generate_trees(child));
        }
        all_array_combinations(
            this_partition,
            e => {
                        let children = [];
                        e.forEach(t => children.push(t.clone()));
                ret.push(new Tree(null, children));
                // ret.push(children);
                    }
        );
    }
    return ret;
}

function t(children=[]) {
    return new Tree(null, children);
}

function test_distance_SH01(debug) {

    let source = new Tree("source", []);
    let target = new Tree("target", []);
    let distance = -1;
    let tree =  null;

    tree = t([
        t([t(), t([source]), t()]),
        t([t(), t(), target, t()])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 7, "distance = 7", debug);

    tree = t([
        t([t(), t([source]), t()]),
        t([t(), target, t()])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 6, "distance = 6", debug);

    tree = t([
        t([t(), source, t()]),
        t([t(), t(), target, t()])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 6, "distance = 6", debug);

    tree = t([
        t([source, t()]),
        t([t(), target, t()])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 5, "distance = 5", debug);

    tree = t([
        t([source, t()]),
        t([t(), target])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 5, "distance = 5", debug);

    tree = t([
        t([source, t()]),
        t([target])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 4, "distance = 4", debug);

    tree = source.clone();
    tree.children = [target];
    distance = tree.distance_SH01(tree, target);
    is_true(distance==0, "distance = 0 (source==root)", debug);

    tree =  target.clone();
    tree.children = [source];
    distance = tree.distance_SH01(source, tree);
    is_true(distance==0, "distance = 0 (target==root)", debug);

    /*
          / \ = 1
         s   t              */
    tree = t([
        source,
        target
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance==1, "distance = 1", debug);

    /*
          / \
         /   t = 3
        s              */
    tree = t([
        t([source]),
        target
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance ==2, "distance = 2", debug);

    tree = t([
        t([source, t()]),
        target
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 3, "distance = 3", debug);




}

let a = [1, 2];
let b = a.slice(0,1);

test_distance_SH01(true);
