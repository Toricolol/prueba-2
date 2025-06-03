let registros = [];
let indiceEditar = null;

function validar() {
    const telefono = document.getElementById("telefono").value.trim();
    const password = document.getElementById("password").value.trim();

    let esValido = true;

    // Limpiar errores anteriores
    document.getElementById("errorTelefono").textContent = "";
    document.getElementById("errorPassword").textContent = "";

    // Validar teléfono (9 dígitos)
    if (!/^\d{9}$/.test(telefono)) {
        document.getElementById("errorTelefono").textContent = "Debe tener 9 dígitos numéricos.";
        esValido = false;
    }

    // Validar contraseña (mínimo 6 caracteres)
    if (password.length < 6) {
        document.getElementById("errorPassword").textContent = "Debe tener al menos 6 caracteres.";
        esValido = false;
    }

    // Si es válido, guardar o actualizar
    if (esValido) {
        if (indiceEditar !== null) {
            registros[indiceEditar] = { telefono, password };
            indiceEditar = null;
        } else {
            registros.push({ telefono, password });
        }

        mostrarTabla();
        document.getElementById("miFormulario").reset();
    }
}

function mostrarTabla() {
    const cuerpo = document.getElementById("cuerpoTabla");
    cuerpo.innerHTML = "";

    registros.forEach((item, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.telefono}</td>
            <td>${item.password}</td>
            <td>
                <button onclick="editar(${index})">Editar</button>
                <button onclick="eliminar(${index})">Eliminar</button>
            </td>
        `;
        cuerpo.appendChild(fila);
    });
}

function eliminar(index) {
    if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
        registros.splice(index, 1);
        mostrarTabla();
    }
}

function editar(index) {
    const item = registros[index];
    document.getElementById("telefono").value = item.telefono;
    document.getElementById("password").value = item.password;
    indiceEditar = index;
}
