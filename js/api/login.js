// login.js

document.addEventListener('DOMContentLoaded', function() {
  var loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', fazerLogin);
});

function fazerLogin(event) {
  event.preventDefault(); // Evita o envio do formulário padrão

  var usernameInput = document.querySelector('input[type="text"]');
  var passwordInput = document.querySelector('input[type="password"]');

  fetch('http://191.101.14.34:3000/sessions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: usernameInput.value, password: passwordInput.value})
})
  .then(response =>  {
    if (response.ok) {
      // Código 200 - Sucesso
      console.log('Requisição bem-sucedida');
      return response.json();
    } else {
      throw new Error('Erro na requisição: Código de status ' + response.status);
    }
  })
  .then(data => {
    localStorage.setItem('token', data.token);
    window.location.href = '../../inicio.html'
  })
  .catch(error => {
    var errorContainer = document.getElementById('errorContainer');
    errorContainer.style.display = 'block';
    
    setTimeout(function() {
      errorContainer.style.display = 'none';
    }, 5000);
  });

}