console.log("Inicio");
async function tareaLenta(){
    for (let i = 0; i < 1e10; i++) {}
    console.log("Tarea pesada terminada");
}
function tarea(){
    for (let i = 0; i < 10; i++) {}
    console.log("Tarea terminada");
}



tareaLenta();
tarea();