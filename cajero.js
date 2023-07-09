// Datos de cuentas de ejemplo
const cuentas = [
  { usuario: "usuario1", contraseña: "contraseña1", saldo: 500 },
  { usuario: "usuario2", contraseña: "contraseña2", saldo: 200 },
  { usuario: "usuario3", contraseña: "contraseña3", saldo: 300 }
];

let saldoActual = 0;
let usuarioActual = null;

// Función para mostrar un mensaje en el elemento de salida
function mostrarMensaje(mensaje) {
  const output = document.getElementById("output");
  output.innerText = mensaje;
}

// Función para actualizar el saldo mostrado en la interfaz
function actualizarSaldo() {
  const balanceElement = document.getElementById("balance");
  balanceElement.innerText = `Saldo: $${saldoActual}`;
}
// Función para mostrar la sección de opciones después del inicio de sesión
function mostrarOpciones() {
  const loginForm = document.getElementById("loginForm");
  const saldoSection = document.getElementById("saldo");
  const optionsSection = document.getElementById("options");

  // Ocultar formulario de inicio de sesión
  loginForm.style.display = "none";
  // Mostrar sección de saldo actual
  saldoSection.style.display = "block";
  // Mostrar sección de opciones
  optionsSection.style.display = "block";

  // Actualizar el saldo mostrado en la interfaz
  actualizarSaldo();
}
// Función para manejar el evento de envío del formulario de inicio de sesión
function handleLoginFormSubmit(event) {
  event.preventDefault(); // Evitar el envío del formulario

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Buscar la cuenta en la lista de cuentas
  const cuenta = cuentas.find(
    (c) => c.usuario === username && c.contraseña === password
  );

  if (cuenta) {
    saldoActual = cuenta.saldo;
    usuarioActual = cuenta.usuario;
    mostrarOpciones();
    mostrarMensaje(`¡Bienvenido, ${usuarioActual}!`);
  } else {
    mostrarMensaje("Usuario o contraseña incorrectos. Por favor, intenta de nuevo.");
  }

  // Limpiar los campos del formulario
  usernameInput.value = "";
  passwordInput.value = "";
}

// Función para manejar la consulta de saldo
function handleConsultarSaldo() {
  mostrarMensaje(`Saldo actual: $${saldoActual}`);
}

// Función para manejar el retiro de dinero
function handleRetirar() {
  const monto = prompt("Ingrese la cantidad a retirar:");
  const cantidad = parseFloat(monto);

  if (isNaN(cantidad) || cantidad <= 0) {
    mostrarMensaje("Cantidad inválida. Por favor, ingresa un número válido.");
    return;
  }

  if (cantidad > saldoActual) {
    mostrarMensaje("No tienes suficiente saldo para realizar esta operación.");
    return;
  }

  saldoActual -= cantidad;
  mostrarMensaje(`Retiraste $${cantidad}. Nuevo saldo: $${saldoActual}`);
  actualizarSaldo();
}

// Función para manejar el ingreso de dinero
function handleIngresar() {
  const monto = prompt("Ingrese la cantidad a ingresar:");
  const cantidad = parseFloat(monto);

  if (isNaN(cantidad) || cantidad <= 0) {
    mostrarMensaje("Cantidad inválida. Por favor, ingresa un número válido.");
    return;
  }

  if (saldoActual + cantidad > 990) {
    mostrarMensaje("El saldo máximo permitido es de $990. No puedes ingresar más dinero.");
    return;
  }

  saldoActual += cantidad;
  mostrarMensaje(`Ingresaste $${cantidad}. Nuevo saldo: $${saldoActual}`);
  actualizarSaldo();
}

// Función para manejar el cierre de sesión
function handleLogout() {
  const loginForm = document.getElementById("loginForm");
  const saldoSection = document.getElementById("saldo");
  const optionsSection = document.getElementById("options");

  // Limpiar datos de la sesión actual
  saldoActual = 0;
  usuarioActual = null;

  // Limpiar mensaje de salida
  mostrarMensaje("");
// Mostrar formulario de inicio de sesión
loginForm.style.display = "block";
// Ocultar sección de saldo actual
saldoSection.style.display = "none";
// Ocultar sección de opciones
optionsSection.style.display = "none";
}

// Event listener para el envío del formulario de inicio de sesión
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", handleLoginFormSubmit);

// Event listener para el botón "Consultar Saldo"
const consultarSaldoButton = document.getElementById("consultarSaldo");
consultarSaldoButton.addEventListener("click", handleConsultarSaldo);

// Event listener para el botón "Retirar"
const retirarButton = document.getElementById("retirar");
retirarButton.addEventListener("click", handleRetirar);

// Event listener para el botón "Ingresar"
const ingresarButton = document.getElementById("ingresar");
ingresarButton.addEventListener("click", handleIngresar);

// Event listener para el botón "Cerrar Sesión"
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", handleLogout);