import {Books_tests} from "./modules/Books/Sequential_Forwarder_Forwarder";
import {Book_tests} from "./modules/Books/Book";
import {Experimentation_Tests, VARIABLE_TYPE} from "./modules/Experimentation/Experimentation";
import {Code_Task} from "./modules/Experimentation/Task";
import {
    create_browser_server_text_experiment
} from "./modules/Experimentation/Browser_Server_Code_Experiment";



export function run_tests(){
    Experimentation_Tests();
    Book_tests();
    Books_tests();
}
export function do_html_stuff() {

    // let mailbody:string="I hereby grant my participation in the experiment 4711 that was executed as part of the study ';



    create_browser_server_text_experiment({
        experiment_name:        "Test",
        seed: "42",
        introduction_pages:     [
                                    "Hey, this is the introduction of an experiment." +
                                    " <br>You can navigate throught introduction's pages via the arrow keys ([ArrowRight] or [ArrowLeft])." +
                                    " <br>When the experiment starts, it accepts the keys [1], [2], [3].",
                                    "<br><br>When you press [Enter] the experiment starts"
                                ],
        pre_run_instruction:    "Please, put your fingers now on the keys [1]-[3]",
        finish_pages:           [
                                    "Updated....Almost done." +
                                    "When you press [Enter], the experiment's data will be downloaded." +
                                    "Afterwards, you can upload the experiment."
                                ],

        // final_instructions:     ["Please mail the downloaded file to <a href='mailto:stefan.hanenberg@uni-due.de?subject=My%20participation%20in%20experiment%204711&body'>stefan.hanenberg@uni-due.de</a>. <br><br>Afterwards. you can just close the current tab.<br>Again, thanks for participating."],

        layout:                 [
                                    {
                                        variable: "Counter",
                                        treatments: ["1", "2", "3", "4", "5"]
                                    }
                                ],
        repetitions:            1,
        task_configuration:     (t: Code_Task) => {
                                    t.code = "Task " + t.treatment_combination[0].value;
                                    t.after_task_string = () => { return "Done " + t.code  +"<br>Press Return for next tast"};
                                },
        accepted_responses:     ["1", "2", "3"],
    });

}

run_tests();



