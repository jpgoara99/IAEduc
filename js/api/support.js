document.addEventListener("DOMContentLoaded", function() {
  var headers = {
    "Authorization": "Bearer " +  localStorage.getItem("token") 
  };
  verificarToken()

  fetch(localStorage.getItem('host') + "/supportActivity/" +localStorage.getItem('content_id'),{ headers: headers })
    .then(response =>  response.json())
    .then(data => {
      const container = document.querySelector('.container.model');
      const activitiesList = document.querySelector('.text-center ul');
      const slideLink = document.querySelector('.responsive-button');

      // Limpando a lista de atividades existente
      activitiesList.innerHTML = '';

      data.activities.forEach(activity => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = activity.link;
        link.textContent = activity.name;
        listItem.appendChild(link);
        activitiesList.appendChild(listItem);
      });

      // Atualizando o link para baixar o slide da aula
      slideLink.href = data.slideLink;

      // Adicione qualquer outro código aqui para lidar com outros elementos dinâmicos

    
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