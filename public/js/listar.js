let contenido = document.querySelector("#contenido");

//LISTAR TODOS LOS EMPLEADOS
const obtener = async () => {
  await fetch("http://localhost:3000/employee")
    .then((res) => res.json())
    .then((data) => {        
        tabla(data);
    });
};
const tabla = (datos) => {
    
    for (let dato of datos) {
        contenido.innerHTML += `
        <tr>
            <td>${dato.legajo}</td>
            <td>${dato.dni}</td>
            <td>${dato.nombre}</td>
            <td>${dato.apellido}</td>
            <td>${dato.sector}</td>
            <td>${new Date(dato.fecha_ingreso).toISOString().split('T')[0]}</td>
            <td>${dato.activo ? "Activo" : "No Activo"}</td>
            <td><a href="editar.html?legajo=${dato.legajo}" class="btn btn-blue">Editar</a></td>
            <td><button type="button" class="btn btn-red" onclick="eliminarEmpleado(${dato.legajo})">Eliminar</button></td>
        </tr>
        `
    }
}
obtener();