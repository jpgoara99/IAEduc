document.addEventListener("DOMContentLoaded", function() {
  var headers = {
    "Authorization": "Bearer " +  localStorage.getItem("token") 
  };
  verificarToken()

  fetch(localStorage.getItem('host') + "/class/2",{ headers: headers })
    .then(response =>  response.json())
    .then(data => {

      const cardContainer = document.getElementById('cardContainer');

      data.forEach(item => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'col m-1 op1';
        const imageUrl = `../../imagens/${item.name}.svg`;
        const Url = `../../subjects/subject.html`;
        const cardContent = `
          <div class="d-flex justify-content-sm-center">
            <a class="btn shadow-none" href="${Url}">
              <img src="${imageUrl}" class="img-fluid" width="270px">
              <h4 class="btn text-light font-weight-bold d-flex justify-content-center btn-${item.name}">Consultar</h4>
            </a>
          </div>
        `;

        cardDiv.innerHTML = cardContent;
        cardContainer.appendChild(cardDiv);
        
        cardDiv.addEventListener('click', () => {
          localStorage.setItem('classId', item.id);
          localStorage.setItem('className', item.name);
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