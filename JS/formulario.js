function registrarUsuario() {
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
  
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, complete todos los campos del formulario.',
      });
      return;
    }
  
    if (!isValidEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, ingrese un correo electrónico válido.',
      });
      return;
    }
  
    if (password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La contraseña debe tener al menos 8 caracteres.',
      });
      return;
    }
  
    Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: 'Formulario enviado correctamente.',
    });
  }
  
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }