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
import { create_automata } from "../Automata/Automata_Configurator";
import { from } from "../Automata/Transitions";
var Sequential_Forwarder_Forwarder = /** @class */ (function (_super) {
    __extends(Sequential_Forwarder_Forwarder, _super);
    function Sequential_Forwarder_Forwarder(forwarders) {
        var _this = _super.call(this, "Default Sequential Forwarder Forwader") || this;
        _this.current_forwarder_index = 0;
        _this.forwarders = forwarders;
        for (var _i = 0, forwarders_1 = forwarders; _i < forwarders_1.length; _i++) {
            var forwarder = forwarders_1[_i];
            forwarder.automata.add_finish_action(function () { return _this.automata.input("switch to next state"); });
        }
        _this.automata = create_automata([0, 1], 0, function () { }, [
            from(0).to(0)
                .on("switch to next state")
                .if(function () { return _this.current_forwarder_index < _this.forwarders.length - 1; })
                .do(function () { _this.current_forwarder_index++; _this.current_forwarder().set_active(); }),
            from(0).to(1)
                .on("switch to next state")
                .if(function () { return _this.current_forwarder_index == _this.forwarders.length - 1; })
                .do(function () { })
        ], [1]);
        _this.automata.initialize();
        return _this;
        // this.set_active();
        // console.log("active forward: " + this.current_forwarder().forwarder_name);
    }
    Sequential_Forwarder_Forwarder.prototype.input = function (input) {
        this.forwarders[this.current_forwarder_index].input(input);
    };
    Sequential_Forwarder_Forwarder.prototype.input_sequence = function (input_sequence) {
        for (var _i = 0, input_sequence_1 = input_sequence; _i < input_sequence_1.length; _i++) {
            var s = input_sequence_1[_i];
            this.input(s);
        }
    };
    Sequential_Forwarder_Forwarder.prototype.current_forwarder = function () {
        return this.forwarders[this.current_forwarder_index];
    };
    Sequential_Forwarder_Forwarder.prototype.set_active = function () {
        _super.prototype.set_active.call(this);
        this.current_forwarder().set_active();
    };
    return Sequential_Forwarder_Forwarder;
}(Automata_Forwarder));
export { Sequential_Forwarder_Forwarder };
