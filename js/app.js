const visualizar = (data => {
  let cadena = `
      <div class="pokemon-card">
          <h2 class="pokemon-name">${data.name}</h2>
          <div class="pokemon-info">
              <div class="info-item"><strong>ID de Pokemon:</strong> ${data.id}</div>
              <div class="info-item"><strong>Habilidades:</strong> ${data.abilities.map(ability => ability.ability.name).join(', ')}</div>
              <div class="info-item"><strong>Estadisticas:</strong>
                  <ul class="stats">
                      ${data.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                  </ul>
              </div>
          </div>
          <div class="sprites">
              <img src="${data.sprites.front_default}" alt="Front Sprite" class="sprite" width="230" height="230">
              <img src="${data.sprites.back_default}" alt="Back Sprite" class="sprite" width="230" height="230">
          </div>
      </div>`;
  
  document.getElementById("contenido").innerHTML = cadena;
});

function buscar() {
  document.getElementById("contenido").innerHTML = '';
  let valor = document.getElementById("pokemon").value.toLowerCase();
  let url = `https://pokeapi.co/api/v2/pokemon/${valor}`;
  
  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error('Pokémon no encontrado');
          }
          return response.json();
      })
      .then(data => visualizar(data))
      .catch(error => {
          console.error(error);
          document.getElementById("contenido").innerHTML = `<p>${error.message}</p>`;
      });
}
