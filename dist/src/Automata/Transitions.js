var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { contains } from "../utils/Utils";
export function init() { }
var Transition_Acceptor = /** @class */ (function () {
    function Transition_Acceptor() {
    }
    return Transition_Acceptor;
}());
var Transition_Strings_Acceptor = /** @class */ (function (_super) {
    __extends(Transition_Strings_Acceptor, _super);
    function Transition_Strings_Acceptor(strings) {
        var _this = _super.call(this) || this;
        _this.accepted_strings = strings;
        return _this;
    }
    Transition_Strings_Acceptor.prototype.accepts = function (input) {
        return contains(this.accepted_strings, input);
    };
    return Transition_Strings_Acceptor;
}(Transition_Acceptor));
var Transition_Acceptor_Function = /** @class */ (function (_super) {
    __extends(Transition_Acceptor_Function, _super);
    function Transition_Acceptor_Function(acceptor_function) {
        var _this = _super.call(this) || this;
        _this.acceptor_function = acceptor_function;
        return _this;
    }
    Transition_Acceptor_Function.prototype.accepts = function (input) {
        return this.acceptor_function(input);
    };
    return Transition_Acceptor_Function;
}(Transition_Acceptor));
export { Transition_Acceptor_Function };
var Transition_Strings_Accepts_ALL = /** @class */ (function (_super) {
    __extends(Transition_Strings_Accepts_ALL, _super);
    function Transition_Strings_Accepts_ALL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Transition_Strings_Accepts_ALL.prototype.accepts = function (input) {
        return true;
    };
    return Transition_Strings_Accepts_ALL;
}(Transition_Acceptor));
export function keys(strings) {
    return new Transition_Strings_Acceptor(strings);
}
export function if_func(f) {
    return new Transition_Acceptor_Function(f);
}
export function each_char(charlist) {
    var chars = [];
    for (var _i = 0, charlist_1 = charlist; _i < charlist_1.length; _i++) {
        var a = charlist_1[_i];
        chars.push(a);
    }
    return new Transition_Strings_Acceptor(chars);
}
var Transition = /** @class */ (function () {
    function Transition(from, acceptor, next_state, action) {
        this.from = from;
        this.acceptor = acceptor;
        this.next_state = next_state;
        this.action = action;
    }
    ;
    Transition.prototype.is_valid_input = function (input) {
        return this.acceptor.accepts(input);
    };
    Transition.prototype.accepts = function (input) {
        return this.acceptor.accepts(input);
    };
    return Transition;
}());
export { Transition };
export function Simple_Transition(from, accept_input_function, next_state, action) {
    return new Transition(from, new Transition_Acceptor_Function(accept_input_function), next_state, function (s, i, n) { return action(i); });
}
export function accept_all() {
    return new Transition_Strings_Accepts_ALL();
}
export function do_nothing(at, input, next) { }
export function pass(f) {
    return function (at, input, next) { return f(); };
}
export function from(from) {
    return {
        to: function (to) {
            return {
                on: function (key) {
                    return {
                        if: function (check) {
                            return {
                                do: function (action) {
                                    return Simple_Transition(from, function (input) { return input == key && check(input); }, to, action);
                                }
                            };
                        },
                        do: function (action) {
                            return Simple_Transition(from, function (input) { return input == key; }, to, action);
                        }
                    };
                },
                on_any: function (keys) {
                    return {
                        if: function (check) {
                            return {
                                do: function (action) {
                                    return Simple_Transition(from, function (input) {
                                        return contains(keys, input) && check(input);
                                    }, to, action);
                                }
                            };
                        },
                        do: function (action) {
                            return Simple_Transition(from, function (input) { return contains(keys, input); }, to, action);
                        }
                    };
                }
            };
        },
    };
}
