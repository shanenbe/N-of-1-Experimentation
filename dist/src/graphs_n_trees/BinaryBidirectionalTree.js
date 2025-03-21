import { is_true } from '../utils/Testing';
var BinaryBidirectionalTree = /** @class */ (function () {
    function BinaryBidirectionalTree(left, right) {
        this.content = null;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.left = left;
        if (left != null)
            this.left.parent = this;
        this.right = right;
        if (right != null)
            this.right.parent = this;
    }
    BinaryBidirectionalTree.prototype.is_left_child = function () {
        if (this.parent == null)
            return false;
        return this.parent.left == this;
    };
    BinaryBidirectionalTree.prototype.is_right_child = function () {
        if (this.parent == null)
            return false;
        return this.parent.right == this;
    };
    BinaryBidirectionalTree.prototype.number_of_nodes = function () {
        return 1 + (this.left != null ? this.left.number_of_nodes() : 0) + (this.right != null ? this.right.number_of_nodes() : 0);
    };
    BinaryBidirectionalTree.prototype.number_of_inner_nodes = function () {
        if (this.is_leave())
            return 0;
        // console.log("num_inner_nodes: " + this.source_string());
        return 1 + (this.left != null ? this.left.number_of_inner_nodes() : 0) + (this.right != null ? this.right.number_of_inner_nodes() : 0);
    };
    BinaryBidirectionalTree.prototype.source_string = function () {
        var arr = [];
        this.source_string_writer(arr);
        return arr.join("");
    };
    BinaryBidirectionalTree.prototype.source_string_writer = function (arr) {
        if (this.is_leave()) {
            arr.push(this.content);
            return;
        }
        arr.push("(");
        if (this.left != null)
            this.left.source_string_writer(arr);
        arr.push(this.content);
        if (this.right != null)
            this.right.source_string_writer(arr);
        arr.push(")");
    };
    BinaryBidirectionalTree.prototype.clone = function () {
        var left_child = (this.left != null) ? this.left.clone() : this.left;
        var right_child = (this.right != null) ? this.right.clone() : this.right;
        var ret = new BinaryBidirectionalTree(left_child, right_child);
        ret.content = (this.content == null) ? null : this.content.clone();
        return ret;
    };
    BinaryBidirectionalTree.prototype.push_leaves = function () {
        if (this.left != null)
            this.left.push_leaves();
        else {
            this.left = new BinaryBidirectionalTree(null, null);
            this.left.parent = this;
        }
        if (this.right != null)
            this.right.push_leaves();
        else {
            this.right = new BinaryBidirectionalTree(null, null);
            this.right.parent = this;
        }
    };
    BinaryBidirectionalTree.prototype.as_in_order_array = function () {
        var arr = [];
        this.as_in_order_array_writer(arr);
        return arr;
    };
    BinaryBidirectionalTree.prototype.as_in_order_array_writer = function (arr) {
        if (this.left != null)
            this.left.as_in_order_array_writer(arr);
        arr.push(this);
        if (this.right != null)
            this.right.as_in_order_array_writer(arr);
    };
    BinaryBidirectionalTree.prototype.set_all_operator_values = function (operator_value) {
        var arr = this.as_in_order_array();
        arr = arr.filter(function (e) { return !e.is_leave(); });
        arr.forEach(function (e) { return e.content = operator_value; });
    };
    BinaryBidirectionalTree.prototype.set_all_leave_values = function (leave_value) {
        var arr = this.as_in_order_array();
        arr = arr.filter(function (e) { return e.is_leave(); });
        arr.forEach(function (e) { return e.content = leave_value; });
    };
    BinaryBidirectionalTree.prototype.is_leave = function () {
        return this.left == null && this.right == null;
    };
    BinaryBidirectionalTree.prototype.call_by_value_order = function () {
        var arr = [];
        this.call_by_value_order_writer(arr);
        return arr;
    };
    BinaryBidirectionalTree.prototype.call_by_value_order_writer = function (arr) {
        if (this.is_leave()) {
            arr.push(this);
            return;
        }
        if (this.left != null) {
            this.left.call_by_value_order_writer(arr);
        }
        if (this.right != null) {
            this.right.call_by_value_order_writer(arr);
        }
        arr.push(this);
    };
    BinaryBidirectionalTree.prototype.has_child = function (child) {
        if (this === child)
            return true;
        else if (this.left != null)
            if (this.left.has_child(child))
                return true;
        if (this.right != null)
            if (this.right.has_child(child))
                return true;
        return false;
    };
    return BinaryBidirectionalTree;
}());
export { BinaryBidirectionalTree };
export function create_catalan_graphs(number_of_nodes) {
    var nodes = [];
    _catalan_graphs(number_of_nodes, nodes);
    return nodes;
}
function _catalan_graphs(number_of_nodes, results) {
    if (number_of_nodes == 0) {
        results.push(null);
        return;
    }
    else if (number_of_nodes == 1) {
        results.push(new BinaryBidirectionalTree(null, null));
        return;
    }
    else {
        for (var left_counter = 0; left_counter < number_of_nodes; left_counter++) {
            var diff = number_of_nodes - left_counter - 1;
            var left_children = [];
            var right_children = [];
            _catalan_graphs(left_counter, left_children);
            _catalan_graphs(diff, right_children);
            for (var then_branch = 0; then_branch < left_children.length; then_branch++) {
                for (var else_branch = 0; else_branch < right_children.length; else_branch++) {
                    results.push(new BinaryBidirectionalTree(left_children[then_branch], right_children[else_branch]));
                }
            }
        }
    }
}
function test_catalan_graphs() {
    var nodes = [];
    nodes = create_catalan_graphs(1);
    is_true(nodes.length == 1, "Catalan number 1 = 1");
    nodes = create_catalan_graphs(2);
    is_true(nodes.length == 2, "Catalan number 2 = 2");
    nodes = create_catalan_graphs(3);
    is_true(nodes.length == 5, "Catalan number 3 = 5");
    nodes = create_catalan_graphs(4);
    is_true(nodes.length == 14, "Catalan number 4 = 14");
    nodes = create_catalan_graphs(5);
    is_true(nodes.length == 42, "Catalan number");
    nodes = create_catalan_graphs(6);
    is_true(nodes.length == 132, "Catalan number");
    nodes = create_catalan_graphs(7);
    is_true(nodes.length == 429, "Catalan number");
    nodes = create_catalan_graphs(8);
    is_true(nodes.length == 1430, "Catalan number");
    nodes = create_catalan_graphs(9);
    is_true(nodes.length == 4862, "Incorrect Catalan number");
    console.log("Catalan numbers seem ok.");
}
test_catalan_graphs();
