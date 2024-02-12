import {Automata} from "./Automata.js";

export class Automata_Forwarder {

    automata: Automata;

    constructor(forwarder_name: string) {
        this.forwarder_name = forwarder_name;
    }

    forwarder_name: string;

    input(s: string) {
        this.automata.input(s);
    }

    set_active_function: ()=>void = ()=>{};

    set_active() {
        this.show_intro();
        // this.set_active_function();
    }

    add_activation_function(to_add: ()=>void) {
        // let old_activation_function = this.set_active_function;
        // this.set_active_function = () => {
        //     old_activation_function();
        //     to_add();
        // }
    }

    show_intro() {}
}