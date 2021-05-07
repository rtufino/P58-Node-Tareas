const { argv } = require('./config/yargs');
const { crear, listar, actualizar, eliminar } = require('./controlador/tareas');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        console.log('Creando una tarea...');
        let tarea = crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        listar();
        break;
    case 'actualizar':
        console.log('Actualizando una tarea...');
        let resp = actualizar(argv.descripcion, argv.completado);
        console.log(resp);
        break;
    case 'eliminar':
        console.log('Eliminando una tarea');
        let conf = eliminar(argv.descripcion);
        console.log(conf);
        break;
    default:
        console.log('Comando no válido');
}