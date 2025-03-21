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
import { Experimentation_Forwarder } from "./Experimentation_Forwarder";
var Experiment_Forwarder = /** @class */ (function (_super) {
    __extends(Experiment_Forwarder, _super);
    function Experiment_Forwarder(pre_run_instructions, experiment_definition, measurement) {
        return _super.call(this, "Main Experiment", function () {
            pre_run_instructions();
            measurement.output_writer().print_html_on_stage("<hr>" +
                "Press [Enter] to start the experiment.");
        }, function () {
            measurement.output_writer().print_html_on_stage("You finished the experiment phase.<hr>" +
                "Please, press [Enter] to go to the next phase.<br>");
        }, experiment_definition, measurement) || this;
    }
    return Experiment_Forwarder;
}(Experimentation_Forwarder));
export { Experiment_Forwarder };
