fetch('/empleados')
//Aquí le indicamos cual queremos que sea nuestra salida de datos.
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const empleadosLista = document.getElementById('empleados-lista');
    data.forEach(empleado => {
      const div = document.createElement('div');
      //En esta sección colocamos las columnas de nuestra base de datos.
      div.innerHTML = `<p>${empleado.id_empleado} - ${empleado.nombre} - ${empleado.apellido} - ${empleado.edad} - ${empleado.salario} - ${empleado.id_departamento}</p>`;
      empleadosLista.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
  });

