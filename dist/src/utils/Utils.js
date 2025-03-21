export function init() { }
var RefObject = /** @class */ (function () {
    function RefObject(value) {
        this.value = value;
    }
    return RefObject;
}());
export { RefObject };
export function contains(collection, element) {
    return collection.indexOf(element) != -1;
}
export function cartesian_product(arr1, arr2, f) {
    for (var i = 0; i < arr1.length; i++) {
        for (var j = 0; i < arr2.length; i++) {
            f(arr1[i], arr2[j]);
        }
    }
}
export function guarantee_test(f) {
    var result = f();
    if (!result)
        throw "Something is wrong here";
}
export function guarantee_true(trueFalse) {
    if (!trueFalse)
        throw "Something is wrong here";
}
export function convert_string_to_html_string(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/\n/g, "<br/>")
        .replace(/ /g, '&nbsp;');
}
export function key_event_string(event) {
    var postfix = "";
    if (event.key == "Alt")
        if (event.ctrlKey)
            return "Alt+Ctrl";
    if (event.key == "Control")
        if (event.altKey)
            return "Ctrl+Alt";
    postfix = postfix + (event.altKey ? "+Alt" : "");
    postfix = postfix + (event.ctrlKey ? "+Control" : "");
    if (event.key == "Alt")
        return "Alt";
    // if(event.key=="Control") return postfix;
    return "" + event.key + postfix;
}
export function array_to_sequence_of_size_(sequence) {
    var ret = [];
    var counter = 0;
    for (var _i = 0, sequence_1 = sequence; _i < sequence_1.length; _i++) {
        var element = sequence_1[_i];
        ret.push(counter);
        counter++;
    }
    return ret;
}
export function csv_encoding(a_string) {
    var add_escapes = a_string.split("\"").join("\"\"");
    return "\"" + add_escapes + "\"";
}
export function save_file_in_html(filename, data) {
    var blob = new Blob(data, { type: 'application/ssc' });
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}
export function add_upload_push_button(url, button_test, data) {
    var elem = window.document.createElement('form');
    elem.setAttribute("action", url);
    elem.setAttribute("method", "post");
    var i = window.document.createElement('input');
    i.setAttribute("name", "data");
    i.setAttribute("type", "hidden");
    i.setAttribute("value", data);
    elem.appendChild(i);
    var j = window.document.createElement('input');
    j.setAttribute("value", button_test);
    j.setAttribute("type", "submit");
    elem.appendChild(j);
    document.body.appendChild(elem);
}
export function upload_experiment_to_server(experiment) {
    var csv = experiment.generate_csv_data();
    var currentUrl = window.location.href;
    // const response = fetch('http://127.0.0.1:8088', {
    //     method: 'POST',
    //     body: JSON.stringify({experiment_name : "dummy2", experiment_data: data}),
    //     headers: {'Content-Type': 'application/json; charset=UTF-8'} })
    console.log(currentUrl);
}
