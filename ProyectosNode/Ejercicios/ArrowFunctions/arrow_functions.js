// Hem definit un vector amb dades de persones, i un programa principal que anomena dues vegades a una funció novaPersona,
//  passant-li com a paràmetres els objectes amb les dades de les persones a afegir. Després, cridem a una funció 
//  esborrarPersona, passant-li com a paràmetre un número de telèfon, i vam mostrar el vector de persones amb les dades que hi haja.

// Has d’implementar les funcions novaPersona i esborrarPersona perquè facen la seua comesa. La primera rebrà 
//  persona com a paràmetre i, si el telèfon no existeix en el vector de persones, l’afegirà. Per a això, 
//   utilitzar el mètode push del vector:

// dades.push(persona);
// Quant a esborrarPersona, eliminarà del vector a la persona que tinga aquest telèfon, en cas que existisca. 
// Per a eliminar a la persona del vector, pots simplement filtrar les persones el telèfon de les quals no siga 
// l’indicat, i assignar el resultat al propi vector de persones:

const novaPersona = (dades, objecte) => {
    let existeix = dades.filter(persona => persona.telefon === objecte.telefon);
    if (existeix.length == 0){
        dades.push(objecte);
    } else {
        console.log("La persona ya existe.");
    }
}

const esborrarPersona = (telefon) => {
    dades = dades.filter(persona => persona.telefon != telefon);
}

let dades = [
    { nom: "Nacho", telefon: "966112233", edat: 41 },
    { nom: "Ana", telefon: "911223344", edat: 36 },
    { nom: "Mario", telefon: "611998877", edat: 15 },
    { nom: "Laura", telefon: "633663366", edat: 17 }
];

novaPersona(dades, { nom: "Juan", telefon: "965661564", edat: 60 });
novaPersona(dades, { nom: "Rodolfo", telefon: "910011001", edat: 20 });
novaPersona(dades, { nom: "Rodolfo", telefon: "910011001", edat: 20 });

esborrarPersona("910011001");
console.log(dades);