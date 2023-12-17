import {from} from "../Automata/Transitions.js";
import {guarantee_true} from "../Utils.js";
import {create_automata} from "../Automata/Automata_Configurator.js";
import {Automata_With_Output_Forwarder} from "./Automata_With_Output_Forwarder.js";
import {Input_Object, IO_Object, text_line, text_pages} from "./IO_Object.js";
import {Automata_IO, AUTOMATA_OUTPUT_WRITER_ACTION, AUTOMATA_OUTPUT_WRITER_TAGS, Simplified_IO} from "./Automata_IO.js";

export function init(){}


export class Book extends Automata_With_Output_Forwarder {

    pages:IO_Object[];
    current_page:number = -1;

    print_current_page: ()=>void;

    constructor(
        book_name: string,
        text: IO_Object[],
        output_writer: Automata_IO,
    ) {
        super(book_name, output_writer, null, null);

        this.pages = text;
        this.current_page = 0;

        this.print_current_page = () => {
            this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, this.pages[this.current_page]);

            if(this.current_page==0 && this.pages.length>1) {
                this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE,   text_line("Use right arrow [->] to go to the next question."));
            } else if (this.current_page==this.pages.length-1 && this.pages.length>1) {
                this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE,   text_line("Use left arrow [<-] to go to the previous question."));
            } else if (this.current_page>0 && this.current_page<this.pages.length-1) {
                this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE,   text_line("Use right arrow [->] to go to the next question."));
                this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE,   text_line("Use left arrow [<-] to go to the previous question."));
            }

            this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.TASK, text_line("" + (this.current_page + 1) + "/" + this.pages.length));
        }
        this.create_and_init_automata();
        this.set_active();
    }

    create_and_init_automata() {
        this.automata = create_automata(
            this.states(),
            this.start_state(),
            () => {this.print_current_page()},
            this.create_transitions(),
            this.end_states()
        );

        this.automata.initialize();
    }

    end_states() {
        return [1];
    }

    start_state() {
        return 0;
    }

    states() {
        return [0, 1];
    }

    create_transitions() {
        return [
            from(0).to(0)
                .on("ArrowRight")
                .if(() => this.current_page < this.pages.length - 1)
                .do(() => {
                    this.go_to_next_page()
                }),

            from(0).to(0)
                .on("ArrowLeft")
                .if(() => this.current_page > 0)
                .do(() => {
                    this.go_to_previous_page()
                }),

            from(0).to(1)
                .on("Enter")
                .if(() => this.current_page == this.pages.length - 1)
                .do(() => {
                }),

        ];
    }

    go_to_previous_page() {
        this.pages[this.current_page].do_action();
        this.current_page--;
        this.print_current_page();
    }

    go_to_next_page() {
        this.pages[this.current_page].do_action();
        this.current_page++;
        this.print_current_page()
    }


    set_active() {
        super.set_active();
        this.print_current_page();
    }
}

export function create_book(
    book_name: string,
    text:IO_Object[],
    output_writer: Automata_IO
) {
    return new Book(book_name, text, output_writer);
}


export function Book_tests() {


    let string_output = new Simplified_IO();

    let book = create_book(
                                "My book",
                                text_pages(
                                        [
                                                "Book1_Page1",
                                                "Book1_Page2",
                                                "Book1_Page3"
                                              ]
                                ),
                                string_output,
                          );

    guarantee_true(string_output.output_string=="Book1_Page1");
    book.input("ArrowRight");
    guarantee_true(string_output.output_string=="Book1_Page2");

}
