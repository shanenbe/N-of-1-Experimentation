import { Automata } from "./Automata";
export function init() { }
var Automata_Configurator = /** @class */ (function () {
    function Automata_Configurator(states, start, init_function, transitions, end_states) {
        this.states = states;
        this.start = start;
        this.init_function = init_function;
        this.transitions = transitions;
        this.end_states = end_states;
    }
    return Automata_Configurator;
}());
export { Automata_Configurator };
export function create_automata(states, start, init_function, transitions, end_states) {
    return new Automata(new Automata_Configurator(states, start, init_function, transitions, end_states));
}
