document.addEventListener("DOMContentLoaded", function() {
  var headers = {
    "Authorization": "Bearer " +  localStorage.getItem("token") 
  };
  verificarToken()

  fetch("http://191.101.14.34:3000/content/" +localStorage.getItem('subtopicId'),{ headers: headers })
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
      let name= ''
      const className = localStorage.getItem('className'); 
      if(className == '1_ano'){
        name = '1º Ano'
      }else if(className == '2_ano'){
        name = '2º Ano'
      }else if(className == '3_ano'){
        name = '3º Ano'
      }else if(className == '4_ano'){
        name = '4º Ano'
      }else if(className == '5_ano'){
        name = '5º Ano'
      } 
      document.title = name;
      const nametitle = localStorage.getItem('subtopicName')
      var titleElement = document.querySelector('.title');
      var areaName = nametitle; // Substitua isso pelo valor que você deseja obter dinamicamente

      titleElement.textContent = areaName;
     
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