document.addEventListener("DOMContentLoaded", function() {
  var headers = {
    "Authorization": "Bearer " +  localStorage.getItem("token") 
  };
  verificarToken()

  fetch(localStorage.getItem('host') + "/content/" +localStorage.getItem('subtopicId'),{ headers: headers })
    .then(response =>  response.json())
    .then(data => {
      localStorage.setItem('content_id', data[0].id);
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
      var areaName = nametitle; 


      name= localStorage.getItem('subjectName');
      let iconName = '';
      let subjectClass ='';
      if (name === 'Português') {
        subjectClass = 'portugues';
        iconName = 'book-outline';
      } else if (name === 'Matemática') {
        subjectClass = 'matematica';
        iconName = 'calculator-outline';
      } else if(name == 'Ciências'){
        subjectClass = 'ciencias';
        iconName = 'planet-outline';
      } else if(name == 'História'){
        subjectClass = 'historia';
        iconName = 'library-outline';
      } else if(name == 'Geografia'){
        subjectClass = 'geografia';
        iconName = 'earth-outline';
      } else if(name == 'Ensino Religioso'){
        subjectClass = 'religiao';
        iconName = 'sparkles-outline';
      } else if(name == 'Educação Física'){
        subjectClass = 'ed_fisica';
        iconName = 'barbell-outline';
      } else if(name == 'Artes'){
        subjectClass = 'artes';
        iconName = 'color-palette-outline';
      }
      var minhaMain = document.querySelector("main");
      var minhaHeader = document.querySelector("header");
      var body = document.body;
      minhaMain.classList.add(`main_${subjectClass}`,`${subjectClass}` );
      minhaHeader.classList.add(`header_${subjectClass}`,`${subjectClass}`);
      body.classList.add(`body_${subjectClass}`);
      
      
      titleElement.textContent = areaName;
      articleContent.innerHTML = dynamicContent;
     
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