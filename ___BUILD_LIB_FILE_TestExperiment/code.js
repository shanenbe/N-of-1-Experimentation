document.nof1.set_seed("42");
// @ts-ignore
let v = document.nof1.new_random_integer(10);

for(let i = 0; i < 10; i++) {
    document.nof1.set_seed("42");
    let new_v = document.nof1.new_random_integer(10);
    if(new_v != v)
        throw "Random does not work!";
}

// @ts-ignore
document.nof1.set_seed('42');

// @ts-ignore
document.nof1.experiment_definition(
    {
        experiment_name: "N_of_1 Template",
        seed: "123456",
        introduction_pages: [
                                "Running the experiment (without training) takes between 5 and 10 minutes.\n\n" +
                                "\n\nThe experiment consists of a training phase and an experiment phase.\n\n" +
                                "The training phase is only for you to get familiar with the " +
                                "questions and the experiment. Please traing before running the experiment!\n\n" +
                                "You can cancel the training session whenever you like and whenever you feel\n" +
                                "that there is no longer any need for you to practice.\nAs long " +
                                "you do not cancel the training, new code snippets will be shown to you.\n\n" +
                                "When the you see the first task in the training session, please increase/decrease the font " +
                                "in the browser so that you can see all lines of code (plus some additional lines).\n\n" +
                                "Depending on your browser and your machine, this could be done by pressing [CTRL] + [+] " +
                                "or [CTRL] + [.].\n\n" +
                                "Press [Return] to enter the training phase.\n\n" +
                                "Note: you can always make a pause between two tasks, when you pressed a button and the correct result will be shown."
                            ],
        pre_run_instruction:
                                "Please put your fingers on the number buttons.\n\nWhen you press [Enter] the first task will be shown.",
        finish_pages: [
                        "Thanks for participating. When you press [Enter], the experiment's data will be downloaded.\n\n" +
                        "If you want to contribute to research, you can send the downloaded file to stefan.hanenberg@uni-due.de. \n\n" +
                        "Additionally to the experiment data, it is necessary that you send the signed \n" +
                        "information sheet to the same mail address. You can download the information sheet at:\n\n" +
                        "https://github.com/shanenbe/Experiments/blob/main/2023_Indentation_JSON/Aufklaerungsbogen.pdf\n\n" +
                        "Please write additionally on the information sheet, how many years of working experience as a software developer you have.\n\n" +
                        "Again, thanks for participating.\n\n" +
                        "Stefan"
                      ],
        layout: [
            {variable: "X", treatments: ["1", "2"]},
            {variable: "Y", treatments: ["A", "B"]},
        ],
        repetitions: 2,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses: ["1", "0"],

        // Note that t.task_number_in_execution is not yet set!
        task_configuration: (t) => {
            t.code_string("dummy");
            t.expected_answer = "0";
            t.after_task_string_constructor(() => "The correct answer was: " + t.expected_answer + "\n\n" +
                                             "The given answer was" + t.given_answer + "\n\n" +
                                             "press [ENTER] to start with the next task");

        }
    }
);

