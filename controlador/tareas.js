const fs = require('fs');

let tareasPorHacer = [];

const guardarDatos = () => {
    let data = JSON.stringify(tareasPorHacer);
    fs.writeFile('./data/datos.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar la data', err);
    });
}

const leerDatos = () => {
    try {
        tareasPorHacer = require('../data/datos.json');
    } catch (error) {
        tareasPorHacer = [];
    }
}

const crear = (descripcion) => {

    leerDatos();

    let tarea = {
        descripcion,
        completado: false
    }

    tareasPorHacer.push(tarea);
    guardarDatos();
    return tarea;
}

const listar = () => {
    leerDatos();

    console.log("=============================");
    console.log("=    TAREAS POR HACER       =");
    console.log("=============================");
    for (let tarea of tareasPorHacer) {
        console.log(tarea.descripcion);
        console.log('Estado:', tarea.completado);
        console.log("------------------------");
    }
}

const actualizar = (descripcion, completado = true) => {
    leerDatos();

    let index = tareasPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        tareasPorHacer[index].completado = completado;
        guardarDatos();
        return true;
    }

    return false;
}

const eliminar = (descripcion) => {
    leerDatos();

    let nuevoListado = tareasPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (nuevoListado.length === tareasPorHacer.length) {
        return false;
    }

    tareasPorHacer = nuevoListado;
    guardarDatos();
    return true;
}

module.exports = {
    crear,
    listar,
    actualizar,
    eliminar
}