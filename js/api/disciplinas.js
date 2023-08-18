document.addEventListener("DOMContentLoaded", function() {
  var headers = {
    "Authorization": "Bearer " +  sessionStorage.getItem("token") 
  };
  verificarToken()

  function createListItem(item) {
    let iconName = '';
    let subjectClass ='';
    if (item.name === 'Português') {
      subjectClass = 'portugues';
      iconName = 'book-outline';
    } else if (item.name === 'Matemática') {
      subjectClass = 'matematica';
      iconName = 'calculator-outline';
    } else if(item.name == 'Ciências'){
      subjectClass = 'ciencias';
      iconName = 'planet-outline';
    } else if(item.name == 'História'){
      subjectClass = 'historia';
      iconName = 'library-outline';
    } else if(item.name == 'Geografia'){
      subjectClass = 'geografia';
      iconName = 'earth-outline';
    } else if(item.name == 'Ensino Religioso'){
      subjectClass = 'religioso';
      iconName = 'sparkles-outline';
    } else if(item.name == 'Educação Física'){
      subjectClass = 'ed_fisica';
      iconName = 'barbell-outline';
    } else if(item.name == 'Artes'){
      subjectClass = 'artes';
      iconName = 'color-palette-outline';
    }  
    return `
      <li class="mt-3 mb-2 btn d-flex justify-content-center col-md-12">
        <a class="btn btn-lg btn-tam ${subjectClass} d-flex justify-content-center"data-item-name="${item.name}"  data-item-id="${item.id}" href="../../meterias_fundamental_1/1_ano.html">
          ${item.name}<ion-icon class="icon_materia" name="${iconName}"></ion-icon>
        </a>
      </li>
    `;
  }

  fetch("http://localhost:3333/subject/" + localStorage.getItem('classId'),{ headers: headers })
    .then(response =>  response.json())
    .then(data => {
      const listContainer = document.querySelector('.container');
      

      data.forEach(item => {
        let name= ''
        const className = sessionStorage.getItem('className'); 
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
        const bgElement = document.querySelector('.bg');

        bgElement.innerHTML = `
          <h1 class="p-3 text-center font-weight-bold">Planos de aula do ${name}</h1>
          `;
        const listItemHTML = createListItem(item);
        listContainer.innerHTML += listItemHTML;

       
      });
      const links = document.querySelectorAll('.container a');
      links.forEach(link => {
        link.addEventListener('click', function(event) {
          const itemId = event.currentTarget.getAttribute('data-item-id');
          const itemName = event.currentTarget.getAttribute('data-item-name');
          alert(itemName)
          sessionStorage.setItem('selectedItemName', itemName);
          sessionStorage.setItem('selectedItemId', itemId);
        });
      });
    })
    .catch(error => {
      console.error("Ocorreu um erro na requisição:", error);
    });
});

function verificarToken() {
  var token = sessionStorage.getItem("token");
  if (!token) {
    // Redirecionar para a página de login
    window.location.href = "index.html";
  }
}