fetch('http://localhost:3001/empleados')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const empleadosLista = document.getElementById('empleados-lista');
    // Crear un contenedor UL para los empleados
    const ul = document.createElement('ul');

    data.forEach(empleado => {
      const li = document.createElement('li');

      // Crear un contenedor DIV para los detalles del empleado
      li.innerHTML = `
        <div>
          <p><strong>ID:</strong> ${empleado.id_empleado}</p>
          <p><strong>Nombre:</strong> ${empleado.nombre} ${empleado.apellido}</p>
          <p><strong>Edad:</strong> ${empleado.edad}</p>
          <p><strong>Salario:</strong> $${empleado.salario}</p>
          <p><strong>Departamento:</strong> ${empleado.id_departamento}</p>
        </div>
      `;
      // Añadir cada empleado como elemento de lista
      ul.appendChild(li); 
    });
  // Agregar la lista completa al contenedor
    empleadosLista.appendChild(ul); 
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
  });
