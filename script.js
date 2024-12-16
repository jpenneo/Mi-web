// Esta sentencia es para esperar a que el documento esté totalmente cargado. 
document.addEventListener('DOMContentLoaded', function () {
    // Seleccionamos el contenedor donde queremos mostrar el mensaje.
    const app = document.getElementById('app');
    
    // Verificar si el contenedor existe.
    if (app) {
        // Crear un nuevo párrafo.
        const parrafo = document.createElement('p');
        
        // Agregar texto al párrafo.
        parrafo.textContent = "Hola desde JavaScript";
        
        // Agregar el párrafo al contenedor.
        app.appendChild(parrafo);
    } else {
        console.error("No se encontró el contenedor con id 'app'");
    }
});
