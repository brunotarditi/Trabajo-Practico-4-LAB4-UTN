// ELIMINAR UN EMPLEADO
async function eliminarEmpleado(legajo) {
    let respuesta = confirm("¿Realmente desea eliminar?");
    if (respuesta == true) {
        console.log(legajo)
        await fetch("http://localhost:3000/employee/"+legajo, {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
            });
            window.location.href = "http://localhost:3000/";
        return true;
    } else {
        return false;
    }   
}