// Esta sentencia es para esperar a que el documento esté totalmente cargado.
document.addEventListener('DOMContentLoaded', function() {
    // Aquí estamos selecionando el contenedor del documento, en donde nosotros queremos que se muestre nuestro mensaje, junto con el mensaje.
    const app = document.getElementById('app').innerHTML = "Hola desde JavaScript";
        // Verificar si el contenedor existe y agregar el párrafo.
    if (app) {
        app.appendChild(parrafo);
    }
});
