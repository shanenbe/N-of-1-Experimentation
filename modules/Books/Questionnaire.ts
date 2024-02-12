// import {from} from "../Automata/Transitions.js";
// import {Book} from "./Book.js";
// import {Measurement_Type} from "../Experimentation/Experimentation";
//
// export class Questionnaire extends Book {
//
//
//     questions: Input_Object[];
//
//     constructor(book_name: string, questions: Input_Object[], measurement: Measurement_Type) {
//         super(book_name, questions, measurement);
//         this.questions = questions;
//     }
//
//     states() {
//         return [0, 1, 2, 3, 4];
//     }
//
//     end_states() {
//         return [3];
//     }
//     create_transitions() {
//         return [
//             from(0).to(0)
//                 .on_any(["ArrowRight", "Enter"])
//                 .if(() => (this.current_page < this.pages.length - 1) && (this.questions[this.current_page].can_be_left()) )
//                 .do(() => {
//                     this.go_to_next_page()
//                 }),
//
//             from(0).to(1)
//                 .on_any(["ArrowRight", "Enter"])
//                 .if(() => (this.current_page < this.pages.length - 1) && !this.questions[this.current_page].can_be_left() )
//                 .do(() => {
//                     this.ask_to_answer_question();
//                 }),
//
//             from(1).to(0)
//                 .on_any(["ArrowRight", "Enter"])
//                 .if(() => (this.current_page < this.pages.length - 1) && this.questions[this.current_page].can_be_left() )
//                 .do(() => {
//                     this.go_to_next_page();
//                 }),
//
//             from(1).to(0)
//                 .on_any(["ArrowLeft"])
//                 .if(() => (this.current_page > 0) && this.questions[this.current_page].can_be_left() )
//                 .do(() => {
//                     this.go_to_previous_page()
//                 }),
//
//             from(0).to(0)
//                 .on("ArrowLeft")
//                 .if(() => this.current_page > 0 && this.questions[this.current_page].can_be_left())
//                 .do(() => {
//                     this.go_to_previous_page()
//                 }),
//
//             from(0).to(1)
//                 .on("ArrowLeft")
//                 .if(() => (this.current_page > 0) && !this.questions[this.current_page].can_be_left() )
//                 .do(() => {
//                     this.ask_to_answer_question();
//                 }),
//
//             from(0).to(2)
//                 .on_any(["Enter", "ArrowRight"])
//                 .if(() =>(this.current_page == this.pages.length - 1))
//                 .do(() => {
//                     this.output_writer().clear_stage();
//                     this.output_writer().print_string_on_stage("Thank you for answering all questions. You can go on by pressing [Enter].");
//                 }),
//
//             from(1).to(2)
//                 .on_any(["Enter", "ArrowRight"])
//                 .if(() =>(this.current_page == this.pages.length - 1))
//                 .do(() => {
//                     this.output_writer().clear_stage();
//                     this.output_writer().print_string_on_stage("Thank you for answering all questions. You can go on by pressing [Enter].");
//                 }),
//
//
//             from(0).to(2)
//                 .on_any(["ArrowRight", "Enter"])
//                 .if(() =>(this.current_page == this.pages.length - 1) && this.all_required_questions_answered())
//                 .do(() => {
//                     this.output_writer().clear_stage();
//                     this.output_writer().print_string_on_stage("Thank you for answering all questions. You can go on by pressing [Enter].");
//                 }),
//
//             from(2).to(3)
//                 .on("Enter")
//                 .if(() =>(this.current_page == this.pages.length - 1) && this.all_required_questions_answered())
//                 .do(
//                     () => {}
//                 ),
//
//         ];
//     }
//
//     all_required_questions_answered():boolean {
//         for(let page of this.pages) {
//             let input = page as Input_Object;
//             if(!input.has_valid_input())
//                 return false;
//         }
//         return true;
//     }
//
//     ask_to_answer_question() {
//         this.output_writer().print_error_on_stage("Please, answer the question.");
//     }
//
// }
