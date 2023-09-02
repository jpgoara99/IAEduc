document.addEventListener("DOMContentLoaded", function() {
  var headers = {
    "Authorization": "Bearer " +  localStorage.getItem("token") 
  };
  verificarToken()


  function createListItem(item) {
    let name= localStorage.getItem('subjectName');
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
    return `
      <li class="mt-3 mb-2 btn d-flex justify-content-center col-md-12">
        <a class="btn btn-lg btn-tam ${subjectClass} d-flex justify-content-center" href="../../meterias_fundamental_1/disciplinas_quinto_ano/matematica/area.html" data-subject-name="${name}" data-subtopic-name="${item.name} "data-subtopic-id="${item.id}">
          ${item.name}<ion-icon class="icon_materia" name="${iconName}"></ion-icon>
        </a>
      </li>
    `;
  }

  function createSubjectDiv(item) {
    let name= localStorage.getItem('subjectName');
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
    console.log(subjectClass)
    return `
      <div class="bg_${subjectClass}">

      </div>
    `;
  }


  function createFooter() {
    let name= localStorage.getItem('subjectName');
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
    const footer = document.createElement('footer');
    footer.classList.add('fixed-bottom', `${subjectClass}-footer`);
  
    const copyrightText = document.createTextNode(`&copy; 2023 InovAssessoria. Todos os direitos reservados.`);
    footer.appendChild(copyrightText);
  
    return footer;
  }

  fetch("http://191.101.14.34:3000/subtopic/" + localStorage.getItem('subjectId'),{ headers: headers })
    .then(response =>  response.json())
    .then(data => {
      const subjectDivContainer = document.querySelector('.subject-div-container');
      const listContainer = document.querySelector('.container');

      data.forEach(item => {
        const listItemHTML = createListItem(item);
        listContainer.innerHTML += listItemHTML;
        const subjectDivHTML = createSubjectDiv(item);
        subjectDivContainer.innerHTML += subjectDivHTML;

        const footer = createFooter(item.class);
        subjectDivContainer.appendChild(footer);
      });

      // Add click event listener to each link
      const links = document.querySelectorAll('.container a');
      links.forEach(link => {
        link.addEventListener('click', function(event) {
          const subjectName = event.currentTarget.getAttribute('data-subject-name');
          const subtopicName = event.currentTarget.getAttribute('data-subtopic-name');
          const subtopicId = event.currentTarget.getAttribute('data-subtopic-id');
          
          
          localStorage.setItem('subtopicName', subtopicName);
          localStorage.setItem('subtopicId', subtopicId); 
          localStorage.setItem('subjectName', subjectName);
          window.location.href = "../../meterias_fundamental_1/disciplinas_quinto_ano/matematica/area.html"
        });
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