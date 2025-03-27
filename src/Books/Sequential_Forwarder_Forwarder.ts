import {Automata_Forwarder} from "../Automata/Automata_Forwarder";
import {create_automata} from "../Automata/Automata_Configurator";
import {from} from "../Automata/Transitions";

export class Sequential_Forwarder_Forwarder extends Automata_Forwarder{

    forwarders: Automata_Forwarder[];
    current_forwarder_index = 0;

    constructor(forwarders: Automata_Forwarder[]) {
        super("Default Sequential Forwarder Forwader");
        this.forwarders = forwarders;
        for(let forwarder of forwarders) {
            forwarder.automata.add_finish_action(()=>this.automata.input("switch to next state"));
        }
        this.automata = create_automata(
            [0, 1],
            0,
            () => {},
            [
                from(0).to(0)
                    .on("switch to next state")
                    .if(() => this.current_forwarder_index < this.forwarders.length-1)
                    .do(() => {this.current_forwarder_index++; this.current_forwarder().set_active()}),

                from(0).to(1)
                    .on("switch to next state")
                    .if(() => this.current_forwarder_index==this.forwarders.length-1)
                    .do(() => {})
            ],
            [1]
        );
        this.automata.initialize();
        // this.set_active();
        // console.log("active forward: " + this.current_forwarder().forwarder_name);
    }

    input(input:string) {
        this.forwarders[this.current_forwarder_index].input(input);
    }

    input_sequence(input_sequence:string[]) {
        for(let s of input_sequence)
            this.input(s);
    }

    current_forwarder() {
        return this.forwarders[this.current_forwarder_index];
    }

    set_active() {
        super.set_active();
        this.current_forwarder().set_active();
    }
}
