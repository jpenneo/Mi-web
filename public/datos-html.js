fetch('/empleados')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    renderEmployeeList(data);
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
    showError('No se pudo cargar la lista de empleados. Por favor, intenta más tarde.');
  });

// Función para renderizar la lista de empleados
function renderEmployeeList(empleados) {
  const empleadosLista = document.getElementById('empleados-lista');
  empleadosLista.innerHTML = ''; // Limpiar contenido previo si lo hubiera

  // Crear un contenedor UL para los empleados
  const ul = document.createElement('ul');

  empleados.forEach(empleado => {
    const li = document.createElement('li');

    // Crear un contenedor DIV seguro para los detalles del empleado
    const div = document.createElement('div');

    const id = createParagraph('ID:', empleado.id_empleado);
    const nombre = createParagraph('Nombre:', `${empleado.nombre} ${empleado.apellido}`);
    const edad = createParagraph('Edad:', empleado.edad);
    const salario = createParagraph('Salario:', `$${empleado.salario}`);
    const departamento = createParagraph('Departamento:', empleado.id_departamento);

    // Agregar los detalles al contenedor
    div.appendChild(id);
    div.appendChild(nombre);
    div.appendChild(edad);
    div.appendChild(salario);
    div.appendChild(departamento);

    li.appendChild(div);
    ul.appendChild(li);
  });

  // Agregar la lista completa al contenedor
  empleadosLista.appendChild(ul);
}

// Función para crear párrafos con información del empleado
function createParagraph(label, value) {
  const p = document.createElement('p');
  p.innerHTML = `<strong>${label}</strong> ${value}`;
  return p;
}

// Función para mostrar un mensaje de error al usuario
function showError(message) {
  const empleadosLista = document.getElementById('empleados-lista');
  empleadosLista.innerHTML = <p class="error">${message}</p>;
}
