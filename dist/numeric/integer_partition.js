/*
Partitions a given integer into its parts - including all combinations
eg: (1) => (1)
    (2) => (2), (1, 1)
    (3) => (3), (2, 1), (1, 2), (1, 1, 1)
    (4) => (1, 1, 1, 1), (1, 1, 2), (1, 2, 1), (1, 3), (2, 1, 1), (2, 2), (3, 1), (4)
 */
export function integer_partition_function(n) {
    let ret = [];
    if (n == 0)
        return [];
    for (let i = 1; i <= n; i++) {
        let partitions = integer_partition_function(n - i);
        for (let part of partitions) {
            let row = [i];
            for (let r of part) {
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
    let partitions = integer_partitions_of_fix_length(n, number_of_partitions);
    let valid_partitions = [];
    for (let part of partitions) {
        let is_valid = true;
        for (let e of part) {
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
    let ret = [];
    for (let i = 0; i <= n; i++) {
        let partitions = integer_partitions_of_fix_length(n - i, number_of_partitions - 1);
        for (let part of partitions) {
            if (part.length != number_of_partitions - 1)
                throw "invalid partition!";
            let row = [i];
            for (let r of part) {
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
    let partition = [];
    partition = integer_partition_function(4);
    partition = integer_partition_function(0);
    console.log(partition);
}
test_integer_partition_function();
