import { Independent_Variable } from "./Independent_Variable";
export declare class Treatment {
    variable: Independent_Variable;
    value: string;
    constructor(variable: Independent_Variable, value: string);
    clone(): Treatment;
}
