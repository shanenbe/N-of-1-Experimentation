/*
Partitions a given integer into its parts - including all combinations
eg: (1) => (1)
    (2) => (2), (1, 1)
    (3) => (3), (2, 1), (1, 2), (1, 1, 1)
 */

export function integer_partition_function(n:number):number[][] {
    let ret = [];
    if (n==0) return [];
    for(let i = 1; i <= n; i++) {
        let partitions = integer_partition_function(n - i);
        for(let part of partitions) {
            let row = [i];
            for(let r of part) {
                row.push(r);
            }
            ret.push(row);
        }
        if(partitions.length==0)
            ret.push([n]);
    }
    return ret;
}

function test_integer_partition_function() {
    let partition = [];
    partition = integer_partition_function(5);
    partition = integer_partition_function(0);
}


test_integer_partition_function();