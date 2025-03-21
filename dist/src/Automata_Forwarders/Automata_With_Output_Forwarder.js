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
import { Automata_Forwarder } from "../Automata/Automata_Forwarder";
import { Automata } from "../Automata/Automata";
export function init() { }
/*
    I don't do anything - I am just a superclass
 */
var Automata_With_Output_Forwarder = /** @class */ (function (_super) {
    __extends(Automata_With_Output_Forwarder, _super);
    function Automata_With_Output_Forwarder(forwarder_name, measurement, pre_run_instructions, post_run_instructions) {
        var _this = _super.call(this, forwarder_name) || this;
        _this.pre_run_instructions = pre_run_instructions;
        _this.post_run_instructions = post_run_instructions;
        _this.measurement = measurement;
        _this.automata = _this.create_automata(); //new Automata(this.automata_configurator());
        _this.automata.initialize();
        return _this;
    }
    Automata_With_Output_Forwarder.prototype.set_active = function () {
        this.show_intro();
    };
    Automata_With_Output_Forwarder.prototype.create_automata = function () {
        return new Automata(this.automata_configurator());
    };
    Automata_With_Output_Forwarder.prototype.output_writer = function () {
        return this.measurement.output_writer();
    };
    Automata_With_Output_Forwarder.prototype.show_intro = function () {
        this.output_writer().clear_all();
        this.output_writer().print_string_to_state(this.forwarder_name);
        this.pre_run_instructions();
    };
    Automata_With_Output_Forwarder.prototype.empty_screen_and_show_instructions = function (command) {
        this.output_writer().clear_state();
        this.output_writer().clear_stage();
        if (command == null || command == undefined)
            console.log("something is strange");
        else
            command();
    };
    return Automata_With_Output_Forwarder;
}(Automata_Forwarder));
export { Automata_With_Output_Forwarder };
