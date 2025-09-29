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
    return new Promise((resolve, reject) => {
        let existeixPersona = dades.filter(p => p.telefon === telefon);
        if (existeixPersona.length > 0) {
            dades = dades.filter(p => p.telefon !== telefon);
            resolve(existeixPersona[0]);
        } else {
            reject("La persona no existeix");
        }
    });
}

module.exports = {
    esborrarPersona: esborrarPersona,
    novaPersona: novaPersona
}