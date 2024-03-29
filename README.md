# N-of-1 Experiments

This repo contains code for running N-of-1 experiments. In case you are interested in N-of-1 experiments in programming and software science, you might be interested in the following paper (available via public access)

[Hanenberg, Mehlhorn, "Two N-of-1 self-trials on readability differences between anonymous inner classes (AICs) and lambda expressions (LEs) on Java code snippets", Empir. Softw. Eng. 27(2): 33 (2022)](https://doi.org/10.1007/s10664-021-10077-3)

Experiments that use the present code (probably older versions) can be found here:
[https://github.com/shanenbe/Experiments](https://github.com/shanenbe/Experiments)

In case you just want to use the code for doing an N-of-1, you probably just want to download the most recent template. 


The template of an N-of-1 experiment consists of three files that can be downloaded from here:
[https://github.com/shanenbe/N-of-1-Experimentation/tree/main/___BUILD_LIB_FILE_TestExperiment](https://github.com/shanenbe/N-of-1-Experimentation/tree/main/___BUILD_LIB_FILE_TestExperiment)
- index.html: the starting page for the experiment. This html-file loads the following two files.
- lib.js: the library (the present repo packed via webpack). You will probably not want to take a look into it (because it is generated).
- code.js: the code of the experiment you want to run (the downloaded file contains just a mock).

For running an experiment, you need to edit code.js and then run the html-page.

## Defining an experiment
You define (and start) an experiment by calling the function

```
document.nof1.experiment_definition(cfg)
```
where cfg is the experiment's configuration. A configuration is a hashmap with the following fields:

- experiment_name: String --
  A string representing the name of the experiment.

- seed: String --
  A string that is the seed for the random number generator. Make sure you choose a seed that the resulting experiment is fair (see [here,Section 5.1](https://doi.org/10.1007/s10664-021-10077-3)) - 
  currently, this is not automatically done by the code (as soon as I find a JS-lib for multi-factor ANOVAs, I will add it).

- introduction_pages: String[] -- 
  An array of strings. Each string will be represented as it's own page before the experiment.

- pre_run_instruction: String -- 
  A string that will be shown right before the experiment (and the training).

- finish pages: String[] -- 
  An array of strings. Each string will be represented as it's own page after the experiment.

- layout: --
  An array of hashmaps. Each hashmap consists of a 
  - variable: a string representing the name of the variable.
  - treatments: a array of strings representing the different treatments of the variable. 

- repetitions:
  An integer that says how often each treatment combination will be repeated.

- accepted_responses: an array of strings - each string represents a key that is permitted as a response to a task.

- task_configuration: a function that receives a task object. This function is called by the framework when the experiment is built (the same code is used for the test phase).

- questionnaire: An optional parameter, which is a list of IO_Object (see below).

## Configuring tasks
The probably most important part in the experiment definition is the task configuration.
Before the experiment is executed, the lambda function will be invoked with a task-object. However, the lambda method will be invoked
in a different order than how it appears in the experiment (since ordering is later on -- right before the experiment -- randomized). 
The consequence is, that some parts of the task object (such as the field task_number_in_execution) are not yet initialized. 
The following methods/fields can be used to 

- treatment_combination: Treatment[] --
The treatment combination a task belongs to. You can access the variable name via treatment.variable.name, its value via treatment.value.

- 
