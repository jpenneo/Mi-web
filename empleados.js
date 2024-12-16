fetch('https://mi-web.vercel.app/empleados')
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
      div.innerHTML = `<p>${empleado.id_empleado} - ${empleado.nombre} - ${empleado.apellido} - ${empleado.edad} - ${empleado.salario} - ${empleado.id_departamento}</p>`;
      empleadosLista.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
  });

