const results = document.querySelector('#results');
const LoadingComponent = document.querySelector('#LoadingComponent');
const search = document.querySelector('#search');
const searchForm = document.querySelector('#searchForm');
const errorMessage = document.querySelector('#errorMessage');
const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'),{keyboard: false});
const URL = 'https://pokeapi.co/api/v2/pokemon/';
class pokeResult {
     constructor(name,type,abilities,movements,stats,sprite){
          this.Name = name;
          this.Type = type;
          this.Abilities = abilities;
          this.Movements = movements;
          this.Stats = stats;
          this.sprite = sprite;
     }
}
const showImaginePokemon = (spriteData) => {
     if(!spriteData.dream_world.front_default && !spriteData.home.front_default){
          return spriteData['official-artwork'].front_default;
     }else if(!spriteData.dream_world.front_default){
          return spriteData.home.front_default;
     }else {
          return spriteData.dream_world.front_default;
     }
};
const showStats = (listStats) => {
     const nameStat = listStats.stat.name;
     const valorStat = listStats.base_stat;
     return `<li class="list-group-item border-danger d-flex align-items-start justify-content-between fw-bold">
          ${nameStat}: <span class="fw-light">${valorStat}</span>
     </li>`
};
const showPokemon = (responsePokemon) => {
     results.innerHTML = `
          <img src=${showImaginePokemon(responsePokemon.sprite)} class="card-img-top" alt="Pokemon Actual">
          <div class="card-body">
               <h4 class="card-title text-center" id="name">${responsePokemon.Name.toUpperCase()}</h4>
          </div>
          <ul class="list-group list-group-flush" id="stats">
               <li class="list-group-item border-danger d-flex justify-content-around align-items-start fw-bold">
                    type <span class="badge rounded-pill bg-dark">${responsePokemon.Type}</span>
               </li>
               ${responsePokemon.Stats.map(element => showStats(element)).join("")}
          </ul>
          <div class="card-body bg-dark d-flex justify-content-evenly">
               <a href="./moves.html" class="card-link text-decoration-none text-capitalize link-light fw-bold"><i class="bi bi-person-lines-fill"></i> moves</a>
               <a href="./abilities.html" class="card-link text-decoration-none text-capitalize link-light fw-bold">abilities <i class="bi bi-stars"></i></a>
          </div>
     `;
};
if(localStorage.getItem('pokedex')){
     errorMessage.classList.add('d-none');
     const pokemonLocal = localStorage.getItem('pokedex');
     showPokemon(JSON.parse(pokemonLocal));
}else {
     welcomeModal.show();
     results.classList.add('d-none');
}
const pokeSearch = async (search) => {
     const endPoint = `${URL}${search}`;
     try {
          errorMessage.classList.add('d-none');
          LoadingComponent.classList.remove('d-none');
          const response = await fetch(endPoint);
          if(response.ok){
               const data = await response.json();
               const resultPokemon = new pokeResult(
                    data.name,
                    data['types'][0]['type'].name,
                    data['abilities'],
                    data['moves'],
                    data['stats'],
                    data['sprites']['other'],
               );
               localStorage.setItem('pokedex',JSON.stringify(resultPokemon));
               results.classList.remove('d-none');
               showPokemon(resultPokemon);
               return resultPokemon;
          }
     }catch(error){
          errorMessage.textContent = error;
     }finally {
          LoadingComponent.classList.add('d-none');
     }
};
const PatternPokemon = /((^\d{1,4}$)|(^[A-Za-z]{3,})$)/;
searchForm.addEventListener('submit',(event) => {
     event.preventDefault();
     const toSearch = search.value.trim().toLowerCase();
     if(toSearch.trim() === "") return;
     if(!PatternPokemon.test(toSearch)) return;
     pokeSearch(toSearch);
     search.value = "";
});