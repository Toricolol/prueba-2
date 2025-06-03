let global = [];
let indiceEditar = null;

function validar() {
    const telefono = document.getElementById("telefono").value.trim();
    const contraseña = document.getElementById("contraseña").value.trim();
    let esValido = true;


    document.getElementById("error_Telefono").textContent = "red";
    document.getElementById("error_contraseña").textContent = "red";


    if (!/^\d{9}$/.test(telefono)) {
        document.getElementById("error_Telefono").textContent = "Teléfono debe tener 9 dígitos.";
        esValido = false;}


    if (contraseña.length < 6) {
        document.getElementById("error_contraseña").textContent = "Contraseña debe tener al menos 6 caracteres.";
        esValido = false;}
        

    if (esValido) {
        if (indiceEditar !== null) {

            global[indiceEditar] = { telefono, contraseña };
            indiceEditar = null;} else {
            global.push({ telefono, contraseña });}


        mostrarTabla();
        document.getElementById("miFormulario").reset();}}
function mostrarTabla() {
    const cuerpo = document.getElementById("cuerpoTabla");

    cuerpo.innerHTML = "";
    global.forEach((global, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${global.telefono}</td>
            <td>${global.contraseña}</td>
            <td>
                <button onclick="editar(${index})">Editar</button>
                <button onclick="eliminar(${index})">Eliminar</button>
            </td>`;
        cuerpo.appendChild(fila);});}
function eliminar(index) {
    const confirmar = confirm("¿Estás seguro de que quieres eliminar este registro?");
    if (confirmar) {
        global.splice(index, 1);
        mostrarTabla();}}
function editar(index) {
    const global = global[index];
    document.getElementById("telefono").value = global.telefono;
    document.getElementById("contraseña").value = global.contraseña;
    indiceEditar = index;
}
