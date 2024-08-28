// Variables para acceder a los elementos del DOM
const textInput = document.querySelector('#text-input');
const encryptBtn = document.querySelector('#encrypt-btn');
const decryptBtn = document.querySelector('#decrypt-btn');
const copyBtn = document.querySelector('#copy-btn');
const message = document.querySelector('#message');
const output = document.querySelector('#output');

// Función para verificar si el texto es válido para cifrar (minúsculas y espacios)
function esTextoValido(texto) {
    return /^[a-z\s]+$/.test(texto); // Expresión regular inline
}

// Función para cifrar el texto utilizando un desplazamiento de ASCII
function cifrarTexto(texto) {
    return Array.from(texto).map(caracter => 
        String.fromCharCode(caracter.charCodeAt(0) + 2)).join('');
}

// Función para descifrar el texto utilizando un desplazamiento de ASCII inverso
function descifrarTexto(texto) {
    return Array.from(texto).map(caracter => 
        String.fromCharCode(caracter.charCodeAt(0) - 2)).join('');
}

// Función para copiar texto al portapapeles con promesa y manejo de errores
async function copiarAlPortapapeles() {
    try {
        await navigator.clipboard.writeText(output.textContent);
        alert('Texto copiado exitosamente');
    } catch (error) {
        console.error('No se pudo copiar el texto', error);
    }
}

// Evento de cifrado de texto
encryptBtn.addEventListener('click', () => {
    const texto = textInput.value;
    if (esTextoValido(texto)) {
        output.textContent = cifrarTexto(texto);
        mostrarResultado(true);
    } else {
        mostrarMensajeError('Solo se permiten letras minúsculas y espacios');
    }
});

// Evento de descifrado de texto
decryptBtn.addEventListener('click', () => {
    output.textContent = descifrarTexto(textInput.value);
    mostrarResultado(true);
});

// Evento para copiar texto al portapapeles
copyBtn.addEventListener('click', () => {
    if (output.textContent) {
        copiarAlPortapapeles();
    }
});

// Función para mostrar resultado o mensaje de error
function mostrarResultado(exito) {
    if (exito) {
        output.style.display = 'block';
        message.textContent = '';
    } else {
        output.style.display = 'none';
    }
}

function mostrarMensajeError(mensajeError) {
    message.textContent = mensajeError;
    mostrarResultado(false);
}
