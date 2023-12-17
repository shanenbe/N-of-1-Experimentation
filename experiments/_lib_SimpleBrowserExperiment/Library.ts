// import {create_browser_server_text_experiment} from "../../modules/Experimentation/Browser_Server_Code_Experiment";
// import {Code_Task} from "../../modules/Experimentation/Task";
// import {new_random_integer} from "../../modules/Experimentation/Experimentation";
//
// document['experiment_definition'] = create_browser_server_text_experiment;

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
