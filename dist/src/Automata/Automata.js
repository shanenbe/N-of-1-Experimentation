import { contains } from "../utils/Utils";
export function init() { }
var Automata = /** @class */ (function () {
    function Automata(config) {
        this.current_state = -1;
        this.transitions = [];
        this.states = [];
        this.start_state = config.start;
        this.states = config.states;
        for (var i = 0; i < this.states.length; i++) {
            this.transitions.push([]);
        }
        for (var _i = 0, _a = config.transitions; _i < _a.length; _i++) {
            var t = _a[_i];
            if (this.transitions == null) {
                console.log("Something is wrong here");
            }
            if (this.transitions == undefined || t.from == undefined) {
                console.log("Something is wrong here");
            }
            if (this.transitions[t.from] == undefined) {
                console.log("Something is wrong here");
            }
            try {
                this.transitions[t.from].push(t);
            }
            catch (e) {
                console.log("weird");
            }
        }
        this.init_function = config.init_function;
        this.end_states = config.end_states;
    }
    // on_finish_function: (number) => void;
    Automata.prototype.input = function (input) {
        var matching_transition = this.first_match(input);
        var state_before = this.current_state;
        if (matching_transition != null) {
            this.current_state = matching_transition.next_state; // go to next state
            matching_transition.action(state_before, input, this.current_state); // go to next state
        }
    };
    Automata.prototype.start = function () {
        this.current_state = this.start_state;
    };
    Automata.prototype.first_match = function (input) {
        for (var i = 0; i < this.transitions[this.current_state].length; i++) {
            if (this.transitions[this.current_state][i].accepts(input))
                return this.transitions[this.current_state][i];
        }
        return null;
    };
    Automata.prototype.initialize = function () {
        this.current_state = this.start_state;
        this.init_function();
    };
    Automata.prototype.add_finish_action = function (action) {
        for (var _i = 0, _a = this.transitions; _i < _a.length; _i++) {
            var transitions = _a[_i];
            var _loop_1 = function (transition) {
                if (this_1.is_transition_to_end(transition)) {
                    var former_action_1 = transition.action;
                    transition.action = function (from, input, next) {
                        former_action_1(from, input, next);
                        action();
                    };
                }
            };
            var this_1 = this;
            for (var _b = 0, transitions_1 = transitions; _b < transitions_1.length; _b++) {
                var transition = transitions_1[_b];
                _loop_1(transition);
            }
        }
    };
    Automata.prototype.is_transition_to_end = function (transition) {
        return contains(this.end_states, transition.next_state);
    };
    Automata.prototype.add_action_to_transitions = function (is_target_transition, action) {
        for (var _i = 0, _a = this.transitions; _i < _a.length; _i++) {
            var transitions = _a[_i];
            var _loop_2 = function (transition) {
                if (is_target_transition(transition)) {
                    var former_action_2 = transition.action;
                    transition.action = function (from, input, next) {
                        former_action_2(from, input, next);
                        action();
                    };
                }
            };
            for (var _b = 0, transitions_2 = transitions; _b < transitions_2.length; _b++) {
                var transition = transitions_2[_b];
                _loop_2(transition);
            }
        }
    };
    return Automata;
}());
export { Automata };
