export function iterate_with_counter(array, f) {
    var counter = 0;
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var e = array_1[_i];
        f(e, counter++);
    }
}
export function iterate_both(a1, a2, f) {
    if (a1.length > a2.length)
        throw "Cannot loop both: first array has length: " + a1.length + ", but second has length " + a2.length;
    var counter = 0;
    for (var _i = 0, a1_1 = a1; _i < a1_1.length; _i++) {
        var e = a1_1[_i];
        f(e, a2[counter++]);
    }
}
export function iterate(array) {
    return new Iterator(array);
}
var Iterator = /** @class */ (function () {
    function Iterator(array) {
        this.array = array;
    }
    Iterator.prototype.do = function (f) {
        for (var _i = 0, _a = this.array; _i < _a.length; _i++) {
            var element = _a[_i];
            f(element);
        }
    };
    Iterator.prototype.do_with_counter = function (f) {
        for (var c = 0; c < this.array.length; c++) {
            f(this.array[c], c);
        }
    };
    return Iterator;
}());
export { Iterator };
export function repeat(n, f) {
    for (var c = 0; c < n; c++) {
        f(c);
    }
    // return new Repeat(0)
}
export function repeat_n_times(n) {
    return new Repeat(n);
}
export function repeat_(n) {
    return new Repeat(n);
}
var Repeat = /** @class */ (function () {
    function Repeat(counter) {
        this.counter = counter;
    }
    Repeat.prototype.and_collect = function (f) {
        var arr = [];
        for (var c = 1; c <= this.counter; c++) {
            arr.push(f(c));
        }
        return arr;
    };
    Repeat.prototype._times = function (f) {
        for (var c = 1; c <= this.counter; c++) {
            f();
        }
    };
    Repeat.prototype.times = function (f) {
        for (var c = 1; c <= this.counter; c++) {
            f(c);
        }
    };
    return Repeat;
}());
export { Repeat };
