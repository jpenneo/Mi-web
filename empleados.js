fetch('/empleados')
//Aquí le indicamos cual queremos que sea nuestra salida de datos.
  .then(response => response.json())
  .then(data => {
    const empleadosLista = document.getElementById('empleados-lista');
        data.forEach(empleado => {
      const div = document.createElement('div');
      //En esta sección colocamos las columnas que tiene nuestra base de datos.
      div.innerHTML = `<p>${empleado.id_empleado} - ${empleado.nombre} - ${empleado.apellido}- ${empleado.edad}- ${empleado.salario}- ${empleado.id_departamento}</p>`;
      empleadosLista.appendChild(div);
    });
  });