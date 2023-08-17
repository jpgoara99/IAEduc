document.addEventListener("DOMContentLoaded", function() {
  verificarToken();
});

function verificarToken() {
  var token = sessionStorage.getItem("token");
  if (!token) {
    // Redirecionar para a página de login
    window.location.href = "index.html";
  }
}