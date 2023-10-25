import {create_browser_questionnaire} from "../../modules/Experimentation/Browser_Questionnaire";
import {alternatives, free_text} from "../../modules/Books/IO_Object";

create_browser_questionnaire("Simple questionnaire",
                        [
                                    free_text("dummy", "How is life?", true),
                                    alternatives("seriousness", "Be serious", ["Full of shit", "something else", "terrible"], true),
                                    free_text("Future_plany", "So, what's next?", false)
                                 ],
                            );
// do_html_stuff()


