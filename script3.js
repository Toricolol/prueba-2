//telefono debe tener exactamente 8 digitos, no es obligatoria
//contrasenia debe tener mas de 5 caracteres, es obligatoria
//contrasenia debe tener mas de 5 caracteres, es obligatoria

let datos = [];
let indiceEditar = null;

function validar() {
    const telefono = document.getElementById("telefono").value.trim();
    const password = document.getElementById("password").value.trim();
    let esValido = true;

    // Limpiar errores previos
    document.getElementById("errorTelefono").textContent = "";
    document.getElementById("errorPassword").textContent = "";

    // Validaciones
    if (!/^\d{9}$/.test(telefono)) {
        document.getElementById("errorTelefono").textContent = "Teléfono debe tener 9 dígitos.";
        esValido = false;
    }

    if (password.length < 6) {
        document.getElementById("errorPassword").textContent = "Contraseña debe tener al menos 6 caracteres.";
        esValido = false;
    }

    if (esValido) {
        if (indiceEditar !== null) {
            // Actualizar
            datos[indiceEditar] = { telefono, password };
            indiceEditar = null;
        } else {
            // Agregar
            datos.push({ telefono, password });
        }

        mostrarTabla();
        document.getElementById("miFormulario").reset();
    }
}

function mostrarTabla() {
    const cuerpo = document.getElementById("cuerpoTabla");
    cuerpo.innerHTML = "";

    datos.forEach((dato, index) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${dato.telefono}</td>
            <td>${dato.password}</td>
            <td>
                <button onclick="editar(${index})">Editar</button>
                <button onclick="eliminar(${index})">Eliminar</button>
            </td>
        `;

        cuerpo.appendChild(fila);
    });
}

function eliminar(index) {
    const confirmar = confirm("¿Estás seguro de que quieres eliminar este registro?");
    if (confirmar) {
        datos.splice(index, 1);
        mostrarTabla();
    }
}

function editar(index) {
    const dato = datos[index];
    document.getElementById("telefono").value = dato.telefono;
    document.getElementById("password").value = dato.password;
    indiceEditar = index;
}