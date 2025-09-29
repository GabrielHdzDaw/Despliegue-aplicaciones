// Crea una carpeta anomenada “Promeses” en el teu espai de treball, en la carpeta de “Exercicis”. 
// Crea dins un arxiu font anomenat promeses.js, que siga una còpia de l’arxiu font arrow_functions.js de l’exercici anterior.


// El que faràs en aquest exercici és adaptar les dues funcions novaPersona i esborrarPersona perquè retornen una promesa.

// En el cas de novaPersona, es retornarà amb resolve l’objecte persona inserit, si la inserció va ser
//  satisfactòria, o amb reject el missatge “Error: el telèfon ja existeix” si no es va poder inserir la persona perquè ja existia el seu telèfon en el vector

// En el cas d’esborrarPersona, es retornarà amb resolve l’objecte persona eliminat, si l’esborrat va 
// ser satisfactori, o amb reject un missatge “Error: no es van trobar coincidències” si no existia cap persona amb aqueix telèfon en el vector.

// Modifica el codi del programa principal perquè intente afegir una persona correcta i una altra 
// equivocada (telèfon ja existent en el vector), i esborrar una persona correcta i una altra equivocada
//  (telèfon no existent en el vector). Comprova que el resultat en executar és el que esperaves.


// Exercici 2:

// Per a realitzar aquest exercici, ens basarem en l’exercici “Promeses” de la sessió anterior, on 
// gestionàvem les persones d’un vector mitjançant uns mètodes que inserien o esborraven dades d’aquest,
//  i retornaven una promesa amb el resultat.

// Còpia aqueixa carpeta i canvia-la de nom a “Modularitzar”. El que farem en aquest exercici és dividir el codi en dos arxius:

// Un arxiu anomenat persones.js on definirem els dos mètodes que s’encarreguen d’afegir i esborrar persones del
//  vector. Recorda exportar aquests mètodes amb module.exports per a poder-los utilitzar des de fora. 
//  També necessitaràs passar-los com a paràmetre el vector de persones, ja que aquest vector quedarà
//   en un altre arxiu a part i no serà directament accessible.
// Un arxiu anomenat index.js on inclourem el mòdul anterior. En aquest arxiu definirem el vector de 
// persones tal com estava originalment, i el programa principal, que utilitzarà el mòdul anterior per 
// a inserir o esborrar algunes persones de prova en el vector.
// Executa el programa per a verificar que les dependències amb el mòdul s’han establit correctament,
//  i les dades s’insereixen i esborren del vector de manera satisfactòria.

const novaPersona = async (dades, objecte) => {
    return new Promise((resolve, reject) => {
        let existeix = dades.filter(persona => persona.telefon === objecte.telefon);
        if (existeix.length == 0) {
            dades.push(objecte);
            resolve(objecte);
        } else {
            reject("La persona ja existeix");
        }
    });
}


const esborrarPersona = async (dades, telefon) => {
    return new Promise((resolve, reject) =>{
        let existeixPersona = dades.filter(p => p.telefon === telefon);
        if(existeixPersona.length > 0){
            dades = dades.filter(p => p.telefon !== telefon);
            resolve(existeixPersona[0]);
        } else{
            reject("La persona no existeix");
        }
    });
}

let dades = [
    { nom: "Nacho", telefon: "966112233", edat: 41 },
    { nom: "Ana", telefon: "911223344", edat: 36 },
    { nom: "Mario", telefon: "611998877", edat: 15 },
    { nom: "Laura", telefon: "633663366", edat: 17 }
];



const persona = await novaPersona(dades, { nom: "Juan", telefon: "965661564", edat: 60 });
console.log(persona);

// novaPersona(dades, { nom: "Rodolfo", telefon: "910011001", edat: 20 });
// novaPersona(dades, { nom: "Rodolfo", telefon: "910011001", edat: 20 });


// console.log(dades);