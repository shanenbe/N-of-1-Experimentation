Nof1.SET_SEED("42");

let experiment_configuration_function = (writer) => { return {

    experiment_name: "TestExperiment",
    seed: "42",
    introduction_pages: writer.stage_string_pages([
        "Please, open the browser in fullscreen mode (probably by pressing [F11])."
    ]),
    pre_run_instructions: writer.string_page(
        "When you press [Enter] the tasks directly start."),
    finish_pages: writer.stage_string_pages([
        "Almost done. When you press [Enter], the experiment's data will be downloaded."
    ]),
    layout: [
        {
            variable: "Representation",
            treatments: ["Code", "Math"]
        }
    ],
    repetitions: 2,

    measurement: Nof1.Time_to_finish(Nof1.text_input),

    task_configuration:    (t) => {
        t.do_print_task = () => {
            writer.clear_stage();
            writer.print_html_on_stage("<h1>My Headline</h1>");
        };

        t.expected_answer = "Stefan";

        t.accepts_answer_function = (given_answer) => {
            return given_answer == "Stefan";
        };

        t.do_print_error_message = (given_answer) => {
            t.print_task();
            writer.print_on_input_response(given_answer);
            writer.print_html_on_error("<h1>Moron. The answer is not" + given_answer + "</h1>");
            writer.set_focus_on_input();
        };

        t.do_print_after_task_information = () => {
            writer.clear_stage();
            writer.print_string_on_stage("Ok, done. Press [Enter] to see the next task");
        }
    }
}};

Nof1.BROWSER_EXPERIMENT(experiment_configuration_function);
