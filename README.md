# N-of-1 Experiments

This repo contains code for running N-of-1 experiments. In case you are interested in N-of-1 experiments in programming and software science, you might be interested in the following paper (available via public access)

[Hanenberg, Mehlhorn, "Two N-of-1 self-trials on readability differences between anonymous inner classes (AICs) and lambda expressions (LEs) on Java code snippets", Empir. Softw. Eng. 27(2): 33 (2022)](https://doi.org/10.1007/s10664-021-10077-3)

## Structure
- `src`  contains the real source code
- `lib`  contains a compiled version of the library that can be used in projects only using JavaScript
- `dist` contains the library files that can be used in other TypeScript projects
- `example` contains a small JavaScript example, that uses the files located in the `lib` folder
