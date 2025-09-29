// import { novaPersona, esborrarPersona } from "./persones.js";
const persona = require(__dirname + "/persones.js")

let dades = [
    { nom: "Nacho", telefon: "966112233", edat: 41 },
    { nom: "Ana", telefon: "911223344", edat: 36 },
    { nom: "Mario", telefon: "611998877", edat: 15 },
    { nom: "Laura", telefon: "633663366", edat: 17 }
];

persona.novaPersona(dades, { nom: "Juan", telefon: "965661564", edat: 60 }).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});
persona.novaPersona(dades, { nom: "Ana", telefon: "911223344", edat: 36 }).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});

persona.esborrarPersona(dades, "965661564").then(res => {
    console.log(res);
}).catch(err =>{
    console.log(err);
});
persona.esborrarPersona(dades, "633634366").then(res => {
    console.log(res);
}).catch(err =>{
    console.log(err);
});