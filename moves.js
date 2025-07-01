const pokemonMoves = document.querySelector('#pokemonMoves');
const showImaginePokemon = (spriteData) => {
     if(!spriteData.dream_world.front_default && !spriteData.home.front_default){
          return spriteData['official-artwork'].front_default;
     }else if(!spriteData.home.front_default){
          return spriteData.home.front_default;
     }else {
          return spriteData.dream_world.front_default;
     }
};
const listMoves = (motion) => {
     const nameMotion = motion.move.name;
     return `<li class="list-group-item list-group-item-action border-danger fw-bold">${nameMotion}</li>`;
};
const showMoves = (pokemon) => {
     pokemonMoves.innerHTML = `
          <div class="card border-danger bg-danger text-white" style="width: 18rem;">
               <img src="${showImaginePokemon(pokemon.sprite)}" class="card-img-top" alt="Pokemon Actual">
               <div class="card-body"><h5 class="card-title">${pokemon.Name.toUpperCase()}</h5></div>
               <ul class="list-group list-group-flush">${pokemon.Movements.map(element=>listMoves(element)).join("")}</ul>
               <div class="card-body bg-dark d-flex justify-content-evenly">
                    <a href="./index.html" class="card-link text-decoration-none link-light fw-bold"><i class="bi bi-house-door"></i> start</a>
               </div>
          </div>
     `;
};
const NoPokemonModal = new bootstrap.Modal(document.getElementById('staticBackdrop'),{keyboard: false});
if(localStorage.getItem("pokedesk")){
     const initialState = localStorage.getItem("pokedesk");
     showMoves(JSON.parse(initialState));
}else NoPokemonModal.show();