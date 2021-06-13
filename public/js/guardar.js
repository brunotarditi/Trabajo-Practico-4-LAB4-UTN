//GUARDAR UN EMPLEADO
let formulario = document.getElementById("formulario");
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  let datos = new FormData(formulario);
  let formData = {
    legajo: datos.get("legajo"),
    apellido: datos.get("apellido"),
    nombre: datos.get("nombre"),
    dni: datos.get("dni"),
    sector: datos.get("sector"),
    fecha_ingreso: datos.get("fecha"),
    activo: datos.get("activo"),
  };

  await fetch("http://localhost:3000/employee", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  window.location.href = "http://localhost:3000/";
});
