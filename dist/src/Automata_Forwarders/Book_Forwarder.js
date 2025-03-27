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
import { from } from "../Automata/Transitions";
import { Automata_Configurator } from "../Automata/Automata_Configurator";
import { Automata_With_Output_Forwarder } from "./Automata_With_Output_Forwarder";
export function init() { }
var SHOW_PAGE = 0;
var FINISHED_BOOK = 1;
var EVERYTHING_DONE = 1;
var Book_Forwarder = /** @class */ (function (_super) {
    __extends(Book_Forwarder, _super);
    function Book_Forwarder(book_name, text, measurement) {
        var _this = _super.call(this, book_name, measurement, text[0], text[text.length - 1]) || this;
        _this.current_page_number = -1;
        _this.pages = text;
        _this.create_automata();
        return _this;
    }
    Book_Forwarder.prototype.set_page_index = function (index) {
        this.current_page_number = index;
        this.empty_screen_and_show_instructions(this.pages[this.current_page_number]);
        this.output_writer().print_string_to_state(this.forwarder_name);
        this.output_writer().print_string_to_page_number("Page " + (this.current_page_number + 1) + " / " + this.pages.length);
        var navigation_string = "<hr>";
        if (index > 0)
            navigation_string += "[&#8592] = previous page";
        if (index < this.pages.length - 1)
            navigation_string += (navigation_string != "<hr>" ? "<br>" : "") + "[&#8594] = next page";
        if (index == this.pages.length - 1)
            navigation_string += (navigation_string != "<hr>" ? "<br>" : "") + "[Enter] = Finish";
        this.output_writer().print_html_on_stage(navigation_string);
    };
    Book_Forwarder.prototype.set_active = function () {
        _super.prototype.set_active.call(this);
    };
    Book_Forwarder.prototype.show_intro = function () {
        this.set_page_index(0);
    };
    Book_Forwarder.prototype.show_outro = function () { };
    Book_Forwarder.prototype.automata_configurator = function () {
        return new Automata_Configurator([SHOW_PAGE, EVERYTHING_DONE], SHOW_PAGE, function () { }, this.transitions(), [EVERYTHING_DONE]);
    };
    Book_Forwarder.prototype.transitions = function () {
        var _this = this;
        return [
            from(SHOW_PAGE).to(SHOW_PAGE)
                .on("ArrowRight")
                .if(function (i) { return _this.current_page_number < _this.pages.length - 1; })
                .do(function (i) {
                _this.set_page_index(++_this.current_page_number);
            }),
            from(SHOW_PAGE).to(SHOW_PAGE)
                .on("ArrowLeft")
                .if(function (i) { return _this.current_page_number > 0; })
                .do(function (i) {
                _this.set_page_index(--_this.current_page_number);
            }),
            from(SHOW_PAGE).to(EVERYTHING_DONE)
                .on("Enter")
                .if(function (i) { return _this.current_page_number >= _this.pages.length - 1; })
                .do(function (i) { })
        ];
    };
    return Book_Forwarder;
}(Automata_With_Output_Forwarder));
export { Book_Forwarder };
