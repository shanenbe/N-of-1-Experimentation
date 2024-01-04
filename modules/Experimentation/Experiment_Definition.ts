import {Variable} from "./Variable.js";
import {Treatment} from "./Treatment.js";
import {Task} from "./Task.js";
import * as Experimentation from "./Experimentation.js";
import {SET_SEED} from "./Experimentation.js";
import {csv_encoding} from "../Utils.js";
import {Information, Input_Object} from "../Books/IO_Object";
export function init(){}
export abstract class Experiment_Definition<TaskType extends Task> {
    experiment_name: string;

    variables: Variable[];
    questionnaire_responses: Treatment[] = [];


    tasks: TaskType[] = [];
    repetitions: number = 1;
    task_creator: (Task: TaskType) => void
    constructor(experiment_name: string,
                seed: string,
                variables: Variable[],
                repetitions: number,
                task_creator: (task: TaskType) => void)
    {
        this.template = {experiment_name: experiment_name, variables: variables, repetitions: repetitions, task_creator: task_creator};
        this.experiment_name = experiment_name;
        this.variables = variables;
        this.repetitions = repetitions;
        this.task_creator = task_creator;
        this.init_experiment(seed);
    }

    template: {  experiment_name: string,
                 variables:  Variable[],
                 repetitions: number,
                 task_creator: (task: TaskType) => void };



    init_experiment(seed:string) {
        SET_SEED(seed);
        this.createTasks();
        this.do_random_task_ordering();
    }

    createTasks() {
        this.tasks = [];
        this.all_treatment_combinations_do(
            (treatment_combination: Treatment[]) => {
                let task: TaskType = this.create_Task(treatment_combination);
                this.task_creator(task);
                this.tasks.push(task);
            }
        );
    }

    abstract create_Task(treatment_combination: Treatment[]): TaskType;

    all_treatment_combinations_do(
        f: (treatments: Treatment[]) => void
    ) {
        for (let repetition = 1; repetition <= this.repetitions; repetition++) {
            this.variables[0].all_treatment_combinations_do([], this.variables.slice(1), f)
        }
    }

    private do_random_task_ordering() {
        let new_tasks: TaskType[] = [];
        let old_tasks: TaskType[] = this.tasks.slice();
        let counter = 1;
        while(new_tasks.length < this.tasks.length) {
            let element_no = Experimentation.new_random_integer(old_tasks.length);
            new_tasks.push(old_tasks[element_no]);
            old_tasks[element_no].task_number_in_execution = counter;
            old_tasks.splice(element_no, 1);
            counter++;
        }
        this.tasks = new_tasks;

    }

    generate_csv_data():string[] {
        let result:string[] = [];
        // let questionnaire_variables = this.questionnaire_responses = cfg.questionnaire.filter((e: Input_Object)=> !(e instanceof Information)).map((e: Input_Object)=>e.variable);
        for(let variable of this.questionnaire_responses) {
            result.push("\"" + variable.variable.name + "\"" + ";");
        }
        for(let variable of this.variables) {
            result.push(variable.name + ";");
        }
        result.push("expected_answer;given_answer;is_correct;time_in_milliseconds;\n");
        for(let task of this.tasks) {
            for(let variable of this.questionnaire_responses) {
                result.push(csv_encoding(variable.value) + ";");
            }
            for(let treatment_combination of task.treatment_combination) {
                result.push(treatment_combination.value + ";")
            }
            result.push(task.expected_answer + ";");
            result.push(task.given_answer + ";");
            result.push("" + (task.given_answer==task.expected_answer) + ";");
            result.push(task.required_miliseconds + ";");
            result.push("\n");
        }
        return result;
    }
}