document.addEventListener("DOMContentLoaded", function() {
  var headers = {
    "Authorization": "Bearer " +  localStorage.getItem("token") 
  };
  verificarToken()

  function fillAtividadesSection(data) {
    const atividades = data.pdf;
    const atividadesList = document.getElementById('atividades-list');
    atividades.forEach((atividade ,index)=> {
      console.log(atividade);
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = atividade;
      link.textContent = `Atividade ${index + 1}`;
      listItem.appendChild(link);
      atividadesList.appendChild(listItem);
      
    });
    const downloadLink = document.getElementById("download-link");
    downloadLink.setAttribute("href", data.slide);
  }
  
  // Função para preencher a seção de material visual
  function fillMaterialVisualSection(materialVisual) {
    const iframeContainer = document.getElementById('iframe-container');
    materialVisual.forEach(video => {
      const iframe = document.createElement('iframe');
      console.log(video);
      iframe.src = video;
      iframe.frameBorder = 0;
      iframe.allow = "autoplay; encrypted-media";
      iframe.allowFullscreen = true;
      iframeContainer.appendChild(iframe);
    });
  }


  fetch(localStorage.getItem('host') + "/supportActivity/" + localStorage.getItem('content_id'),{ headers: headers })
    .then(response =>  response.json())
    .then(data => {
      console.log(data);
      fillAtividadesSection(data);
      fillMaterialVisualSection(data.videos);
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