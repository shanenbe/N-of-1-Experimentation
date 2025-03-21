import { integer_partition_function } from "../numeric/integer_partition";
import { all_array_combinations } from "../utils/arrays/all_array_combinations";
import { is_true } from "../utils/Testing";
import { iterate, repeat } from "../utils/loops/loop";
import { all_true_false_combinations } from "../numeric/combinatoric";
var Tree = /** @class */ (function () {
    function Tree(content, children) {
        this.children = [];
        this.children = [];
        this.content = content;
        this.children = children;
    }
    Tree.prototype.clone = function () {
        var child_clones = [];
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child_clones.push((child !== null) ? child.clone() : null);
        }
        return new Tree(this.content, child_clones);
    };
    Tree.prototype.preorder = function (f) {
        f(this);
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child !== null)
                child.preorder(f);
        }
    };
    Tree.prototype.postorder = function (f) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var t_1 = _a[_i];
            t_1.postorder(f);
        }
        f(this);
    };
    Tree.prototype.distance_SH01 = function (source, target) {
        if (this == source)
            return this.left_distance_SH01(target) - 1;
        if (this == target)
            return this.right_distance_SH01(source) - 1;
        var source_child = null;
        var target_child = null;
        var distance = 1;
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.contains_node(source))
                source_child = c;
            if (c.contains_node(target))
                target_child = c;
        }
        if (source_child === null || target_child === null)
            throw "should not be";
        if (source_child === target_child)
            return source_child.distance_SH01(source, target);
        var inner_nodes = this.children.slice(this.children.indexOf(source_child) + 1, this.children.indexOf(target_child) - 1);
        for (var _b = 0, inner_nodes_1 = inner_nodes; _b < inner_nodes_1.length; _b++) {
            var n = inner_nodes_1[_b];
            distance += n.number_of_nodes();
        }
        distance += source_child.right_distance_SH01(source);
        distance += target_child.left_distance_SH01(target);
        return distance;
    };
    Tree.prototype.right_distance_SH01 = function (node) {
        var relevant_child = null;
        var right_distance = 1;
        if (node === this)
            return 0;
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.contains_node(node)) {
                relevant_child = c;
                break;
            }
        }
        if (relevant_child === null)
            throw "should not be";
        var right_trees = this.children.slice(this.children.indexOf(relevant_child) + 1);
        for (var _b = 0, right_trees_1 = right_trees; _b < right_trees_1.length; _b++) {
            var r = right_trees_1[_b];
            right_distance += r.number_of_nodes();
        }
        right_distance += relevant_child.right_distance_SH01(node);
        return right_distance;
    };
    Tree.prototype.left_distance_SH01 = function (node) {
        var relevant_child = null;
        var left_distance = 1;
        if (node === this)
            return 0;
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.contains_node(node)) {
                relevant_child = c;
                break;
            }
        }
        if (relevant_child === null)
            throw "should not be";
        var relevant_child_index = this.children.indexOf(relevant_child);
        var left_trees = this.children.slice(0, relevant_child_index);
        for (var _b = 0, left_trees_1 = left_trees; _b < left_trees_1.length; _b++) {
            var l = left_trees_1[_b];
            left_distance += l.number_of_nodes();
        }
        left_distance += relevant_child.left_distance_SH01(node);
        return left_distance;
    };
    Tree.prototype.path_length_from_this = function (n) {
        if (this === n)
            return 0;
        var distance = 0;
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var c = _a[_i];
            var d = c.path_length_from_this(n);
            if (d > 0)
                return d + 1;
        }
        return -1;
    };
    Tree.prototype.number_of_nodes = function () {
        var number = 1;
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var c = _a[_i];
            number += c.number_of_nodes();
        }
        return number;
    };
    Tree.prototype.contains_node = function (n) {
        if (this === n)
            return true;
        else {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var c = _a[_i];
                if (c.contains_node(n))
                    return true;
            }
        }
        return false;
    };
    return Tree;
}());
export { Tree };
export function generate_flat_trees(number_of_children) {
    var ret = new Tree(null, []);
    repeat(number_of_children - 1, function (counter) {
        ret.children.push(new Tree(null, []));
    });
    return [ret];
}
export function generate_binary_trees(number_of_nodes) {
    var all_bin_trees_of_length = [];
    all_bin_trees_of_length.push([null]); // 0
    all_bin_trees_of_length.push([new Tree(null, [])]); // 1
    var _loop_1 = function (new_all_bin_trees_position) {
        var new_trees = [];
        for (var left_right_counter = 0; left_right_counter < all_bin_trees_of_length.length; left_right_counter++) {
            var left_children = all_bin_trees_of_length[left_right_counter];
            var right_children = all_bin_trees_of_length[all_bin_trees_of_length.length - left_right_counter - 1];
            all_array_combinations([left_children, right_children], function (combination) {
                var new_tree = new Tree(null, [combination[0], combination[1]]);
                new_trees.push(new_tree);
            });
        }
        all_bin_trees_of_length.push(new_trees);
    };
    for (var new_all_bin_trees_position = 2; new_all_bin_trees_position <= number_of_nodes; new_all_bin_trees_position++) {
        _loop_1(new_all_bin_trees_position);
    }
    return all_bin_trees_of_length[number_of_nodes];
}
export function all_true_false_binary_trees(number_of_tree_nodes) {
    var all_binary_trees = generate_binary_trees(number_of_tree_nodes);
    var number_of_true_false_combinations = Math.pow(2, number_of_tree_nodes) - 1;
    var all_true_false_combinations_array = all_true_false_combinations(number_of_true_false_combinations);
    var all_true_false_trees = [];
    iterate(all_binary_trees)
        .do(function (tree) {
        var _loop_2 = function (true_false_combination) {
            var cloned_tree = tree.clone();
            var binary_array_position = 0;
            cloned_tree.preorder(function (root) {
                root.content = true_false_combination[binary_array_position++];
                var this_strange_tree = cloned_tree;
            });
            all_true_false_trees.push(cloned_tree);
        };
        for (var _i = 0, all_true_false_combinations_array_1 = all_true_false_combinations_array; _i < all_true_false_combinations_array_1.length; _i++) {
            var true_false_combination = all_true_false_combinations_array_1[_i];
            _loop_2(true_false_combination);
        }
    });
    return all_true_false_trees;
}
export function generate_trees(number_of_nodes) {
    if (number_of_nodes == 1) {
        return [new Tree(null, [])];
    }
    var ret = [];
    var partitions = integer_partition_function(number_of_nodes - 1);
    for (var _i = 0, partitions_1 = partitions; _i < partitions_1.length; _i++) {
        var p = partitions_1[_i];
        var this_partition = [];
        for (var _a = 0, p_1 = p; _a < p_1.length; _a++) {
            var child = p_1[_a];
            this_partition.push(generate_trees(child));
        }
        all_array_combinations(this_partition, function (e) {
            var children = [];
            e.forEach(function (t) { return children.push(t.clone()); });
            ret.push(new Tree(null, children));
            // ret.push(children);
        });
    }
    return ret;
}
function t(children) {
    if (children === void 0) { children = []; }
    return new Tree(null, children);
}
function test_distance_SH01(debug) {
    var source = new Tree("source", []);
    var target = new Tree("target", []);
    var distance = -1;
    var tree = null;
    tree = t([
        t([t(), t(), t()]),
        t([t(), t([source, target]), t()])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 1, "distance = 1", debug);
    tree = t([
        t([t(), t([source, target]), t()]),
        t([t(), t(), t()])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 1, "distance = 1", debug);
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
    is_true(distance == 0, "distance = 0 (source==root)", debug);
    tree = target.clone();
    tree.children = [source];
    distance = tree.distance_SH01(source, tree);
    is_true(distance == 0, "distance = 0 (target==root)", debug);
    /*
          / \ = 1
         s   t              */
    tree = t([
        source,
        target
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 1, "distance = 1", debug);
    /*
          / \
         /   t = 3
        s              */
    tree = t([
        t([source]),
        target
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 2, "distance = 2", debug);
    tree = t([
        t([source, t()]),
        target
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 3, "distance = 3", debug);
}
var a = [1, 2];
var b = a.slice(0, 1);
test_distance_SH01(true);
