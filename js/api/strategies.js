document.addEventListener("DOMContentLoaded", function() {
  var headers = {
    "Authorization": "Bearer " +  localStorage.getItem("token") 
  };
  verificarToken()

  fetch(localStorage.getItem('host') + "/strategies/" +localStorage.getItem('content_id'),{ headers: headers })
    .then(response =>  response.json())
    .then(data => {
      const container = document.querySelector('.container.model');
      container.innerHTML = '';
      console.log(data)
      data.forEach(strategy => {
        const div = document.createElement('div');
        div.innerHTML = `
          <h2 class="text-center">${strategy.title}:</h2>
          <h3 class="text-center">Objetivo:</h3>
          <p>${strategy.objective}</p>
          <h3 class="text-center">Descrição:</h3>
          <ul>
            ${strategy.description.map(item => `<li>${item}</li>`).join('')}
          </ul>
          <h3 class="text-center">Benefícios:</h3>
          <ul>
            ${strategy.benefits.map(item => `<li>${item}</li>`).join('')}
          </ul>
        `;

        container.appendChild(div);
      });
    })
    .catch(error => {
      console.error("Ocorreu um erro na requisição:", error);
    });
});

function verificarToken() {
  var token = localStorage.getItem("token");
  if (!token) {
    // Redirecionar para a página de login
    window.location.href = "index.html";
  }
}