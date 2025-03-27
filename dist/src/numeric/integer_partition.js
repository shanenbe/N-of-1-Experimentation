/*
Partitions a given integer into its parts - including all combinations
eg: (1) => (1)
    (2) => (2), (1, 1)
    (3) => (3), (2, 1), (1, 2), (1, 1, 1)
    (4) => (1, 1, 1, 1), (1, 1, 2), (1, 2, 1), (1, 3), (2, 1, 1), (2, 2), (3, 1), (4)
 */
export function integer_partition_function(n) {
    var ret = [];
    if (n == 0)
        return [];
    for (var i = 1; i <= n; i++) {
        var partitions = integer_partition_function(n - i);
        for (var _i = 0, partitions_1 = partitions; _i < partitions_1.length; _i++) {
            var part = partitions_1[_i];
            var row = [i];
            for (var _a = 0, part_1 = part; _a < part_1.length; _a++) {
                var r = part_1[_a];
                row.push(r);
            }
            ret.push(row);
        }
        if (partitions.length == 0)
            ret.push([n]);
    }
    return ret;
}
export function integer_partitions_of_fix_length_with_constraint(n, number_of_partitions, constraint_function) {
    var partitions = integer_partitions_of_fix_length(n, number_of_partitions);
    var valid_partitions = [];
    for (var _i = 0, partitions_2 = partitions; _i < partitions_2.length; _i++) {
        var part = partitions_2[_i];
        var is_valid = true;
        for (var _a = 0, part_2 = part; _a < part_2.length; _a++) {
            var e = part_2[_a];
            if (!constraint_function(e)) {
                is_valid = false;
                break;
            }
        }
        if (is_valid) {
            if (part.length != number_of_partitions)
                console.log("strange");
            if (part.length != number_of_partitions) {
                throw "wtf";
            }
            valid_partitions.push(part);
        }
    }
    return valid_partitions;
}
export function integer_partitions_of_fix_length(n, number_of_partitions) {
    if (number_of_partitions == 1)
        return [[n]];
    var ret = [];
    for (var i = 0; i <= n; i++) {
        var partitions = integer_partitions_of_fix_length(n - i, number_of_partitions - 1);
        for (var _i = 0, partitions_3 = partitions; _i < partitions_3.length; _i++) {
            var part = partitions_3[_i];
            if (part.length != number_of_partitions - 1)
                throw "invalid partition!";
            var row = [i];
            for (var _a = 0, part_3 = part; _a < part_3.length; _a++) {
                var r = part_3[_a];
                row.push(r);
            }
            ret.push(row);
        }
        if (partitions.length == 0)
            ret.push([n]);
    }
    return ret;
}
function test_integer_partition_function() {
    var partition = [];
    partition = integer_partition_function(4);
    partition = integer_partition_function(0);
    console.log(partition);
}
test_integer_partition_function();
