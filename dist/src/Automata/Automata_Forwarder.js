var Automata_Forwarder = /** @class */ (function () {
    function Automata_Forwarder(forwarder_name) {
        this.set_active_function = function () { };
        this.forwarder_name = forwarder_name;
    }
    Automata_Forwarder.prototype.input = function (s) {
        this.automata.input(s);
    };
    Automata_Forwarder.prototype.add_activation_function = function (to_add) {
        // let old_activation_function = this.set_active_function;
        // this.set_active_function = () => {
        //     old_activation_function();
        //     to_add();
        // }
    };
    Automata_Forwarder.prototype.set_active = function () { };
    return Automata_Forwarder;
}());
export { Automata_Forwarder };
