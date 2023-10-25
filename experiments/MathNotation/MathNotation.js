/*
   Expression -> Number | Route | Exponential;
   Number -> 0..9;
   Route -> route:Expression basis:Expression
   Exponential -> exponent:Expression basis:Expression;
 */


function generate_math_expression(result, length, depth) {
    if(length==0) throw "Invalid length";

    if(depth==1) {
        if(length==1) {
            return new NumberExpression(result);
        } else {

        }
    }
}

function generate_math_expression(result, length, depth) {
    if(length==0) throw "Invalid length";

    if(depth==1) {
        if(length==1) {
            return new NumberExpression(result);
        } else {

        }
    }
}

class MathExpression {
    html_string();
    generate_child();
    result();
}

class NumberExpression extends MathExpression {
    num;

    constructor(num) {
        super();
        this.num = num;
    }

    html_string() {
        return "" + number;
    }

    generate_child(depth, result) {
        if(depth>1) throw "Cannot generator depth here";
        this.num = result;
    }

    result() {
        return num;
    }
}

class Route extends MathExpression {
    root;
    basis;

    html_string() {
       return "<span style='white-space: nowrap'><sup>" + this.root + "</sup>&radic;<span style='text-decoration:overline;'>&nbsp;" + this.basis.html_string() + "&nbsp;</span></span>";
    }
}

class Exponential extends MathExpression {
    exponent_expression;
    basis_expression;

    html_string() {
        return "" + this.basis_expression + "<sup>" + this.exponent_expression + "</sup>";
    }
}

class Arithmethic_Operation extends MathExpression {
    operand1;
    operand2;
    operator;

    html_string() {
        return "" + this.operand1 + "" + this.operator + "" + this.operand2;
    }
}




// create_browser_server_text_experiment({
//     experiment_name         :"TestExperiment",
//     seed                    :"42",
//     introduction_pages      :["Please, open the browser in fullscreen mode (probably by pressing [F11]).\n\nPress [Enter] to continue."],
//     pre_run_instruction     :"Please, put your fingers now on the keys [1]-[3]. These are the only possible inputs in a task.\n\nWhen you press [Enter] the tasks directly start.",
//     finish_pages            :["Almost done. When you press [Enter], the experiment's data will be downloaded."],
//     layout                  :[{variable: "Counter", treatments: ["1", "2", "3", "4", "5"]}],
//     repetitions             :1,
//     accepted_responses      :["1", "2", "3"],
//     task_configuration      :
//                                 (t: Code_Task) => {
//                                     t.code = "Task " + t.treatment_combination[0].value +
//                                              "\n    line 2" +
//                                              "\n        line 2";
//
//
//                                     t.expected_answer = "2";
//
//                                     t.after_task_string = () => { return "Done.\n" + "The correct answer was: " + t.expected_answer +
//                                                                          "\nYour answer was: " + t.given_answer +
//                                                                          "\nNext random is" + new_random_integer(123456789);
//                                                                          "\nPress [Return] for next task"
//                                                                 };
//                                 },
// });
