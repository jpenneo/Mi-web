// Función para cargar HTML de manera segura y manejar errores
function loadHTML(file, elementId) {
    // Realizamos la solicitud del archivo
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se pudo cargar el archivo: ${file}`);
            }
            return response.text();  // Convertir la respuesta a texto (HTML)
        })
        .then(data => {
            // Sanitización del contenido HTML
            const sanitizedData = sanitizeHTML(data);
            document.getElementById(elementId).innerHTML = sanitizedData;  // Insertar el contenido en el div correspondiente
        })
        .catch(error => {
            console.error('Error al cargar el archivo: ', error);
            // Mostrar un mensaje de error en el lugar donde debería ir el contenido cargado
            document.getElementById(elementId).innerHTML = "<p>Hubo un error al cargar el contenido. Por favor, inténtalo nuevamente.</p>";
        });
}

// Función para sanitizar el contenido HTML y evitar vulnerabilidades XSS
function sanitizeHTML(content) {
    const div = document.createElement('div');
    div.textContent = content;  // Asignar el contenido de texto (esto escapará cualquier HTML malicioso)
    return div.innerHTML;  // Devolver el contenido HTML sanitizado
}

// Llamadas para cargar los archivos HTML al cargar la página
window.onload = function() {
    loadHTML('head.html', 'head-container');  // Cargar el contenido del head
    loadHTML('footer.html', 'footer-container');  // Cargar el contenido del footer
};
