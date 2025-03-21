export function is_true(exp, aString, debug) {
    if (aString === void 0) { aString = ""; }
    if (debug === void 0) { debug = false; }
    if (!exp) {
        console.error(aString);
        throw "Wrong: " + aString;
    }
    if (debug) {
        console.log("Ok: " + aString);
    }
}
