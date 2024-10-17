export  function  loop_with_counter<T>(array:T[], f:((element:T, counter: number) => void)) {
    let counter = 0;
    for(let e of this.array) {
        f(e, counter++);
    }
}

export  function  loop_both<T1, T2>(a1:T1[], a2:T2[], f:(first:T1, second:T2)=>void) {
    if(a1.length>a2.length)
        throw "Cannot loop both: first array has length: " + a1.length + ", but second has length " + a2.length;

    let counter = 0;
    for(let e of a1) {
        f(e, a2[counter++]);
    }
}

export function repeat(n:number, f:((c:number)=>void)) {
    for(let c=0; c < n; c++) {
        f(c);
    }
}
