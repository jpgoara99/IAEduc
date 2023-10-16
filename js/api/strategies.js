document.addEventListener("DOMContentLoaded", function() {
  var headers = {
    "Authorization": "Bearer " +  localStorage.getItem("token") 
  };
  verificarToken()

  function createDiv(data){
    data.forEach(item => {
      dynamicContent += `
      <h2 class="text-center">:</h2>

      `;
    })
  }


  fetch(localStorage.getItem('host') + "/content/" +localStorage.getItem('subtopicId'),{ headers: headers })
    .then(response =>  response.json())
    .then(data => {
    let dynamicContent = ''

    data.forEach(item => {
      createDiv(item)
    })

    articleContent.innerHTML += dynamicContent;
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