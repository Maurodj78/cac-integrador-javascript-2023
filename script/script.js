function navigateToSection(event) {
  event.preventDefault();
  var seccionId = event.target.dataset.target;
  var seccion = document.getElementById(seccionId);
  window.scrollTo({
    top: seccion.offsetTop,
    behavior: 'smooth'
  });
}

function calcularCosto() {
  const costoTicket = 200;
  const dtoEstudiante = 0.80;
  const dtoTrainee = 0.50;
  const dtoJunior = 0.15;
  const estudiante = 'Estudiante';
  const trainee = 'Trainee';
  const junior = 'Junior';
  
  let cantidadInput = getFieldValue('form-tickets-cantidad');
  const categoriaSelect = getFieldValue('form-tickets-categoria');

  if (cantidadInput < 1) {
    setInnerText('form-tickets-totalPagar', '');
    mostrarAdvertencia('advertenciaCantidad');
    focusOnField('form-tickets-cantidad');
    cantidadInput = 0;
  } else {
    let descuento = 0;
    if (categoriaSelect === estudiante) {
      descuento = 1 - dtoEstudiante;
    } else if (categoriaSelect === trainee) {
      descuento = 1 - dtoTrainee;
    } else if (categoriaSelect === junior) {
      descuento = 1 - dtoJunior;
    }
    const totalPagar = calcularTotalPagar(cantidadInput, costoTicket, descuento);
    setInnerText('form-tickets-totalPagar', totalPagar.toFixed(0));
    validarCamposFormulario();
  }
}

function validarCamposFormulario() {
  limpiarAdvertenciasPrevias();

  const nameInput = getFieldValue('form-tickets-name');
  const surnameInput = getFieldValue('form-tickets-surname');
  const correoInput = getFieldValue('form-tickets-correo');

  if (isEmpty(nameInput)) {
    mostrarAdvertencia('advertenciaNombre');
    focusOnField('form-tickets-name');
  }

  if (isEmpty(surnameInput)) {
    mostrarAdvertencia('advertenciaApellido');
    focusOnField('form-tickets-surname');
  }

  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoRegex.test(correoInput.trim())) {
    mostrarAdvertencia('advertenciaCorreo');
    focusOnField('form-tickets-correo');
  }
}

function calcularTotalPagar(cantidad, costoTicket, descuento) {
  return cantidad * costoTicket * descuento;
}

function mostrarAdvertencia(elementId) {
  const advertenciaElement = document.getElementById(elementId);
  advertenciaElement.classList.remove('d-none');
}

function limpiarAdvertenciasPrevias() {
  const advertenciaCorreo = document.getElementById('advertenciaCorreo');
  const advertenciaNombre = document.getElementById('advertenciaNombre');
  const advertenciaApellido = document.getElementById('advertenciaApellido');
  const advertenciaCantidad = document.getElementById('advertenciaCantidad');

  advertenciaCorreo.classList.add('d-none');
  advertenciaNombre.classList.add('d-none');
  advertenciaApellido.classList.add('d-none');
  advertenciaCantidad.classList.add('d-none');
}

function getFieldValue(fieldId) {
  const fieldElement = document.getElementById(fieldId);
  return fieldElement.value;
}

function setFieldValue(fieldId, value) {
  const fieldElement = document.getElementById(fieldId);
  fieldElement.value = value;
}

function getInnerText(fieldId) {
  const fieldElement = document.getElementById(fieldId);
  return fieldElement.innerText;
}

function setInnerText(fieldId, value) {
  const fieldElement = document.getElementById(fieldId);
  fieldElement.innerText = value;
}

function isEmpty(value) {
  return value.trim() === '';
}

function focusOnField(fieldId) {
  const fieldElement = document.getElementById(fieldId);
  fieldElement.focus();
}

function limpiarFormulario() {
  const campoCantidad = document.getElementById('form-tickets-cantidad');
  const campoNombre = document.getElementById('form-tickets-name');
  const campoApellido = document.getElementById('form-tickets-surname');
  const campoCorreo = document.getElementById('form-tickets-correo');
  const campoTotalPagar = document.getElementById('form-tickets-totalPagar');

  campoCantidad.value = '';
  campoNombre.value = '';
  campoApellido.value = '';
  campoCorreo.value = '';
  campoTotalPagar.innerText = '';

  limpiarAdvertenciasPrevias();
}

function inicializarFormulario() {
  
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    calcularCosto();
  });

  const btnLimpiar = document.getElementById('btn-limpiar');
  btnLimpiar.addEventListener('click', function () {
    limpiarFormulario();
  });
}

inicializarFormulario();