document.addEventListener("DOMContentLoaded", function() {
  var headers = {
    "Authorization": "Bearer " +  sessionStorage.getItem("token") 
  };
  verificarToken()

  fetch("http://localhost:3333/class/1",{ headers: headers })
    .then(response =>  response.json())
    .then(data => {

      const cardContainer = document.getElementById('cardContainer');

      data.forEach(item => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'col m-1 op1';
        const imageUrl = `../../imagens/${item.name}.png`;
        console.log(item.name);
        const cardContent = `
          <div class="d-flex justify-content-sm-center">
            <a class="btn shadow-none" href="">
              <img src="${imageUrl}" class="img-fluid" width="270px">
              <h4 class="btn btn-warning text-light font-weight-bold d-flex justify-content-center">Consultar</h4>
            </a>
          </div>
        `;

        cardDiv.innerHTML = cardContent;
        cardContainer.appendChild(cardDiv);
        
        cardDiv.addEventListener('click', () => {
          localStorage.setItem('classId', item.id);
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