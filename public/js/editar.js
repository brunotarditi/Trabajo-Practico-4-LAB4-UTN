let formulario = document.getElementById("formulario");
let params = new URLSearchParams(location.search);
let legajo = params.get("legajo");

// DAME UN EMPLEADO
const obtener = async () => {
  await fetch("http://localhost:3000/employee/" + legajo)
    .then((res) => res.json())
    .then((data) => {
      formInfo(data);
    });
};

// SET FORMULARIO
const formInfo = (datos) => {
  for (let dato of datos) {
    document.getElementById("legajo").disabled = true;
    document.getElementById("legajo").value = dato.legajo;
    document.getElementById("apellido").value = dato.apellido;
    document.getElementById("nombre").value = dato.nombre;
    document.getElementById("dni").value = dato.dni;
    document.getElementById("sector").value = dato.sector;
    document.getElementById("fecha").value = new Date(dato.fecha_ingreso)
      .toISOString()
      .split("T")[0];
    document.forms.formulario.activo.value = dato.activo;
  }
};

obtener();

// EDITAR UN EMPLEADO
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  let datos = new FormData(formulario);
  let formData = {
    legajo: legajo,
    apellido: datos.get("apellido"),
    nombre: datos.get("nombre"),
    dni: datos.get("dni"),
    sector: datos.get("sector"),
    fecha_ingreso: datos.get("fecha"),
    activo: datos.get("activo"),
  };

  await fetch("http://localhost:3000/employee/" + legajo, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  window.location.href = "http://localhost:3000/";
});