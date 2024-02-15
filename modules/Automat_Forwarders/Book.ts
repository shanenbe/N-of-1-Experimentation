import {from} from "../Automata/Transitions.js";
import {Automata_Configurator, create_automata} from "../Automata/Automata_Configurator.js";
import {Automata_With_Output_Forwarder} from "./Automata_With_Output_Forwarder.js";
import {Measurement_Type, Output_Command} from "../Experimentation/Experimentation.js";

export function init(){}

let SHOW_PAGE=0;
let FINISHED_BOOK=1;
let EVERYTHING_DONE = 1;

export class Book extends Automata_With_Output_Forwarder {

    pages:Output_Command[];
    current_page_number:number = -1;

    set_page_index(index:number) {
        this.current_page_number = index;
        this.output_writer().print_string_to_state(this.forwarder_name);
        this.empty_screen_and_show_instructions(this.pages[this.current_page_number]);
        this.output_writer().print_string_to_page_number("Page " + (this.current_page_number + 1) + " / " + this.pages.length);

        let navigation_string ="<hr>";
        if(index>0)
            navigation_string += "[&#8592] = previous page";
        if(index<this.pages.length-1)
            navigation_string += (navigation_string!="<hr>"?"<br>":"") + "[&#8594] = next page";

        if(index==this.pages.length-1)
            navigation_string += (navigation_string!="<hr>"?"<br>":"") + "[Enter] = Finish";

        this.output_writer().print_html_on_stage(navigation_string);
    }

    set_active() {
        super.set_active();
    }

    show_intro() {
        this.set_page_index(0);
    }

    automata_configurator()  {
        return new Automata_Configurator(
            [SHOW_PAGE, EVERYTHING_DONE],
            SHOW_PAGE,
            ()=>{},
            this.transitions(),
            [EVERYTHING_DONE]
        );
    }

    transitions() {
        return [
            from(SHOW_PAGE).to(SHOW_PAGE)
                .on("ArrowRight")
                .if((i:string) => this.current_page_number < this.pages.length-1)
                .do((i:string) => {
                    this.set_page_index(++this.current_page_number);
                }),

            from(SHOW_PAGE).to(SHOW_PAGE)
                .on("ArrowLeft")
                .if((i:string) => this.current_page_number > 0)
                .do((i:string) => {
                    this.set_page_index(--this.current_page_number);
                }),

            from(SHOW_PAGE).to(EVERYTHING_DONE)
                .on("Enter")
                .if((i:string) => this.current_page_number >= this.pages.length-1)
                .do((i:string) => {})
        ];
    }



    constructor(
        book_name: string,
        text: Output_Command[],
        measurement: Measurement_Type,
    ) {
        super(book_name, measurement, text[0], text[text.length-1]);

        this.pages = text;
        this.create_automata();

//         this.print_current_page = () => {
//             this.pages[this.current_page_number]();
//             // this.output_writer().print_string_on_stage("CURRENT BOOK PAGE");
//             // this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, this.pages[this.current_page]);
// // TODO:
// //             if(this.current_page==0 && this.pages.length>1) {
// //                 this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE,   text_line("Use right arrow [->] to go to the next question."));
// //             } else if (this.current_page==this.pages.length-1 && this.pages.length>1) {
// //                 this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE,   text_line("Use left arrow [<-] to go to the previous question."));
// //             } else if (this.current_page>0 && this.current_page<this.pages.length-1) {
// //                 this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE,   text_line("Use right arrow [->] to go to the next question."));
// //                 this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE,   text_line("Use left arrow [<-] to go to the previous question."));
// //             }
// //
// //             this.output_writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.TASK, text_line("" + (this.current_page + 1) + "/" + this.pages.length));
//         }
        // this.set_active();
    }


    end_states() {
        return [1];
    }

    start_state() {
        return 0;
    }
    //
    // states() {
    //     return [0, 1];
    // }
    //
    // create_transitions() {
    //     return [
    //         from(0).to(0)
    //             .on("ArrowRight")
    //             .if(() => this.current_page_number < this.pages.length - 1)
    //             .do(() => {
    //                 this.go_to_next_page()
    //             }),
    //
    //         from(0).to(0)
    //             .on("ArrowLeft")
    //             .if(() => this.current_page_number > 0)
    //             .do(() => {
    //                 this.go_to_previous_page()
    //             }),
    //
    //         from(0).to(1)
    //             .on("Enter")
    //             .if(() => this.current_page_number == this.pages.length - 1)
    //             .do(() => {
    //             }),
    //
    //     ];
    // }





    show_outro() {
    }
}

export function create_book(
    book_name: string,
    text:Output_Command[],
    measurement: Measurement_Type
) {
    return new Book(book_name, text, measurement);
}

