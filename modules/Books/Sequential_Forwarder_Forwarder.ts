import {Automata_Forwarder} from "../Automata/Automata_Forwarder.js";
import {create_automata} from "../Automata/Automata_Configurator.js";
import {from} from "../Automata/Transitions.js";
import {create_book} from "./Book.js";
import {guarantee_test} from "../Utils.js";
import {text_line, text_pages} from "./IO_Object.js";
import {AUTOMATA_OUTPUT_WRITER_ACTION, AUTOMATA_OUTPUT_WRITER_TAGS, Simplified_IO} from "./Automata_IO.js";

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
        this.set_active();
        console.log("active forward: " + this.current_forwarder().forwarder_name);
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

export function Books_tests() {

    let string_output = new Simplified_IO();

    let book_01 = create_book("MyBook1", text_pages(["Book1_Page1", "Book1_Page2", "Book1_Page3"]), string_output);
    let book_02 = create_book("MyBook2", text_pages(["Book2_Page1", "Book2_Page2", "Book2_Page3"]), string_output);
    let books = new Sequential_Forwarder_Forwarder([book_01, book_02]);

    books.automata.add_finish_action(()=>string_output.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line("DONE")));

    guarantee_test(()=>this.string_output=="Book1_Page1");
    books.input("ArrowRight");
    guarantee_test(()=>this.string_output=="Book1_Page2");
    books.input("ArrowLeft");
    guarantee_test(()=>this.string_output=="Book1_Page1");
    books.input("ArrowRight");
    books.input("ArrowRight");
    guarantee_test(()=>this.string_output=="Book1_Page3");
    books.input("Enter");
    guarantee_test(()=>this.string_output=="Book2_Page1");
    books.input("ArrowLeft");
    guarantee_test(()=>this.string_output=="Book2_Page1");
    books.input("ArrowRight");
    books.input("ArrowRight");
    guarantee_test(()=>this.string_output=="Book2_Page3");
    books.input("Enter");
    guarantee_test(()=>this.string_output=="DONE");
}

