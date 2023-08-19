document.addEventListener("DOMContentLoaded", function() {
  var headers = {
    "Authorization": "Bearer " +  localStorage.getItem("token") 
  };
  verificarToken()

  fetch("http://localhost:3333/content/" +localStorage.getItem('subtopicId'),{ headers: headers })
    .then(response =>  response.json())
    .then(data => {

      const articleContent = document.querySelector('article');
      let dynamicContent
      
      data.forEach(item => {
        dynamicContent = `
        <h2>Objetivos da aula</h2>
        <p>${item.objective}</p>

        <h2>habilidades da BNCC contempladas</h2>
      `;
        item.bncc.forEach(item => {
          dynamicContent += `
            <p>${item}</p>
          `
        })

        dynamicContent += `
          <h2>recursos necessários</h2>
          <ul>
          `;
          item.resources.forEach(item => {
            dynamicContent += `
              <li>${item}</li>
            `
          })

        dynamicContent += `
          </ul>
          <h2>Desenvolvimento da aula</h2>
        `;
        item.classDevelopment.topics.forEach(item => {
          dynamicContent += `
            <h3>${item.title}</h3>
          `
          item.topics.forEach(item => {
            dynamicContent += `
              <p>${item}</p>
            `
          })
        })
        
      });
     

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