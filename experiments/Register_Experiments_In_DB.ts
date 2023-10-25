import {Client} from "pg";

const fs = require('fs');

let connectionURL = 'postgresql://softwarescience:softwarescience@localhost:5432/experimentation';
const client:Client = new Client(connectionURL);

client.connect(()=> {
    fs.readdirSync("./experiments", {withFileTypes: true})
        .filter(item => item.isDirectory())
        .forEach(file => {
            let experiment_name = file.name;
            let code_string:string = fs.readFileSync('./experiments/' + file.name + "/" + "code.js").toString();
            client.query("select register_experiment($1, $2)", [experiment_name, code_string], (err, res)=> {
                client.end();
            });
    });
});